import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.css'
})
export class BookingConfirmationComponent implements OnInit {

  bookingId!: number;
  booking!: Booking;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    this.fetchBooking();
  }

  private fetchBooking(): void {
    this.loading = true;
    this.error = null;

    this.bookingService.getBookingById(this.bookingId).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err.error?.message ||
          err.error?.error ||
          'Failed to load booking details';
      }
    });
  }

  goToPayment(): void {
  this.router.navigate(['/payments', this.booking.id]);
 }

}
