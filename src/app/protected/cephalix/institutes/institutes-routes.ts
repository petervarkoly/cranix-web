import {  Routes } from '@angular/router';
import { InstitutesListsPage } from './lists/institutes-lists.page'

export const institutesRoutes: Routes = [
  {
    path: '',
    component: InstitutesListsPage,
    children: [
      {
        path: 'all',
        loadComponent: () =>
          import('./lists/institutes.component').then((m) => m.InstitutesComponent),
      },
      {
        path: 'status',
        loadComponent: () =>
          import('./lists/institutes-status.component').then((m) => m.InstitutesStatusComponent),
      },
      {
        path: 'sync',
        loadComponent: () =>
          import('./lists/institutes-sync-objects.component').then((m) => m.InstitutesSyncObjectsComponent),
      },
      {
        path: 'manage',
        loadComponent: () =>
          import('./lists/institutes.manage').then((m) => m.InstitutesManage),
      },
      {
        path: '',
        redirectTo: '/protected/cephalix/institutes/all',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: ':id',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

