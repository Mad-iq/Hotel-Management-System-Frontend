import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { BookingService } from '../../../core/services/booking.service';

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

  availableRooms: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService
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
}
