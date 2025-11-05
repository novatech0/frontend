import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {AuthGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'starter',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'apps',
        children: [
          {
            path: 'farmer', // subpath interno para FarmerRoutes
            loadChildren: () =>
              import('./pages/apps/farmer.routes').then((m) => m.FarmerRoutes),
          },
          {
            path: 'advisor', // subpath interno para AdvisorRoutes
            loadChildren: () =>
              import('./pages/apps/advisor.routes').then((m) => m.AdvisorRoutes),
          },
        ],
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
      {
        path: 'landingpage',
        loadChildren: () =>
          import('./pages/theme-pages/landingpage/landingpage.routes').then(
            (m) => m.LandingPageRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
