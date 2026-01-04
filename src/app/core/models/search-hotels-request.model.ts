export interface SearchHotelsRequest {
  city: string;
  checkIn: string;   
  checkOut: string; 
  guests?: number;
}