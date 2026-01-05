export interface HotelRequest {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  starRating: number;
}

export interface HotelResponse {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  starRating: number;
}

export interface RoomCategoryRequest {
  name: string;
  capacity: number;
  description: string;
}

export interface RoomCategoryResponse {
  id: number;
  name: string;
  capacity: number;
  description: string;
}