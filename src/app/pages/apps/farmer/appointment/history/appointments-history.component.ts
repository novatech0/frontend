import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from 'src/app/services/apps/appointment/appointment.service';
import { AppointmentDetailed } from '../appointment-detailed';
import { RouterLink } from "@angular/router";
import { AvailableDateService } from 'src/app/services/apps/catalog/available-date.service';
import { AdvisorService } from 'src/app/services/apps/catalog/advisor.service';
import {TablerIconsModule} from "angular-tabler-icons";
import {MaterialModule} from "../../../../../material.module";
import {TimeFormatPipe} from "../../../../../pipes/filter.pipe";

@Component({
  selector: 'app-appointments-history',
  standalone: true,
  templateUrl: './appointments-history.component.html',
  styleUrls: ['./appointments-history.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    MaterialModule,
    TablerIconsModule,
    TimeFormatPipe,
  ]
})
export class AppAppointmentsHistoryComponent implements OnInit {
  history: AppointmentDetailed[] = [];
  loading = true;

  constructor(
    private appointmentService: AppointmentService,
    private availableDateService: AvailableDateService,
    private advisorService: AdvisorService
  ) {}

  ngOnInit(): void {
    this.fetchHistory();
  }

  fetchHistory() {
    this.loading = true;
    this.appointmentService.getMyAppointments().subscribe({
      next: (data) => {
        if (!data.length) {
          this.history = [];
          this.loading = false;
          return;
        }

        // Enriquecer datos con información del asesor
        let loaded = 0;
        const enriched: AppointmentDetailed[] = [];

        data.forEach((appt, idx) => {
          this.availableDateService.getAvailableDateById(appt.availableDateId).subscribe({
            next: (date) => {
              this.advisorService.getAdvisor(date.advisorId).subscribe({
                next: (advisor) => {
                  enriched[idx] = {
                    ...appt,
                    advisorName: advisor.firstName + ' ' + advisor.lastName,
                    advisorPhoto: advisor.photo,
                    scheduledDate: date.scheduledDate,
                    startTime: date.startTime,
                    endTime: date.endTime
                  };
                  loaded++;
                  if (loaded === data.length) {
                    // Filtrar solo citas PASADAS (completadas o con fecha < hoy)
                    this.history = enriched.filter(a =>
                      a && (a.status === 'COMPLETED' || this.isPast(a))
                    );
                    this.loading = false;
                  }
                },
                error: () => {
                  loaded++;
                  if (loaded === data.length) {
                    this.history = enriched.filter(a =>
                      a && (a.status === 'COMPLETED' || this.isPast(a))
                    );
                    this.loading = false;
                  }
                }
              });
            },
            error: () => {
              loaded++;
              if (loaded === data.length) {
                this.history = enriched.filter(a =>
                  a && (a.status === 'COMPLETED' || this.isPast(a))
                );
                this.loading = false;
              }
            }
          });
        });
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

  isPast(appt: AppointmentDetailed): boolean {
    if (!appt.scheduledDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const apptDate = new Date(appt.scheduledDate);
    apptDate.setHours(0, 0, 0, 0);
    return apptDate < today;
  }
}
