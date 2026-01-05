export interface CategoryPricingRequest {
  basePrice: number;
  currency: string;
}

export interface CategoryPricingResponse {
  id: number;
  basePrice: number;
  currency: string;
  createdAt: string; 
}

export interface SeasonalPricingRequest {
  startDate: string; 
  endDate: string;   
  price: number;
}

export interface SeasonalPricingResponse {
  id: number;
  startDate: string;
  endDate: string;
  price: number;
  createdAt: string;
}
