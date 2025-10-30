import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from 'src/app/services/apps/appointment/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class ReviewComponent implements OnInit {
  @Input() advisorId!: number;
  @Input() advisorName!: string;
  @Input() advisorPhoto!: string;
  @Input() reviewId?: number;
  rating = 0;
  comment = '';
  loading = false;
  isEdit = false;
  hasReview = false;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    if (this.reviewId) {
      this.reviewService.getReviewById(this.reviewId).subscribe(r => {
        this.rating = r.rating;
        this.comment = r.comment;
        this.hasReview = true;
        this.isEdit = false;
      });
    }
  }

  setRating(r: number) {
    if (!this.hasReview || this.isEdit) {
      this.rating = r;
    }
  }

  submit() {
    this.loading = true;
    if (this.hasReview && this.isEdit && this.reviewId) {
      this.reviewService.updateReview(this.reviewId, this.rating, this.comment).subscribe(() => {
        this.loading = false;
        this.isEdit = false;
      });
    } else {
      this.reviewService.createReview(this.advisorId, this.rating, this.comment).subscribe(() => {
        this.loading = false;
        this.hasReview = true;
        this.isEdit = false;
      });
    }
  }

  editReview() {
    this.isEdit = true;
  }
}
