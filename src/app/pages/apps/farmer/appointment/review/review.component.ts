import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReviewService } from 'src/app/services/apps/appointment/review.service';
import { AppointmentService } from 'src/app/services/apps/appointment/appointment.service';
import { AvailableDateService } from 'src/app/services/apps/catalog/available-date.service';
import { AdvisorService } from 'src/app/services/apps/catalog/advisor.service';

@Component({
  selector: 'app-review',
  standalone: true,
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class ReviewComponent implements OnInit {
  appointmentId!: number;
  advisorId!: number;
  advisorName: string = '';
  advisorPhoto: string = '';
  rating = 0;
  comment = '';
  loading = true;
  isEdit = false;
  hasReview = false;
  reviewId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private appointmentService: AppointmentService,
    private availableDateService: AvailableDateService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit(): void {
    // Obtener ID del appointment de la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/apps/farmer/appointments/history']);
      return;
    }

    this.appointmentId = id;
    this.loadAppointmentData();
  }

  loadAppointmentData() {
    this.loading = true;
    const farmerId = Number(localStorage.getItem('farmerId')) || 1;

    // Obtener datos del appointment
    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (appt) => {
        // Obtener fecha disponible para conseguir el advisorId
        this.availableDateService.getAvailableDateById(appt.availableDateId).subscribe({
          next: (date) => {
            this.advisorId = date.advisorId;
            // Obtener datos del asesor
            this.advisorService.getAdvisor(date.advisorId).subscribe({
              next: (advisor) => {
                this.advisorName = advisor.firstName + ' ' + advisor.lastName;
                this.advisorPhoto = advisor.photo;

                // Verificar si ya existe una review
                this.checkExistingReview(this.advisorId, farmerId);
              },
              error: () => {
                this.loading = false;
                this.router.navigate(['/apps/farmer/appointments/history']);
              }
            });
          },
          error: () => {
            this.loading = false;
            this.router.navigate(['/apps/farmer/appointments/history']);
          }
        });
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/apps/farmer/appointments/history']);
      }
    });
  }

  checkExistingReview(advisorId: number, farmerId: number) {
    this.reviewService.getReviewByAdvisorAndFarmer(advisorId, farmerId).subscribe({
      next: (reviews) => {
        // El endpoint retorna un array. Si existe, tendrá 1 elemento
        if (reviews && reviews.length > 0) {
          const review = reviews[0];
          this.hasReview = true;
          this.reviewId = review.id;
          this.rating = review.rating;
          this.comment = review.comment;
        } else {
          // Array vacío = no existe review
          this.hasReview = false;
        }
        this.loading = false;
      },
      error: (err) => {
        // 404 = no existe review
        console.log('No hay review existente:', err.status === 404 ? 'Not Found' : err);
        this.hasReview = false;
        this.loading = false;
      }
    });
  }

  setRating(r: number) {
    // Solo permitir cambiar rating si no hay review o está en modo edición
    if (!this.hasReview || this.isEdit) {
      this.rating = r;
    }
  }

  submit() {
    this.loading = true;
    if (this.hasReview && this.isEdit && this.reviewId) {
      // Actualizar review existente
      this.reviewService.updateReview(this.reviewId, this.rating, this.comment).subscribe({
        next: () => {
          this.loading = false;
          this.isEdit = false;
        },
        error: (err) => {
          console.error('Error actualizando review:', err);
          this.loading = false;
        }
      });
    } else {
      // Crear nueva review
      this.reviewService.createReview(this.advisorId, this.rating, this.comment).subscribe({
        next: (review) => {
          this.loading = false;
          this.hasReview = true;
          this.reviewId = review.id;
          this.isEdit = false;
        },
        error: (err) => {
          console.error('Error creando review:', err);
          this.loading = false;
          // Si el error es 409 (Conflict - ya existe), cargar la review existente
          if (err.status === 409 || err.status === 400) {
            const farmerId = Number(localStorage.getItem('farmerId')) || 1;
            this.checkExistingReview(this.advisorId, farmerId);
          }
        }
      });
    }
  }

  editReview() {
    this.isEdit = true;
  }
}
