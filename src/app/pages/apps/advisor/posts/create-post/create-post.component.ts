import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/apps/post/post.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatIcon
  ],
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: [null],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = this.selectedFile.name;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  createPost(): void {
    if (this.postForm.valid) {
      const advisorId = Number(localStorage.getItem('advisorId') || 0);
      const formData = new FormData();
      formData.append('advisorId', advisorId.toString());
      formData.append('title', this.postForm.get('title')?.value);
      formData.append('description', this.postForm.get('description')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.isSaving = true;

      this.postService.createPost(formData as any).subscribe({
        next: (response) => {
          console.log('Post creado:', response);
          alert('Publicación creada correctamente.');
          this.router.navigate(['/apps/advisor/posts']);
        },
        error: (err) => {
          console.error('Error al crear post:', err);
          alert('Error al crear la publicación.');
          this.isSaving = false;
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/apps/advisor/posts']);
  }
}
