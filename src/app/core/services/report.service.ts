import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  RevenueReport,
  BookingSummaryReport,
} from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly API_BASE = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getRevenueReport(): Observable<RevenueReport> {
    return this.http.get<RevenueReport>(
      `${this.API_BASE}/revenue`
    );
  }

  getBookingSummaryReport(): Observable<BookingSummaryReport> {
    return this.http.get<BookingSummaryReport>(
      `${this.API_BASE}/bookings/summary`
    );
  }
}
