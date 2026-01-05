export interface RevenueReport {
  totalRevenue: number;
  currency: string;
}

export interface BookingSummaryReport {
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
}
