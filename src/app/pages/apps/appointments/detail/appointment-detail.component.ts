  // ...existing code...
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/apps/appointment/appointment.service';
import { AvailableDateService } from 'src/app/services/apps/catalog/available-date.service';
import { AdvisorService } from 'src/app/services/apps/catalog/advisor.service';
import { TimeFormatPipe } from '../../appointments/filter.pipe';
import type { Appointment } from 'src/app/pages/apps/appointments/appointment.model';

@Component({
  selector: 'app-appointment-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeFormatPipe],
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {
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
    private availableDateService: AvailableDateService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }
    this.appointmentService.getAppointmentById(id).subscribe({
      next: (appt) => {
        this.availableDateService.getAvailableDateById(appt.availableDateId).subscribe({
          next: (date) => {
            this.advisorService.getAdvisor(date.advisorId).subscribe({
              next: (advisor) => {
                this.appointment = {
                  ...appt,
                  advisorName: advisor.firstName + ' ' + advisor.lastName,
                  advisorPhoto: advisor.photo,
                  scheduledDate: date.scheduledDate instanceof Date ? date.scheduledDate.toISOString().split('T')[0] : String(date.scheduledDate),
                  startTime: date.startTime,
                  endTime: date.endTime
                };
                // Formatear fecha y hora para el input (robusto)
                let d: Date | null = null;
                // Depuración: mostrar en consola el valor recibido
                // eslint-disable-next-line no-console
                console.log('Valor de scheduledDate recibido:', date.scheduledDate);
                  this.formattedDate = this.formatDate(date.scheduledDate);
                  this.formattedTime = this.formatTime(date.startTime, date.endTime);
                this.loading = false;
              },
              error: () => { this.error = true; this.loading = false; }
            });
          },
          error: () => { this.error = true; this.loading = false; }
        });
      },
      error: () => { this.error = true; this.loading = false; }
    });
  }

  goBack() {
    this.router.navigate(['/apps/appointments']);
  }

  openCancelModal() {
    this.cancelReason = '';
    this.cancelError = '';
    this.showCancelModal = true;
  }
  closeCancelModal() {
    this.showCancelModal = false;
    this.cancelReason = '';
    this.cancelError = '';
  }
  confirmCancel() {
    if (!this.cancelReason.trim()) {
      this.cancelError = 'Por favor, ingresa el motivo.';
      return;
    }
    if (!this.appointment) return;
    this.cancelLoading = true;
    this.appointmentService.cancelAppointment(this.appointment.id, this.cancelReason).subscribe({
      next: () => {
        this.cancelLoading = false;
        this.showCancelModal = false;
        this.router.navigate(['/apps/appointments']);
      },
      error: () => {
        this.cancelLoading = false;
        this.cancelError = 'No se pudo cancelar la cita. Intenta de nuevo.';
      }
    });
  }
}
