import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingSummaryReport, RevenueReport } from '../../../../core/models/report.model';
import { ReportService } from '../../../../core/services/report.service';


@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.html',
  styleUrl: './admin-reports.css',
})
export class AdminReportsComponent implements OnInit {

  revenueReport: RevenueReport | null = null;
  bookingSummary: BookingSummaryReport | null = null;

  loading = false;
  error: string | null = null;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReports();
  }

   loadReports(): void {
    this.loading = true;
    this.error = null;

    this.reportService.getRevenueReport().subscribe({
      next: (res) => {
        this.revenueReport = res;
      },
      error: () => {
        this.error = 'Failed to load revenue report';
        this.loading = false;
      },
    });

    this.reportService.getBookingSummaryReport().subscribe({
      next: (res) => {
        this.bookingSummary = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load booking summary';
        this.loading = false;
      },
    });
  }

  getCurrentTime(): string {
  return new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
}

getPercentage(value: number, total: number): string {
  if (total === 0) return '0';
  return ((value / total) * 100).toFixed(1);
}
}
