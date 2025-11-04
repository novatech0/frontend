import { Routes } from '@angular/router';

import { AppPostsComponent } from './farmer/posts/posts.component';
import {AppCatalogComponent} from "./farmer/catalog/catalog.component";
import {AppAdvisorDetailComponent} from "./farmer/catalog/advisor-detail/advisor-detail.component";
import {AppBookAppointmentComponent} from "./farmer/catalog/book-appointment/book-appointment.component";
import { AppEnclosuresComponent } from './farmer/enclosures/enclosures.component';
import {AppAppointmentsComponent} from "./farmer/appointment/appointments.component";
import {AppAppointmentsHistoryComponent} from "./farmer/appointment/history/appointments-history.component";
import {ReviewComponent} from "./farmer/appointment/review/review.component";
import {AppointmentDetailComponent} from "./farmer/appointment/detail/appointment-detail.component";


export const FarmerRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'catalog',
        component: AppCatalogComponent,
        data: {
          title: 'Catálogo de asesores',
          urls: [
            { title: 'Catalog' },
          ],
        },
      },
      {
        path: 'catalog/:advisorId',
        component: AppAdvisorDetailComponent,
        data: {
          title: 'Detalle del asesor',
          urls: [
            { title: 'Catalog', url: '/apps/farmer/catalog' },
            { title: 'Advisor Detail' },
          ]
        }
      },
      {
        path: 'catalog/:advisorId/book',
        component: AppBookAppointmentComponent,
        data: {
          title: 'Reservar cita',
          urls: [
            { title: 'Catalog', url: '/apps/farmer/catalog' },
            { title: 'Book Appointment' },
          ]
        }
      },
      {
        path: 'appointments',
        component: AppAppointmentsComponent,
        data: {
          title: 'Mis citas',
          urls: [
            { title: 'Appointments' },
          ],
        }
      },
      {
        path: 'appointments/history',
        component: AppAppointmentsHistoryComponent,
        data: {
          title: 'Historial de citas',
          urls: [
            { title: 'Appointments', url: '/apps/farmer/appointments' },
            { title: 'Appointment History' },
          ],
        }
      },
      {
        path: 'appointments/review/:id',
        component: ReviewComponent,
        data: {
          title: 'Evaluar cita',
          urls: [
            { title: 'Appointments', url: '/apps/farmer/appointments' },
            { title: 'History', url: '/apps/farmer/appointments/history' },
            { title: 'Review' },
          ],
        }
      },
      {
        path: 'appointments/:id',
        component: AppointmentDetailComponent,
        data: {
          title: 'Detalle de la cita',
          urls: [
            { title: 'Appointments', url: '/apps/farmer/appointments' },
            { title: 'Appointment Detail' },
          ],
        }
      },
      {
        path: 'review/:advisorId',
        component: ReviewComponent,
        data: {
          title: 'Reseñas del asesor',
          urls: [
            { title: 'Appointments', url: '/apps/farmer/appointments' },
            { title: 'Advisor Reviews' },
          ],
        }
      },
      {
        path: 'enclosures',
        component: AppEnclosuresComponent,
        data: {
          title: 'Mis recintos',
          urls: [
            { url: '/apps/farmer/enclosures' },
            { title: 'Enclosures' },
          ],
        },
      },
      {
        path: 'posts',
        component: AppPostsComponent,
        data: {
          title: 'Publicaciones de asesores',
          urls: [
            { title: 'Posts' },
          ]
        }
      }
    ],
  },
];
