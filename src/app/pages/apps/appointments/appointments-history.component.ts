import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from 'src/app/services/apps/appointment/appointment.service';
import { Appointment } from './appointment.model';

@Component({
  selector: 'app-appointments-history',
  templateUrl: './appointments-history.component.html',
  styleUrls: ['./appointments-history.component.scss'],
  imports: [
    CommonModule
  ]
})
export class AppAppointmentsHistoryComponent implements OnInit {
  history: Appointment[] = [];
  loading = true;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory() {
    this.loading = true;
    this.appointmentService.getMyAppointments().subscribe({
      next: (data) => {
        // Solo citas pasadas (status COMPLETED o fecha < hoy)
        this.history = data.filter(a => a.status === 'COMPLETED' || this.isPast(a));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
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
        const [y, m, day] = dateVal.split('-');
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

  isPast(appt: Appointment): boolean {
    if (!appt.scheduledDate) return false;
    const today = new Date();
    const apptDate = new Date(appt.scheduledDate);
    return apptDate < today;
  }
}
