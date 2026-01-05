import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PaymentService, Payment } from '../../../core/services/payment.service';

@Component({
  selector: 'app-booking-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-payment.html',
  styleUrl: './booking-payment.css',
})
export class BookingPaymentComponent implements OnInit {

  bookingId!: number;

  payment: Payment | null = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    this.loadPayment();
  }

  loadPayment(): void {
    this.loading = true;
    this.error = null;

    this.paymentService.getOrCreatePayment(this.bookingId).subscribe({
      next: (payment) => {
        this.payment = payment;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err.error?.message ||
          err.error?.error ||
          'Failed to load payment details';
      }
    });
  }

  payNow(): void {
    if (!this.payment) return;

    this.loading = true;
    this.error = null;

    this.paymentService.pay(this.payment.id).subscribe({
      next: (updatedPayment) => {
        this.payment = updatedPayment;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.error =
          err.error?.message ||
          err.error?.error ||
          'Payment failed';
      }
    });
  }

  get showPayNow(): boolean {
    return this.payment?.status === 'PENDING';
  }
}
