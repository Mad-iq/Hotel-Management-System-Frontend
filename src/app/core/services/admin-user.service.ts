import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CreateStaffUserRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {

  private readonly BASE_URL = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  createStaffUser(
    request: CreateStaffUserRequest
  ): Observable<void> {
    return this.http.post<void>(this.BASE_URL, request);
  }
}
