import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  RoomCategoryRequest,
  RoomCategoryResponse,
} from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class RoomCategoryService {
  private readonly API_BASE = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getCategoriesByHotel(
    hotelId: number
  ): Observable<RoomCategoryResponse[]> {
    return this.http.get<RoomCategoryResponse[]>(
      `${this.API_BASE}/api/hotels/${hotelId}/categories`
    );
  }

  createCategory(
    hotelId: number,
    payload: RoomCategoryRequest
  ): Observable<RoomCategoryResponse> {
    return this.http.post<RoomCategoryResponse>(
      `${this.API_BASE}/api/hotels/${hotelId}/categories`,
      payload
    );
  }
}
