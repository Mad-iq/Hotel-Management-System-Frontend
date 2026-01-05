import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CategoryPricingRequest,
  CategoryPricingResponse,
  SeasonalPricingRequest,
  SeasonalPricingResponse,
} from '../models/pricing.model';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  private readonly BASE_URL = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  getBasePricing(
    categoryId: number
  ): Observable<CategoryPricingResponse> {
    return this.http.get<CategoryPricingResponse>(
      `${this.BASE_URL}/${categoryId}/pricing`
    );
  }

  setBasePricing(
    categoryId: number,
    payload: CategoryPricingRequest
  ): Observable<CategoryPricingResponse> {
    return this.http.post<CategoryPricingResponse>(
      `${this.BASE_URL}/${categoryId}/pricing`,
      payload
    );
  }

  addSeasonalPricing(
    categoryId: number,
    payload: SeasonalPricingRequest
  ): Observable<SeasonalPricingResponse[]> {
    return this.http.post<SeasonalPricingResponse[]>(
      `${this.BASE_URL}/${categoryId}/seasonal-pricing`,
      payload
    );
  }

  getSeasonalPricing(
    categoryId: number,
    date: string
  ): Observable<SeasonalPricingResponse[]> {
    const params = new HttpParams().set('date', date);

    return this.http.get<SeasonalPricingResponse[]>(
      `${this.BASE_URL}/${categoryId}/seasonal-pricing`,
      { params }
    );
  }
}
