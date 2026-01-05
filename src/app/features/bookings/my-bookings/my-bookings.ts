import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/models/booking.model';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, ConfirmationDialogComponent],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.css',
})
export class MyBookings implements OnInit {

  bookings: Booking[] = [];
  loading = false;
  error: string | null = null;

  showCancelDialog = false;
  bookingToCancel: Booking | null = null;
  cancellingBooking = false;

  constructor(private bookingService: BookingService, private router: Router) {}

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
        this.error = err.error?.message ||
          err.error?.error ||
          'Failed to load your bookings';
      }
    });
  }

  viewPayment(bookingId: number): void {
    this.router.navigate(['/payments', bookingId]);
  }

  openCancelDialog(booking: Booking): void {
    this.bookingToCancel = booking;
    this.showCancelDialog = true;
  }

  closeCancelDialog(): void {
    if (!this.cancellingBooking) {
      this.showCancelDialog = false;
      this.bookingToCancel = null;
    }
  }

  confirmCancelBooking(): void {
    if (!this.bookingToCancel) return;

    this.cancellingBooking = true;

    this.bookingService.cancelBooking(this.bookingToCancel.id).subscribe({
      next: () => {
        if (this.bookingToCancel) {
          this.bookingToCancel.bookingStatus = 'CANCELLED';
        }
        this.cancellingBooking = false;
        this.showCancelDialog = false;
        this.bookingToCancel = null;
      },
      error: (err) => {
        this.cancellingBooking = false;
        this.error = err.error?.message ||
          err.error?.error ||
          'Failed to cancel booking';
        this.showCancelDialog = false;
        this.bookingToCancel = null;
      }
    });
  }
}