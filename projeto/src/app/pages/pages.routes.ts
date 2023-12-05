import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', loadComponent: () => import('./login/login.component')},
      { path: '**', redirectTo: '404', pathMatch: 'full' },
      //{ path: '404', component: NotFoundPageComponent },
    ],
  },
];

export default PAGES_ROUTES;
