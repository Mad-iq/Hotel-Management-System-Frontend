import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomService {

  private readonly API_BASE = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}
  addRoom(
    hotelId: number,
    categoryId: number,
    payload: { roomNumber: string }
  ): Observable<any> {
    return this.http.post(
      `${this.API_BASE}/hotels/${hotelId}/rooms`,
      payload,
      { params: { categoryId } }
    );
  }
}
