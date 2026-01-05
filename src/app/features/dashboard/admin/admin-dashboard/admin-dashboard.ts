import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

  goToSeasonalPrice(): void {
    this.router.navigate(['/admin/pricing/seasonal']);
  }

   goToBasePrice(): void {
    this.router.navigate(['/admin/pricing/base']);
  }

   goToHotels(): void {
    this.router.navigate(['/admin/hotels']);
  }

   goToCategories(): void {
    this.router.navigate(['/admin/categories']);
  }

   goToUsers(): void {
    this.router.navigate(['/admin/users']);
  }

   goToRooms(): void {
    this.router.navigate(['/admin/room']);
  }

   goToReport(): void {
    this.router.navigate(['/admin/reports']);
  }
}
