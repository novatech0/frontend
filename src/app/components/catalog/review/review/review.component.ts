import {Component, Input, OnInit} from '@angular/core';
import {MaterialModule} from "src/app/material.module";
import {ReviewService} from "../../../../services/apps/catalog/review.service";
import {Review} from "./review";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-review',
  imports: [MaterialModule, NgForOf, NgClass],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent implements OnInit {
  protected reviews: Review[] = [];
  @Input() advisorId: number;

  constructor(
    private reviewService: ReviewService,
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  private loadReviews(): void {
    this.reviewService.getReviewsByAdvisorId(this.advisorId).subscribe({
      next: (data) => {
        this.reviews = data;
        console.log(this.reviews);
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
      }
    });
  }
}
