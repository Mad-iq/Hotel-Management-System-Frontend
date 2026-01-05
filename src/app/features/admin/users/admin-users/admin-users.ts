import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotelResponse } from '../../../../core/models/hotel.model';
import { HotelService } from '../../../../core/services/hotel.service';
import { AdminUserService } from '../../../../core/services/admin-user.service';
import { CreateStaffUserRequest } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsersComponent implements OnInit {

  hotels: HotelResponse[] = [];

  roles = [
    { label: 'Manager', value: 'ROLE_MANAGER' },
    { label: 'Receptionist', value: 'ROLE_RECEPTIONIST' },
  ];

  userForm!: FormGroup;

  loading = false;
  submitting = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private adminUserService: AdminUserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadHotels();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      firstName: [''],
      lastName: [''],
      phone: [''],

      role: ['', Validators.required],
      hotelIds: [[], Validators.required],
    });
  }

  private loadHotels(): void {
    this.loading = true;

    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load hotels';
        this.loading = false;
      },
    });
  }

  onHotelToggle(hotelId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    const selected = this.userForm.value.hotelIds as number[];

    if (checked) {
      this.userForm.patchValue({
        hotelIds: [...selected, hotelId],
      });
    } else {
      this.userForm.patchValue({
        hotelIds: selected.filter(id => id !== hotelId),
      });
    }
  }

  submit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const payload: CreateStaffUserRequest = this.userForm.value;

    this.submitting = true;
    this.error = null;
    this.success = null;

    this.adminUserService.createStaffUser(payload).subscribe({
      next: () => {
        this.success = 'Staff user created successfully';
        this.userForm.reset();
        this.submitting = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to create staff user';
        this.submitting = false;
      },
    });
  }
}
