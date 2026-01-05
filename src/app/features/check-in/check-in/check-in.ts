import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Booking } from '../../../core/models/booking.model';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './check-in.html',
  styleUrl: './check-in.css',
})
export class CheckInComponent {
  bookingIdInput!: number;
  booking: Booking | null = null;

  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private bookingService: BookingService) {}

  fetchBooking(): void {
    this.resetMessages();
    this.booking = null;

    if (!this.bookingIdInput) {
      this.errorMessage = 'Please enter a valid booking ID';
      return;
    }

    this.loading = true;

    this.bookingService.getBookingById(this.bookingIdInput).subscribe({
      next: (booking) => {
        this.booking = booking;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err?.error?.message || 'Booking not found';
      },
    });
  }

  canCheckIn(): boolean {
    if (!this.booking) return false;

    const today = new Date().toISOString().split('T')[0];

    return (
      this.booking.bookingStatus === 'CONFIRMED' &&
      this.booking.checkInDate === today
    );
  }

  checkIn(): void {
    if (!this.booking) return;

    this.loading = true;
    this.resetMessages();

    this.bookingService.checkIn(this.booking.id).subscribe({
      next: (updatedBooking) => {
        this.booking = updatedBooking;
        this.successMessage = 'Guest checked in successfully';
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage =
          err?.error?.message || 'Check-in failed';
      },
    });
  }

  private resetMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
