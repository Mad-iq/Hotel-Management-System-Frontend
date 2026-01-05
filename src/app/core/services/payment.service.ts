import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

export interface Payment {
  id: number;
  bookingId: number;
  userId: number;
  amount: number;
  status: 'PENDING' | 'PAID';
  createdAt: string;
  paidAt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private readonly BASE_URL = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  getOrCreatePayment(bookingId: number): Observable<Payment> {
    return this.getPaymentByBookingId(bookingId).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 || error.status === 400) {
          return this.createPayment(bookingId);
        }
        return throwError(() => error);
      })
    );
  }

  getPaymentByBookingId(bookingId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.BASE_URL}/booking/${bookingId}`);
  }

  createPayment(bookingId: number): Observable<Payment> {
    const params = new HttpParams().set('bookingId', bookingId.toString());
    return this.http.post<Payment>(this.BASE_URL, null, { params });
  }

  pay(paymentId: number): Observable<Payment> {
    return this.http.put<Payment>(`${this.BASE_URL}/${paymentId}/pay`, null);
  }
}
