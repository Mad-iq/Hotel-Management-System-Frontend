import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HotelRequest, HotelResponse } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private readonly API_BASE = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<HotelResponse[]> {
    return this.http.get<HotelResponse[]>(
      `${this.API_BASE}/api/hotels`
    );
  }

  createHotel(payload: HotelRequest): Observable<HotelResponse> {
    return this.http.post<HotelResponse>(
      `${this.API_BASE}/api/hotels`,
      payload
    );
  }
}
