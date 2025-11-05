import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/apps/appointment/appointment.service';
import { AvailableDateService } from 'src/app/services/apps/catalog/available-date.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { FarmerService } from 'src/app/services/apps/catalog/farmer.service';
import { AppointmentDetailed } from '../../../farmer/appointment/appointment-detailed';

@Component({
  selector: 'app-advisor-appointment-detail',
  standalone: true,
  templateUrl: './advisor-appointment-detail.component.html',
  styleUrls: ['./advisor-appointment-detail.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AdvisorAppointmentDetailComponent implements OnInit {
  appointmentId!: number;
  appointment = signal<AppointmentDetailed | null>(null);
  farmerName = signal('');
  farmerPhoto = signal('');
  scheduledDate = signal('');
  startTime = signal('');
  endTime = signal('');
  meetingUrl = signal('');
  message = signal('');
  loading = signal(true);

  // Modal de cancelación
  showCancelModal = signal(false);
  cancelLoading = signal(false);
  cancelError = signal('');
  cancelReason = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private availableDateService: AvailableDateService,
    private profileService: ProfileService,
    private farmerService: FarmerService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.router.navigate(['/apps/advisor/appointments']);
      return;
    }

    this.appointmentId = id;
    this.loadAppointmentData();
  }

  loadAppointmentData() {
    this.loading.set(true);

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe({
      next: (appt) => {
        this.appointment.set(appt);
        this.message.set(appt.message);
        this.meetingUrl.set(appt.meetingUrl || '');

        // Primero obtener el Farmer por farmerId para conseguir el userId
        this.farmerService.getFarmer(appt.farmerId).subscribe({
          next: (farmer) => {
            // Ahora obtener el Profile usando el userId del farmer
            this.profileService.fetchProfile(farmer.userId).subscribe({
              next: (profile) => {
                this.farmerName.set(`${profile.firstName} ${profile.lastName}`);
                this.farmerPhoto.set(profile.photo || 'assets/images/profile/user-1.jpg');
              }
            });
          }
        });

        // Obtener fecha y hora
        this.availableDateService.getAvailableDateById(appt.availableDateId).subscribe({
          next: (date) => {
            // Usar directamente la fecha del backend sin convertir a ISO (evita problemas de zona horaria)
            // Si es una fecha Object, convertir a string YYYY-MM-DD
            let dateString: string;
            if (date.scheduledDate instanceof Date) {
              // Crear fecha local sin conversión UTC
              const year = date.scheduledDate.getFullYear();
              const month = String(date.scheduledDate.getMonth() + 1).padStart(2, '0');
              const day = String(date.scheduledDate.getDate()).padStart(2, '0');
              dateString = `${year}-${month}-${day}`;
            } else {
              // Es un string, usarlo directamente
              dateString = String(date.scheduledDate);
            }
            this.scheduledDate.set(dateString);
            this.startTime.set(date.startTime);
            this.endTime.set(date.endTime);
            this.loading.set(false);
          },
          error: () => {
            this.loading.set(false);
          }
        });
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/apps/advisor/appointments']);
      }
    });
  }

  openCancelModal() {
    this.showCancelModal.set(true);
  }

  closeCancelModal() {
    this.showCancelModal.set(false);
    this.cancelReason = '';
  }

  confirmCancel() {
    if (!this.cancelReason.trim()) {
      return;
    }

    this.cancelLoading.set(true);
    this.cancelError.set('');

    this.appointmentService.cancelAppointment(this.appointmentId, this.cancelReason).subscribe({
      next: () => {
        this.cancelLoading.set(false);
        this.closeCancelModal();
        this.router.navigate(['/apps/appointments/advisor']);
      },
      error: (err) => {
        this.cancelLoading.set(false);
        this.cancelError.set('Error al cancelar la cita. Por favor intenta nuevamente.');
        console.error('Error al cancelar cita:', err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/apps/appointments/advisor']);
  }
}
