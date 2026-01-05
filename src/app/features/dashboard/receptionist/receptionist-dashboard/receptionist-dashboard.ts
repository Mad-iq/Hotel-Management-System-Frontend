import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist-dashboard',
  imports: [],
  templateUrl: './receptionist-dashboard.html',
  styleUrl: './receptionist-dashboard.css',
})
export class ReceptionistDashboardComponent {

   constructor(private router: Router) {}

  goToCheckIn(): void {
    this.router.navigate(['/receptionist/check-in']);
  }

  goToCheckOut(): void {
    this.router.navigate(['/receptionist/check-out']);
  }
}
