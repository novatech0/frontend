import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/apps/blog/post.service';
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

  constructor(public router: Router, private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data) => {
      this.posts.set(data);
      console.log('Posts obtenidos del backend:', data);
    });
  }

  selectBlog(id: number) {
    this.router.navigate(['apps/blog/detail', id]);
  }
}
