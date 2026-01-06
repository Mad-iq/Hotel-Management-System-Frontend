import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Roles } from '../../core/auth/roles';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLoggedIn = computed(() => this.authService.isLoggedIn());

  roles = computed(() => this.authService.getRoles());

  isGuest = computed(() =>
    this.roles().includes(Roles.GUEST)
  );

  isStaff = computed(() =>
    this.roles().some(role =>
      role === Roles.ADMIN ||
      role === Roles.MANAGER ||
      role === Roles.RECEPTIONIST
    )
  );

  dashboardRoute = computed(() => {
    if (this.roles().includes(Roles.ADMIN)) {
      return '/dashboard/admin';
    }
    if (this.roles().includes(Roles.MANAGER)) {
      return '/dashboard/manager';
    }
    if (this.roles().includes(Roles.RECEPTIONIST)) {
      return '/dashboard/receptionist';
    }
    return null;
  });

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
