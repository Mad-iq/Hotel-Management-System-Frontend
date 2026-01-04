import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchHotelsRequest } from '../../../core/models/search-hotels-request.model';
import { AvailableHotel } from '../../../core/models/available-hotel.model';
import { BookingService } from '../../../core/services/booking.service';

@Component({
  selector: 'app-hotels-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotels-list.html',
  styleUrl: './hotels-list.css',
})
export class HotelsListComponent implements OnInit {
  searchRequest!: SearchHotelsRequest;

  hotels: AvailableHotel[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,private router: Router,private bookingService: BookingService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchRequest = {
        city: params['city'],
        checkIn: params['checkIn'],
        checkOut: params['checkOut'],
        guests: params['guests']
          ? Number(params['guests'])
          : undefined,
      };

      this.fetchHotels();
    });
  }
  private fetchHotels(): void {
    this.loading = true;
    this.error = null;
    this.bookingService.searchAvailableHotels(this.searchRequest).subscribe({
      next: (response) => {
        this.hotels = response;
        this.loading = false;
        console.log('Hotels received:', response);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to load hotels';
        console.error(err);
      },
    });
  }

  goToRooms(hotelId: number): void {this.router.navigate(['/hotels', hotelId, 'rooms'],
    {
      queryParams: {
        checkIn: this.searchRequest.checkIn,
        checkOut: this.searchRequest.checkOut,
        guests: this.searchRequest.guests
      }
    }
  );
}

}
