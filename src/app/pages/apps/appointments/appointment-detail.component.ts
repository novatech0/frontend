export * from './detail/appointment-detail.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/apps/appointment/appointment.service';
import { Appointment } from './appointment.model';
import { AvailableDateService } from 'src/app/services/apps/catalog/available-date.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AppointmentDetailComponent implements OnInit {
  appointment?: Appointment;
  loading = true;
  error = false;
  formattedDate = '';
  formattedTime = '';
  showCancelModal = false;
  cancelReason = '';
  cancelError = '';
  cancelLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private availableDateService: AvailableDateService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appt) => {
        this.availableDateService.getAvailableDateById(appt.availableDateId).subscribe({
          next: (date) => {
            this.appointment = {
              ...appt,
              scheduledDate: date.scheduledDate instanceof Date ? date.scheduledDate.toISOString().split('T')[0] : String(date.scheduledDate),
              startTime: date.startTime,
              endTime: date.endTime
            };
            this.formattedDate = this.formatDate(this.appointment.scheduledDate);
            this.formattedTime = this.formatTime(this.appointment.startTime, this.appointment.endTime);
            this.loading = false;
          },
          error: () => {
            this.loading = false;
            this.error = true;
          }
        });
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  formatDate(dateVal: string | Date | undefined): string {
    if (!dateVal) return '';
    let d: Date | null = null;
    if (dateVal instanceof Date && !isNaN(dateVal as any)) {
      d = dateVal;
    } else if (typeof dateVal === 'string' && dateVal) {
      d = new Date(dateVal);
      if (isNaN(d.getTime()) && typeof dateVal === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
        const dateStr: string = dateVal as string;
        const [y, m, day] = dateStr.split('-');
        d = new Date(Number(y), Number(m) - 1, Number(day));
      }
    }
    if (d && !isNaN(d.getTime())) {
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return '';
  }

  formatTime(start?: string, end?: string): string {
    return start && end ? `${start} - ${end}` : '';
  }

  goBack() {
    this.router.navigate(['/apps/appointments']);
  }

  openCancelModal() {
    this.showCancelModal = true;
    this.cancelReason = '';
    this.cancelError = '';
  }

  closeCancelModal() {
    this.showCancelModal = false;
    this.cancelReason = '';
    this.cancelError = '';
  }

  confirmCancel() {
    if (!this.cancelReason.trim()) {
      this.cancelError = 'Debes ingresar un motivo.';
      return;
    }
    this.cancelLoading = true;
    // Aquí iría la llamada real al backend para cancelar la cita
    setTimeout(() => {
      this.cancelLoading = false;
      this.closeCancelModal();
      this.router.navigate(['/apps/appointments']);
    }, 1200);
  }
}
