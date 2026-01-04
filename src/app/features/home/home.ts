import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,
    MatButtonModule,MatIconModule,MatCardModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  searchForm: FormGroup;
  
  cities = signal([
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Kolkata',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Goa'
  ]);

  guestOptions = signal([1, 2, 3, 4, 5, 6, 7, 8]);
  minCheckoutDate = signal<Date | null>(null);
  destinations = signal([
    {
      name: 'Goa',
      properties: '1,234',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80'
    },
    {
      name: 'Mumbai',
      properties: '2,156',
      image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80'
    },
    {
      name: 'Jaipur',
      properties: '876',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80'
    },
    {
      name: 'Kerala',
      properties: '1,543',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80'
    },
  ]);

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      location: ['',Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [2, Validators.required]
    });

    this.searchForm.get('checkIn')?.valueChanges.subscribe(checkInDate => {
      if (checkInDate) {
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        this.minCheckoutDate.set(nextDay);
        
        const currentCheckOut = this.searchForm.get('checkOut')?.value;
        if (currentCheckOut && currentCheckOut <= checkInDate) {
          this.searchForm.get('checkOut')?.setValue(nextDay);
        }
      }
    });
  }

  onSearch() {
    if (this.searchForm.valid) {
      console.log('Search Data:', this.searchForm.value);
      //navig goes here
    }
  }

  get today(): Date {
    return new Date();
  }
}