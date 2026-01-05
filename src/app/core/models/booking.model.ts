export interface Booking {
  id: number;
  userId: number;
  hotelId: number;
  roomId: number;

  checkInDate: string;
  checkOutDate: string;

  totalAmount: number;
  bookingStatus: string;

  createdAt: string;
  updatedAt: string;
}
