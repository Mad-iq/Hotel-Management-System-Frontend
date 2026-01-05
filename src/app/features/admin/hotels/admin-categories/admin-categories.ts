import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  HotelResponse,
  RoomCategoryRequest,
  RoomCategoryResponse,
} from '../../../../core/models/hotel.model';

import { HotelService } from '../../../../core/services/hotel.service';
import { RoomCategoryService } from '../../../../core/services/room-category.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-categories.html',
  styleUrl: './admin-categories.css',
})
export class AdminCategoriesComponent implements OnInit {

  hotels: HotelResponse[] = [];
  categories: RoomCategoryResponse[] = [];

  selectedHotelId: number | null = null;

  loading = false;
  submitting = false;
  error: string | null = null;

  categoryForm!: FormGroup;

  constructor(
    private hotelService: HotelService,
    private categoryService: RoomCategoryService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHotels();

    this.route.queryParams.subscribe((params) => {
      const hotelId = Number(params['hotelId']);
      if (hotelId) {
        this.selectedHotelId = hotelId;
        this.loadCategories(hotelId);
      }
    });
  }

  /* -------------------- FORM -------------------- */

  private initForm(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
    });
  }

  /* -------------------- HOTELS -------------------- */

  private loadHotels(): void {
    this.hotelService.getHotels().subscribe({
      next: (data: HotelResponse[]) => {
        this.hotels = data;
      },
      error: () => {
        this.error = 'Failed to load hotels';
      },
    });
  }

  onHotelChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;
  const hotelId = selectElement.value;

  this.selectedHotelId = Number(hotelId);
  this.categories = [];

  if (this.selectedHotelId) {
    this.loadCategories(this.selectedHotelId);
  }
}

  /* -------------------- CATEGORIES -------------------- */

  private loadCategories(hotelId: number): void {
    this.loading = true;

    this.categoryService.getCategoriesByHotel(hotelId).subscribe({
      next: (data: RoomCategoryResponse[]) => {
        this.categories = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load categories';
        this.loading = false;
      },
    });
  }

  submitCategory(): void {
    if (!this.selectedHotelId || this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    const payload: RoomCategoryRequest = this.categoryForm.value;
    this.submitting = true;

    this.categoryService
      .createCategory(this.selectedHotelId, payload)
      .subscribe({
        next: () => {
          this.categoryForm.reset();
          this.submitting = false;
          this.loadCategories(this.selectedHotelId!);
        },
        error: () => {
          this.error = 'Failed to create category';
          this.submitting = false;
        },
      });
  }
}
