import { Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', loadComponent: () => import('./login/login.component')},
      {path: 'home', loadComponent: () => import('./home/home.component')},
      {path: 'cadastro', loadComponent: () => import('./register/register.component')},
      { path: '**', redirectTo: '404', pathMatch: 'full' },
    ],
  },
];

export default PAGES_ROUTES;
