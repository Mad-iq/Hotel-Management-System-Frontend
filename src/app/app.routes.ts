import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { Roles } from './core/auth/roles';


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
  path: 'unauthorized',
  loadComponent: () =>
    import('./features/unauthorized/unauthorized')
      .then(m => m.UnauthorizedComponent)
},
  {
  path: 'hotels/:hotelId/rooms',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/hotels/room-list/room-list')
      .then(m => m.RoomListComponent)
},
{
  path: 'bookings/:bookingId',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/bookings/booking-confirmation/booking-confirmation')
      .then(m => m.BookingConfirmationComponent)
},
{
  path: 'payments/:bookingId',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/bookings/booking-payment/booking-payment')
      .then(m => m.BookingPaymentComponent)
},
{
  path: 'my-bookings',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/bookings/my-bookings/my-bookings')
      .then(m => m.MyBookings)
},
{
  path: 'profile',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./features/auth/profile/profile')
      .then(m => m.ProfileComponent)
},
{
  path: 'dashboard/admin',
  canActivate: [roleGuard],
  data: { roles: [Roles.ADMIN] },
  loadComponent: () =>
    import('./features/dashboard/admin/admin-dashboard/admin-dashboard')
      .then(m => m.AdminDashboardComponent)
},
{
  path: 'admin/hotels',
  canActivate: [roleGuard],
  data: { roles: [Roles.ADMIN] },
  loadComponent: () =>
    import('./features/admin/hotels/admin-hotels/admin-hotels')
      .then(m => m.AdminHotelsComponent)
},
{
  path: 'admin/categories',
  canActivate: [roleGuard],
  data: { roles: [Roles.ADMIN] },
  loadComponent: () =>
    import('./features/admin/hotels/admin-categories/admin-categories')
      .then(m => m.AdminCategoriesComponent)
},
{
  path: 'admin/pricing/base',
  canActivate: [roleGuard],
  data: { roles: [Roles.ADMIN] },
  loadComponent: () =>
    import('./features/admin/pricing/base-pricing/base-pricing')
      .then(m => m.BasePricingComponent)
},
{
  path: 'admin/pricing/seasonal',
  canActivate: [roleGuard],
  data: { roles: [Roles.ADMIN] },
  loadComponent: () =>
    import('./features/admin/pricing/seasonal-pricing/seasonal-pricing')
      .then(m => m.SeasonalPricingComponent)
},
{
  path: 'admin/users',
  canActivate: [roleGuard],
  data: { roles: [Roles.ADMIN] },
  loadComponent: () =>
    import('./features/admin/users/admin-users/admin-users')
      .then(m => m.AdminUsersComponent)
},
{
  path: 'admin/room',
  canActivate: [roleGuard],
  data: { roles: [Roles.ADMIN] },
  loadComponent: () =>
    import('./features/admin/hotels/admin-room/admin-room')
      .then(m => m.AdminRoomComponent)
},
{
  path: 'admin/reports',
  canActivate: [roleGuard],
  data: { roles: [Roles.ADMIN] },
  loadComponent: () =>
    import('./features/admin/reports/admin-reports/admin-reports')
      .then(m => m.AdminReportsComponent)
},
{
  path: 'dashboard/manager',
  canActivate: [roleGuard],
  data: { roles: [Roles.MANAGER] },
  loadComponent: () =>
    import('./features/dashboard/manager/manager-dashboard/manager-dashboard')
      .then(m => m.ManagerDashboardComponent)
},
{
  path: 'manager/pricing/seasonal',
  canActivate: [roleGuard],
  data: { roles: [Roles.MANAGER] },
  loadComponent: () =>
    import('./features/admin/pricing/seasonal-pricing/seasonal-pricing')
      .then(m => m.SeasonalPricingComponent)
},
{
  path: 'manager/check-in',
  canActivate: [roleGuard],
  data: { roles: [Roles.MANAGER] },
  loadComponent: () =>
    import('./features/check-in/check-in/check-in')
      .then(m => m.CheckInComponent)
},
{
  path: 'manager/check-out',
  canActivate: [roleGuard],
  data: { roles: [Roles.MANAGER] },
  loadComponent: () =>
    import('./features/check-out/check-out/check-out')
      .then(m => m.CheckOutComponent)
},
{
  path: 'dashboard/receptionist',
  canActivate: [roleGuard],
  data: { roles: [Roles.RECEPTIONIST] },
  loadComponent: () =>
    import('./features/dashboard/receptionist/receptionist-dashboard/receptionist-dashboard')
      .then(m => m.ReceptionistDashboardComponent)
},
{
  path: 'receptionist/check-in',
  canActivate: [roleGuard],
  data: { roles: [Roles.RECEPTIONIST] },
  loadComponent: () =>
    import('./features/check-in/check-in/check-in')
      .then(m => m.CheckInComponent)
},
{
  path: 'receptionist/check-out',
  canActivate: [roleGuard],
  data: { roles: [Roles.RECEPTIONIST] },
  loadComponent: () =>
    import('./features/check-out/check-out/check-out')
      .then(m => m.CheckOutComponent)
},

];
