import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/apps/appointment/review.service';
import { AppointmentService } from 'src/app/services/apps/appointment/appointment.service';
import { AvailableDateService } from 'src/app/services/apps/catalog/available-date.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-advisor-review-view',
  standalone: true,
  templateUrl: './advisor-review-view.component.html',
  styleUrls: ['./advisor-review-view.component.scss'],
  imports: [CommonModule]
})
export class AdvisorReviewViewComponent implements OnInit {
  farmerName = signal('');
  farmerPhoto = signal('');
  rating = signal(0);
  comment = signal('');
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private appointmentService: AppointmentService,
    private availableDateService: AvailableDateService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    if (!appointmentId) {
      this.router.navigate(['/apps/appointments/advisor/history']);
      return;
    }

    this.loadReviewData(appointmentId);
  }

  loadReviewData(appointmentId: number) {
    this.loading.set(true);

    // Obtener appointment
    this.appointmentService.getAppointmentById(appointmentId).subscribe({
      next: (appt) => {
        const farmerId = appt.farmerId;

        // Obtener datos del productor
        this.profileService.fetchProfile(farmerId).subscribe({
          next: (profile) => {
            this.farmerName.set(`${profile.firstName} ${profile.lastName}`);
            this.farmerPhoto.set(profile.photo || 'assets/images/profile/user-1.jpg');
          }
        });

        // Obtener availableDate para conseguir el advisorId
        this.availableDateService.getAvailableDateById(appt.availableDateId).subscribe({
          next: (date) => {
            const advisorId = date.advisorId;

            // Obtener la reseña del productor para este asesor
            this.reviewService.getReviewByAdvisorAndFarmer(advisorId, farmerId).subscribe({
              next: (reviews) => {
                if (reviews && reviews.length > 0) {
                  const review = reviews[0];
                  this.rating.set(review.rating);
                  this.comment.set(review.comment);
                } else {
                  this.rating.set(0);
                  this.comment.set('No hay reseña disponible');
                }
                this.loading.set(false);
              },
              error: () => {
                this.rating.set(0);
                this.comment.set('No hay reseña disponible');
                this.loading.set(false);
              }
            });
          },
          error: () => {
            this.loading.set(false);
            this.router.navigate(['/apps/appointments/advisor/history']);
          }
        });
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/apps/appointments/advisor/history']);
      }
    });
  }

  goBack() {
    this.router.navigate(['/apps/appointments/advisor/history']);
  }
}
