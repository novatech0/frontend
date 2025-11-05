import { Routes } from '@angular/router';

import {AdvisorAppointmentsComponent} from "./advisor/appointments/advisor-appointments.component";
import {AdvisorAppointmentDetailComponent} from "./advisor/appointments/detail/advisor-appointment-detail.component";
import {AdvisorHistoryComponent} from "./advisor/appointments/history/advisor-history.component";
import {AdvisorReviewViewComponent} from "./advisor/appointments/review/advisor-review-view.component";


export const AdvisorRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'appointments',
        component: AdvisorAppointmentsComponent,
        data: {
          title: 'Mis citas',
          urls: [
            { title: 'Advisor Appointments' },
          ],
        }
      },
      {
        path: 'appointments/history',
        component: AdvisorHistoryComponent,
        data: {
          title: 'Historial de citas',
          urls: [
            { title: 'Advisor Appointments', url: '/apps/advisor/appointments' },
            { title: 'History' },
          ],
        }
      },
      {
        path: 'appointments/review/:id',
        component: AdvisorReviewViewComponent,
        data: {
          title: 'Reseña de usuario',
          urls: [
            { title: 'Advisor Appointments', url: '/apps/advisor/appointments' },
            { title: 'History', url: '/apps/advisor/appointments/history' },
            { title: 'Review' },
          ],
        }
      },
      {
        path: 'appointments/:id',
        component: AdvisorAppointmentDetailComponent,
        data: {
          title: 'Detalle de cita',
          urls: [
            { title: 'Advisor Appointments', url: '/apps/advisor/appointments' },
            { title: 'Detail' },
          ],
        }
      },
    ],
  },
];
