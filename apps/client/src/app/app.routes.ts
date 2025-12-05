import { Route } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'tetan_aime_coder',
    loadChildren: () =>
      import('./features/auth/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/auth/register/register.route').then((m) => m.REGISTER_ROUTES),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./features/auth/forgot-password/forgot-password.routes').then((m) => m.FORGOT_PASSWORD_ROUTES),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./features/auth/reset-password/reset-password.routes').then((m) => m.RESET_PASSWORD_ROUTES),
  },
  {
    path: 'flo_le_meilleur_prof',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'fact-checking',
    loadChildren: () =>
      import('./features/fact-checking/fact-checking.routes').then((m) => m.FACT_CHECKING_ROUTES),
  },
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import('./features/legal/mentions-legales.component').then((m) => m.MentionsLegalesComponent),
  },
  {
    path: 'confidentialite',
    loadComponent: () =>
      import('./features/legal/confidentialite.component').then((m) => m.ConfidentialiteComponent),
  },
  {
    path: 'cgu',
    loadComponent: () =>
      import('./features/legal/cgu.component').then((m) => m.CguComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];