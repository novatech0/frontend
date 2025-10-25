import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/apps/blog/post.service';
import { AdvisorService } from 'src/app/services/apps/catalog/advisor.service';
import { MatCardModule } from '@angular/material/card';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  imports: [MatCardModule, TablerIconsModule, MatChipsModule, CommonModule],
  templateUrl: './blogs.component.html',
  standalone: true,
})
export class AppBlogsComponent implements OnInit {
  posts = signal<any[]>([]);
  advisors = signal<any[]>([]);

  constructor(
    public router: Router,
    private postService: PostService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit(): void {
    this.advisorService.getAdvisors().subscribe(data => {
      this.advisors.set(data);
    });

    this.postService.getPosts().subscribe(posts => {
      this.posts.set(posts);
    });
  }

  getAdvisor(advisorId: number): any {
    const advisor = this.advisors().find(a => a.advisorId === advisorId);
    return advisor
      ? { advisorName: advisor.advisorName, advisorOccupation: advisor.advisorOccupation }
      : { advisorName: 'Unknown Advisor', advisorOccupation: '' };
  }

  goToAdvisorProfile(id: number) {
    //this.router.navigate();
  }
}
