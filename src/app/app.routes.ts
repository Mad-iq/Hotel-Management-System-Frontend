import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { Home } from './features/home/home';


export const routes: Routes = [
  { path: '', component: Home },  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'hotels',
    loadComponent: () =>
      import('./features/hotels/hotels-list/hotels-list')
        .then(m => m.HotelsListComponent)
  }
];
