import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelRequest, HotelResponse } from '../../../../core/models/hotel.model';
import { HotelService } from '../../../../core/services/hotel.service';

@Component({
  selector: 'app-admin-hotels',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-hotels.html',
  styleUrl: './admin-hotels.css',
})
export class AdminHotelsComponent implements OnInit {

  hotels: HotelResponse[] = [];
  loading = true;
  error: string | null = null;

  hotelForm!: FormGroup;
  submitting = false;

  constructor(
    private hotelService: HotelService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHotels();
  }

  private initForm(): void {
    this.hotelForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      starRating: [
        null,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
    });
  }

  private loadHotels(): void {
    this.loading = true;
    this.hotelService.getHotels().subscribe({
      next: (data: HotelResponse[]) => {
        this.hotels = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load hotels';
        this.loading = false;
      },
    });
  }

  submitHotel(): void {
    if (this.hotelForm.invalid) {
      this.hotelForm.markAllAsTouched();
      return;
    }

    const payload: HotelRequest = this.hotelForm.value;
    this.submitting = true;

    this.hotelService.createHotel(payload).subscribe({
      next: () => {
        this.hotelForm.reset();
        this.submitting = false;
        this.loadHotels();
      },
      error: () => {
        this.error = 'Failed to create hotel';
        this.submitting = false;
      },
    });
  }
}
