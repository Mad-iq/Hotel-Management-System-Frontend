import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { HotelResponse, RoomCategoryResponse } from '../../../../core/models/hotel.model';
import {
  CategoryPricingRequest,
  CategoryPricingResponse,
} from '../../../../core/models/pricing.model';

import { HotelService } from '../../../../core/services/hotel.service';
import { RoomCategoryService } from '../../../../core/services/room-category.service';
import { PricingService } from '../../../../core/services/pricing.service';

@Component({
  selector: 'app-base-pricing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './base-pricing.html',
  styleUrl: './base-pricing.css',
})
export class BasePricingComponent implements OnInit {

  hotels: HotelResponse[] = [];
  categories: RoomCategoryResponse[] = [];

  selectedHotelId: number | null = null;
  selectedCategoryId: number | null = null;

  pricingForm!: FormGroup;
  existingPricing: CategoryPricingResponse | null = null;

  loadingHotels = false;
  loadingCategories = false;
  loadingPricing = false;
  submitting = false;

  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private categoryService: RoomCategoryService,
    private pricingService: PricingService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHotels();
  }

  private initForm(): void {
    this.pricingForm = this.fb.group({
      basePrice: [null, [Validators.required, Validators.min(0)]],
      currency: ['INR', Validators.required],
    });
  }

  private loadHotels(): void {
    this.loadingHotels = true;

    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.loadingHotels = false;
      },
      error: () => {
        this.error = 'Failed to load hotels';
        this.loadingHotels = false;
      },
    });
  }

  onHotelChange(event: Event): void {
    const hotelId = Number((event.target as HTMLSelectElement).value);

    this.selectedHotelId = hotelId;
    this.selectedCategoryId = null;
    this.categories = [];
    this.existingPricing = null;
    this.pricingForm.reset({ currency: 'INR' });

    if (hotelId) {
      this.loadCategories(hotelId);
    }
  }

  private loadCategories(hotelId: number): void {
    this.loadingCategories = true;

    this.categoryService.getCategoriesByHotel(hotelId).subscribe({
      next: (data) => {
        this.categories = data;
        this.loadingCategories = false;
      },
      error: () => {
        this.error = 'Failed to load categories';
        this.loadingCategories = false;
      },
    });
  }

  onCategoryChange(event: Event): void {
    const categoryId = Number((event.target as HTMLSelectElement).value);

    this.selectedCategoryId = categoryId;
    this.existingPricing = null;
    this.pricingForm.reset({ currency: 'INR' });

    if (categoryId) {
      this.loadBasePricing(categoryId);
    }
  }

  private loadBasePricing(categoryId: number): void {
    this.loadingPricing = true;

    this.pricingService.getBasePricing(categoryId).subscribe({
      next: (data) => {
        this.existingPricing = data;
        this.pricingForm.patchValue({
          basePrice: data.basePrice,
          currency: data.currency,
        });
        this.loadingPricing = false;
      },
      error: () => {
        // No pricing yet is a valid case
        this.loadingPricing = false;
      },
    });
  }

  submit(): void {
    if (!this.selectedCategoryId || this.pricingForm.invalid) {
      this.pricingForm.markAllAsTouched();
      return;
    }

    const payload: CategoryPricingRequest = this.pricingForm.value;
    this.submitting = true;
    this.error = null;
    this.success = null;

    this.pricingService
      .setBasePricing(this.selectedCategoryId, payload)
      .subscribe({
        next: (data) => {
          this.existingPricing = data;
          this.success = 'Base pricing saved successfully';
          this.submitting = false;
        },
        error: () => {
          this.error = 'Failed to save base pricing';
          this.submitting = false;
        },
      });
  }
}
