import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {

  bookings: Booking[] = [];
  loading = false;
  error: string | null = null;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadMyBookings();
  }

  loadMyBookings(): void {
    this.loading = true;
    this.error = null;

    this.bookingService.getMyBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error =err.error?.message ||
          err.error?.error ||
          'Failed to load your bookings';
      }
    });
  }
}
