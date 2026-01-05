import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { HotelService } from '../../../../core/services/hotel.service';
import { RoomCategoryService } from '../../../../core/services/room-category.service';
import { RoomService } from '../../../../core/services/room.service';

import { HotelResponse, RoomCategoryResponse } from '../../../../core/models/hotel.model';


@Component({
  selector: 'app-admin-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-room.html',
  styleUrl: './admin-room.css',
})
export class AdminRoomComponent implements OnInit {

  /** dropdown data */
  hotels: HotelResponse[] = [];
  categories: RoomCategoryResponse[] = [];

  /** reactive form */
  form!: FormGroup;

  /** ui state */
  loading = false;
  success = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private categoryService: RoomCategoryService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      hotelId: [null, Validators.required],
      categoryId: [null, Validators.required],
      roomNumber: ['', Validators.required],
    });

    this.loadHotels();
  }

  /** load all hotels for admin */
  private loadHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: hotels => {
        this.hotels = hotels;
      },
      error: () => {
        this.error = 'Failed to load hotels';
      },
    });
  }

  /** when hotel changes → reload categories */
  onHotelChange(): void {
    const hotelId = this.form.get('hotelId')?.value;

    this.categories = [];
    this.form.get('categoryId')?.reset();
    this.success = false;
    this.error = null;

    if (!hotelId) return;

    this.categoryService.getCategoriesByHotel(hotelId).subscribe({
      next: categories => {
        this.categories = categories;
      },
      error: () => {
        this.error = 'Failed to load room categories';
      },
    });
  }

  /** submit add-room form */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { hotelId, categoryId, roomNumber } = this.form.value;

    this.loading = true;
    this.error = null;
    this.success = false;

    this.roomService.addRoom(hotelId, categoryId, { roomNumber }).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;

        // reset only room number (keep hotel & category)
        this.form.get('roomNumber')?.reset();
      },
      error: err => {
        this.loading = false;
        this.error = err?.error?.message || 'Failed to add room';
      },
    });
  }
}
