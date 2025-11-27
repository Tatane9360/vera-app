import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./features/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.routes').then((m) => m.ABOUT_ROUTES),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
  },
  {
    path: 'fact-checking',
    loadChildren: () =>
      import('./features/fact-checking/fact-checking.routes').then((m) => m.FACT_CHECKING_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
