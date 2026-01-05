import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-dashboard',
  imports: [],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.css',
})
export class ManagerDashboardComponent {

  constructor(private router: Router) {}

  goToCheckIn(): void {
    this.router.navigate(['/manager/check-in']);
  }

  goToCheckOut(): void {
    this.router.navigate(['/manager/check-out']);
  }

  goToSeasonalPrice(): void {
    this.router.navigate(['/manager/pricing/seasonal']);
  }
}
