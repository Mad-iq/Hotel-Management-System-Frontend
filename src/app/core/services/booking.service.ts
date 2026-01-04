import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AvailableHotel } from '../models/available-hotel.model';
import { SearchHotelsRequest } from '../models/search-hotels-request.model';
import { AvailableRoomsByCategory } from '../models/available-rooms-by-category.model';

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

  getAvailableRooms(hotelId: number,checkIn: string,checkOut: string,guests?: number): Observable<AvailableRoomsByCategory[]> {
  const params: any = {hotelId,checkIn,checkOut,};
  if (guests !== undefined){
    params.guests = guests;
  }
  return this.http.get<any[]>(
    `${this.BASE_URL}/available-rooms`,
    { params }
  );
}

}
