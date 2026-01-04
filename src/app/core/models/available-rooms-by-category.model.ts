import { AvailableRoomSummary } from "./available-room-summary.model";

export interface AvailableRoomsByCategory {
  categoryId: number;
  categoryName: string;
  description: string;
  capacity: number;
  pricePerNight: number;
  currency: string;
  availableRooms: AvailableRoomSummary[];
}