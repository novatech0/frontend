import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/apps/post/post.service';
import { AdvisorService } from 'src/app/services/apps/catalog/advisor.service';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-posts',
  imports: [TablerIconsModule, CommonModule, MaterialModule],
  templateUrl: './advisor-posts.component.html',
  styleUrls: ['./advisor-posts.component.scss'],
  standalone: true,
})
export class AdvisorPostsComponent implements OnInit {
  posts = signal<any[]>([]);
  advisors = signal<any[]>([]);
  loggedInAdvisorId: number | null = null;

  constructor(
    public router: Router,
    private postService: PostService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit(): void {
    const advisorId = localStorage.getItem('advisorId');
    this.loggedInAdvisorId = advisorId ? parseInt(advisorId, 10) : null;

    this.advisorService.getAdvisors().subscribe((data) => {
      this.advisors.set(data);
    });

    this.postService.getPosts().subscribe((posts) => {
      if (this.loggedInAdvisorId !== null) {
        const filteredPosts = posts.filter(
          (post) => post.advisorId === this.loggedInAdvisorId
        );
        this.posts.set(filteredPosts);
      } else {
        this.posts.set([]);
      }
    });
  }

  editPost(postId: number): void {
    this.router.navigate(['/apps/advisor/posts', postId]);
  }


  deletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe(() => {
      const updatedPosts = this.posts().filter((post) => post.id !== postId);
      this.posts.set(updatedPosts);
    });
  }

  addPost() {}
}
