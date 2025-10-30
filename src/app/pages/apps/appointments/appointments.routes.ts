import { Routes } from '@angular/router';
import { AppAppointmentsComponent } from './appointments.component';
import { AppAppointmentsHistoryComponent } from './appointments-history.component';
import { AppointmentDetailComponent } from './appointment-detail.component';
import { ReviewComponent } from './review.component';

export const AppointmentsRoutes: Routes = [
  { path: '', component: AppAppointmentsComponent },
  { path: 'history', component: AppAppointmentsHistoryComponent },
  { path: 'detail/:id', component: AppointmentDetailComponent },
  { path: 'review/:advisorId', component: ReviewComponent },
];
