import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BookingService } from '../../../core/services/booking.service';
import { AvailableRoomsByCategory } from '../../../core/models/available-rooms-by-category.model';

@Component({
  selector: 'app-room-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-list.html',
  styleUrl: './room-list.css'
})
export class RoomListComponent implements OnInit {

  hotelId!: number;
  checkIn!: string;
  checkOut!: string;
  guests?: number;

  loading = false;
  error: string | null = null;
  bookingInProgress = false;

  availableRooms: AvailableRoomsByCategory[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
     private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.route.queryParams.subscribe(params => {
      this.checkIn = params['checkIn'];
      this.checkOut = params['checkOut'];
      this.guests = params['guests']
        ? Number(params['guests'])
        : undefined;

      this.fetchAvailableRooms();
    });
  }

  private fetchAvailableRooms(): void {
    if (!this.hotelId || !this.checkIn || !this.checkOut) {
      this.error = 'Invalid booking details';
      return;
    }
    this.loading = true;
    this.error = null;
    this.bookingService
      .getAvailableRooms(this.hotelId,this.checkIn,this.checkOut,this.guests).subscribe({
        next: (response) =>{
          this.availableRooms = response;
          this.loading = false;
          console.log('Available rooms response:', response);
        },
        error: (err) => {
          this.loading = false;
          const message =err.error?.message ||err.error?.error || 'Something went wrong. Please try again.';
          this.error = message;
        }
      });
  }

  bookRoom(category: AvailableRoomsByCategory): void {
  if (!category.availableRooms || category.availableRooms.length === 0) {
    this.error = 'No rooms available in this category';
    return;
  }
  const selectedRoomId = category.availableRooms[0].roomId;
  console.log('Selected roomId:', selectedRoomId);

  this.createBooking(selectedRoomId);
}

createBooking(roomId: number): void {
  this.bookingInProgress = true;
  this.error = null;
  this.bookingService.createBooking(  this.hotelId,roomId,this.checkIn,this.checkOut ) .subscribe({
      next: (booking) => {
        this.bookingInProgress = false;
        this.router.navigate(['/bookings', booking.id]);
        console.log('Booking successful:', booking);
      },
      error: (err) => {
        this.bookingInProgress = false;
        const message =
          err.error?.message ||
          err.error?.error ||
          'Booking failed. Please try again.';
        this.error = message;
        console.error('Booking failed:', err);
      }
    });
}

}
