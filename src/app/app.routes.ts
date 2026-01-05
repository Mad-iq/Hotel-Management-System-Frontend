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
},
{
  path: 'profile',
  loadComponent: () =>
    import('./features/auth/profile/profile')
      .then(m => m.ProfileComponent)
},
{
  path: 'dashboard/admin',
  loadComponent: () =>
    import('./features/dashboard/admin/admin-dashboard/admin-dashboard')
      .then(m => m.AdminDashboardComponent)
},
{
  path: 'admin/hotels',
  loadComponent: () =>
    import('./features/admin/hotels/admin-hotels/admin-hotels')
      .then(m => m.AdminHotelsComponent)
},
{
  path: 'admin/categories',
  loadComponent: () =>
    import('./features/admin/hotels/admin-categories/admin-categories')
      .then(m => m.AdminCategoriesComponent)
},
{
  path: 'admin/pricing/base',
  loadComponent: () =>
    import('./features/admin/pricing/base-pricing/base-pricing')
      .then(m => m.BasePricingComponent)
},
{
  path: 'admin/pricing/seasonal',
  loadComponent: () =>
    import('./features/admin/pricing/seasonal-pricing/seasonal-pricing')
      .then(m => m.SeasonalPricingComponent)
},
{
  path: 'manager/pricing/seasonal',
  loadComponent: () =>
    import('./features/admin/pricing/seasonal-pricing/seasonal-pricing')
      .then(m => m.SeasonalPricingComponent)
},
{
  path: 'admin/users',
  loadComponent: () =>
    import('./features/admin/users/admin-users/admin-users')
      .then(m => m.AdminUsersComponent)
},
{
  path: 'admin/room',
  loadComponent: () =>
    import('./features/admin/hotels/admin-room/admin-room')
      .then(m => m.AdminRoomComponent),
},
{
  path: 'admin/reports',
  loadComponent: () =>
    import('./features/admin/reports/admin-reports/admin-reports')
      .then(m => m.AdminReportsComponent),
},
{
  path: 'dashboard/manager',
  loadComponent: () =>
    import('./features/dashboard/manager/manager-dashboard/manager-dashboard')
      .then(m => m.ManagerDashboardComponent)
},
{
    path: 'manager/check-in',
    loadComponent: () =>
      import('./features/check-in/check-in/check-in')
        .then(m => m.CheckInComponent),
  },
  {
  path: 'receptionist/check-in',
  loadComponent: () =>
    import('./features/check-in/check-in/check-in')
      .then(m => m.CheckInComponent),
},
{
    path: 'manager/check-out',
    loadComponent: () =>
      import('./features/check-out/check-out/check-out')
        .then(m => m.CheckOutComponent),
  },
  {
  path: 'receptionist/check-out',
  loadComponent: () =>
    import('./features/check-out/check-out/check-out')
      .then(m => m.CheckOutComponent),
},
{
  path: 'dashboard/receptionist',
  loadComponent: () =>
    import('./features/dashboard/receptionist/receptionist-dashboard/receptionist-dashboard')
      .then(m => m.ReceptionistDashboardComponent)
}
  


];
