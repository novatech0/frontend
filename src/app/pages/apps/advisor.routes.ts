import { Routes } from '@angular/router';

import {AdvisorAppointmentsComponent} from "./advisor/appointments/advisor-appointments.component";
import {AdvisorAppointmentDetailComponent} from "./advisor/appointments/detail/advisor-appointment-detail.component";
import {AdvisorHistoryComponent} from "./advisor/appointments/history/advisor-history.component";
import {AdvisorReviewViewComponent} from "./advisor/appointments/review/advisor-review-view.component";
import {AvailableDatesComponent} from "./advisor/available-dates/available-dates.component";
import {AdvisorPostsComponent} from "./advisor/posts/advisor-posts.component";
import {EditPostComponent} from "./advisor/posts/edit-post/edit-post.component";
import {CreatePostComponent} from "./advisor/posts/create-post/create-post.component";


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
            { title: 'Appointments', url: '/apps/advisor/appointments' },
          ],
        }
      },
      {
        path: 'appointments/history',
        component: AdvisorHistoryComponent,
        data: {
          title: 'Historial de citas',
          urls: [
            { title: 'Appointments', url: '/apps/advisor/appointments' },
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
            { title: 'Appointments', url: '/apps/advisor/appointments' },
            { title: 'Detail' },
          ],
        }
      },
      {
        path: 'posts',
        component: AdvisorPostsComponent,
        data: {
          title: 'Mis publicaciones',
          urls: [
            { title: 'Posts',  url: '/apps/advisor/posts' },
          ]
        }
      },
      {
        path: 'posts/:id',
        component: EditPostComponent,
        data: {
          title: 'Detalle de publicacion',
          urls: [
            { title: 'Posts', url: '/apps/advisor/posts' },
            { title: 'Detail' },
          ],
        }
      },
      {
        path: 'posts/create',
        component: CreatePostComponent,
        data: {
          title: 'Crear nueva publicacion',
          urls: [
            { title: 'Posts', url: '/apps/advisor/posts' },
            { title: 'Create Post' }
          ],
        }
      },
      {
        path: 'available-dates',
        component: AvailableDatesComponent,
        data: {
          title: 'Mis Horarios',
          urls: [
            { title: 'Available Dates', url: '/apps/advisor/available-dates' },
          ]
        }
      },
    ],
  },
];
