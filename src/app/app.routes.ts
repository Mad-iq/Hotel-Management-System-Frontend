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
  },
  {
      path: 'hotels/:hotelId/rooms',
      loadComponent: () =>
        import('./features/hotels/room-list/room-list')
          .then(m => m.RoomListComponent)
    },
  {
  path: 'bookings/:bookingId',
  loadComponent: () =>
    import('./features/bookings/booking-confirmation/booking-confirmation')
      .then(m => m.BookingConfirmationComponent)
},
 {
  path: 'payments/:bookingId',
  loadComponent: () =>
    import('./features/bookings/booking-payment/booking-payment')
      .then(m => m.BookingPaymentComponent)
 },
 {
  path: 'my-bookings',
  loadComponent: () =>
    import('./features/bookings/my-bookings/my-bookings')
      .then(m => m.MyBookings)
}

];
