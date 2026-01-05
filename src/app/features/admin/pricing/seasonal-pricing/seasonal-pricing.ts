import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
} from '@angular/forms';

import { HotelResponse, RoomCategoryResponse } from '../../../../core/models/hotel.model';
import {
  SeasonalPricingRequest,
  SeasonalPricingResponse,
} from '../../../../core/models/pricing.model';

import { HotelService } from '../../../../core/services/hotel.service';
import { RoomCategoryService } from '../../../../core/services/room-category.service';
import { PricingService } from '../../../../core/services/pricing.service';

export function dateRangeValidator(
  control: AbstractControl
): ValidationErrors | null{
  const start = control.get('startDate')?.value;
  const end = control.get('endDate')?.value;
  if (!start || !end){
    return null;
  }
  return start <= end ? null : { invalidDateRange: true };
}

@Component({
  selector: 'app-seasonal-pricing',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seasonal-pricing.html',
  styleUrl: './seasonal-pricing.css',
})
export class SeasonalPricingComponent implements OnInit {

  hotels: HotelResponse[] = [];
  categories: RoomCategoryResponse[] = [];

  selectedHotelId: number | null = null;
  selectedCategoryId: number | null = null;

  pricingForm!: FormGroup;
  seasonalPricingList: SeasonalPricingResponse[] = [];

  loadingHotels = false;
  loadingCategories = false;
  loadingPricing = false;
  submitting = false;

  error: string | null = null;
  success: string | null = null;
  today = new Date().toISOString().split('T')[0];

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
    this.pricingForm = this.fb.group(
      {
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        price: [null, [Validators.required, Validators.min(0)]],
        queryDate: [''],
      },
      { validators: dateRangeValidator }
    );
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

    this.selectedHotelId = hotelId || null;
    this.selectedCategoryId = null;
    this.categories = [];
    this.seasonalPricingList = [];
    this.pricingForm.reset();

    if (this.selectedHotelId) {
      this.loadCategories(this.selectedHotelId);
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

    this.selectedCategoryId = categoryId || null;
    this.seasonalPricingList = [];
    this.pricingForm.reset();
  }

  addSeasonalPricing(): void {
    if (!this.selectedCategoryId || this.pricingForm.invalid) {
      this.pricingForm.markAllAsTouched();
      return;
    }

    const payload: SeasonalPricingRequest = {
      startDate: this.pricingForm.value.startDate,
      endDate: this.pricingForm.value.endDate,
      price: this.pricingForm.value.price,
    };

    this.submitting = true;
    this.error = null;
    this.success = null;

    this.pricingService
      .addSeasonalPricing(this.selectedCategoryId, payload)
      .subscribe({
        next: (data) => {
          this.seasonalPricingList = data;
          this.success = 'Seasonal pricing added successfully';
          this.submitting = false;
          this.pricingForm.reset();
        },
        error: () => {
          this.error = 'Failed to add seasonal pricing';
          this.submitting = false;
        },
      });
  }

  fetchSeasonalPricing(): void {
    const queryDate = this.pricingForm.value.queryDate;

    if (!this.selectedCategoryId || !queryDate) {
      return;
    }

    this.loadingPricing = true;

    this.pricingService
      .getSeasonalPricing(this.selectedCategoryId, queryDate)
      .subscribe({
        next: (data) => {
          this.seasonalPricingList = data;
          this.loadingPricing = false;
        },
        error: () => {
          this.error = 'Failed to fetch seasonal pricing';
          this.loadingPricing = false;
        },
      });
  }
}
