import { Routes } from '@angular/router';

import { AppChatComponent } from './template/chat/chat.component';
import { AppEmailComponent } from './email/email.component';
import { DetailComponent } from './email/detail/detail.component';
import { AppCoursesComponent } from './courses/courses.component';
import { AppCourseDetailComponent } from './courses/course-detail/course-detail.component';
import { AppEmployeeComponent } from './employee/employee.component';
import { AppPostsComponent } from './farmer/posts/posts.component';
import { AppContactComponent } from './template/contact/contact.component';
import { AppNotesComponent } from './template/notes/notes.component';
import { AppTodoComponent } from './template/todo/todo.component';
import { AppPermissionComponent } from './template/permission/permission.component';
import { AppKanbanComponent } from './template/kanban/kanban.component';
import { AppFullcalendarComponent } from './fullcalendar/fullcalendar.component';
import { AppTicketlistComponent } from './template/tickets/tickets.component';
import { AppInvoiceListComponent } from './invoice/invoice-list/invoice-list.component';
import { AppAddInvoiceComponent } from './invoice/add-invoice/add-invoice.component';
import { AppInvoiceViewComponent } from './invoice/invoice-view/invoice-view.component';
import { AppEditInvoiceComponent } from './invoice/edit-invoice/edit-invoice.component';
import { AppContactListComponent } from './template/contact-list/contact-list.component';
import {AppCatalogComponent} from "./farmer/catalog/catalog.component";
import {AppAdvisorDetailComponent} from "./farmer/catalog/advisor-detail/advisor-detail.component";
import {AppBookAppointmentComponent} from "./farmer/catalog/book-appointment/book-appointment.component";
import { AppEnclosuresComponent } from './farmer/enclosures/enclosures.component';
import {AppAppointmentsComponent} from "./farmer/appointment/appointments.component";
import {AppAppointmentsHistoryComponent} from "./farmer/appointment/history/appointments-history.component";
import {ReviewComponent} from "./farmer/appointment/review/review.component";
import {AppointmentDetailComponent} from "./farmer/appointment/detail/appointment-detail.component";
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
