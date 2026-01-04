import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AvailableHotel } from '../models/available-hotel.model';
import { SearchHotelsRequest } from '../models/search-hotels-request.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly BASE_URL = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) {}

  searchAvailableHotels(
    request: SearchHotelsRequest
  ): Observable<AvailableHotel[]> {
    return this.http.post<AvailableHotel[]>(
      `${this.BASE_URL}/search/hotels`,
      request
    );
  }
}
