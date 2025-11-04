import { Routes } from '@angular/router';

import { AppChatComponent } from './chat/chat.component';
import { AppEmailComponent } from './email/email.component';
import { DetailComponent } from './email/detail/detail.component';
import { AppCoursesComponent } from './courses/courses.component';
import { AppCourseDetailComponent } from './courses/course-detail/course-detail.component';
import { AppEmployeeComponent } from './employee/employee.component';
import { AppPostsComponent } from './posts/posts.component';
import { AppContactComponent } from './contact/contact.component';
import { AppNotesComponent } from './notes/notes.component';
import { AppTodoComponent } from './todo/todo.component';
import { AppPermissionComponent } from './permission/permission.component';
import { AppKanbanComponent } from './kanban/kanban.component';
import { AppFullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { AppTicketlistComponent } from './tickets/tickets.component';
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { AppContactListComponent } from './contact-list/contact-list.component';
import {AppCatalogComponent} from "./catalog/catalog.component";
import {AppAdvisorDetailComponent} from "./catalog/advisor-detail/advisor-detail.component";
import {AppBookAppointmentComponent} from "./catalog/book-appointment/book-appointment.component";
import { AppEnclosuresComponent } from './enclosures/enclosures.component';
import {AppAppointmentsComponent} from "./appointments/appointments.component";
import {AppAppointmentsHistoryComponent} from "./appointments/history/appointments-history.component";
import {ReviewComponent} from "./appointments/review/review.component";
import {AppointmentDetailComponent} from "./appointments/detail/appointment-detail.component";
import {AdvisorAppointmentsComponent} from "./appointments/advisor/advisor-appointments.component";
import {AdvisorAppointmentDetailComponent} from "./appointments/advisor/detail/advisor-appointment-detail.component";
import {AdvisorHistoryComponent} from "./appointments/advisor/history/advisor-history.component";
import {AdvisorReviewViewComponent} from "./appointments/advisor/review/advisor-review-view.component";


export const AppsRoutes: Routes = [
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
            { title: 'Catalog', url: '/apps/catalog' },
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
            { title: 'Catalog', url: '/apps/catalog' },
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
        path: 'appointments/advisor',
        component: AdvisorAppointmentsComponent,
        data: {
          title: 'Mis Citas - Asesor',
          urls: [
            { title: 'Advisor Appointments' },
          ],
        }
      },
      {
        path: 'appointments/advisor/history',
        component: AdvisorHistoryComponent,
        data: {
          title: 'Historial - Asesor',
          urls: [
            { title: 'Advisor Appointments', url: '/apps/appointments/advisor' },
            { title: 'History' },
          ],
        }
      },
      {
        path: 'appointments/advisor/review/:id',
        component: AdvisorReviewViewComponent,
        data: {
          title: 'Reseña de usuario',
          urls: [
            { title: 'Advisor Appointments', url: '/apps/appointments/advisor' },
            { title: 'History', url: '/apps/appointments/advisor/history' },
            { title: 'Review' },
          ],
        }
      },
      {
        path: 'appointments/advisor/:id',
        component: AdvisorAppointmentDetailComponent,
        data: {
          title: 'Detalle de Cita - Asesor',
          urls: [
            { title: 'Advisor Appointments', url: '/apps/appointments/advisor' },
            { title: 'Detail' },
          ],
        }
      },
      {
        path: 'appointments/history',
        component: AppAppointmentsHistoryComponent,
        data: {
          title: 'Historial de citas',
          urls: [
            { title: 'Appointments', url: '/apps/appointments' },
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
            { title: 'Appointments', url: '/apps/appointments' },
            { title: 'History', url: '/apps/appointments/history' },
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
            { title: 'Appointments', url: '/apps/appointments' },
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
            { title: 'Appointments', url: '/apps/appointments' },
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
            { url: '/apps/enclosures' },
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
      },
      {
        path: 'chat',
        component: AppChatComponent,
        data: {
          title: 'Chat',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Chat' },
          ],
        },
      },
      {
        path: 'calendar',
        component: AppFullcalendarComponent,
        data: {
          title: 'Calendar',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Calendar' },
          ],
        },
      },
      {
        path: 'notes',
        component: AppNotesComponent,
        data: {
          title: 'Notes',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Notes' },
          ],
        },
      },
      { path: 'email', redirectTo: 'email/inbox', pathMatch: 'full' },
      {
        path: 'email/:type',
        component: AppEmailComponent,
        data: {
          title: 'Email',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Email' },
          ],
        },
        children: [
          {
            path: ':id',
            component: DetailComponent,
            data: {
              title: 'Email Detail',
              urls: [
                { title: 'Dashboard', url: '/dashboards/dashboard1' },
                { title: 'Email Detail' },
              ],
            },
          },
        ],
      },
      {
        path: 'permission',
        component: AppPermissionComponent,
        data: {
          title: 'Roll Base Access',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Roll Base Access' },
          ],
        },
      },
      {
        path: 'todo',
        component: AppTodoComponent,
        data: {
          title: 'Todo App',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Todo App' },
          ],
        },
      },
      {
        path: 'kanban',
        component: AppKanbanComponent,
        data: {
          title: 'Kanban',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Kanban' },
          ],
        },
      },
      {
        path: 'tickets',
        component: AppTicketlistComponent,
        data: {
          title: 'Tickets',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Tickets' },
          ],
        },
      },
      {
        path: 'contacts',
        component: AppContactComponent,
        data: {
          title: 'Contacts',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Contacts' },
          ],
        },
      },
      {
        path: 'courses',
        component: AppCoursesComponent,
        data: {
          title: 'Courses',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Courses' },
          ],
        },
      },
      {
        path: 'contact-list',
        component: AppContactListComponent,
        data: {
          title: 'Contact List',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Contact List' },
          ],
        },
      },
      {
        path: 'courses/coursesdetail/:id',
        component: AppCourseDetailComponent,
        data: {
          title: 'Course Detail',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Course Detail' },
          ],
        },
      },
      {
        path: 'employee',
        component: AppEmployeeComponent,
        data: {
          title: 'Employee',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Employee' },
          ],
        },
      },
      {
        path: 'invoice',
        component: AppInvoiceListComponent,
        data: {
          title: 'Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Invoice' },
          ],
        },
      },
      {
        path: 'addInvoice',
        component: AppAddInvoiceComponent,
        data: {
          title: 'Add Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Add Invoice' },
          ],
        },
      },
      {
        path: 'viewInvoice/:id',
        component: AppInvoiceViewComponent,
        data: {
          title: 'View Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'View Invoice' },
          ],
        },
      },
      {
        path: 'editinvoice/:id',
        component: AppEditInvoiceComponent,
        data: {
          title: 'Edit Invoice',
          urls: [
            { title: 'Dashboard', url: '/dashboards/dashboard1' },
            { title: 'Edit Invoice' },
          ],
        },
      },
    ],
  },
];
