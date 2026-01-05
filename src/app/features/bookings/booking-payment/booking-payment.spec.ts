import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPayment } from './booking-payment';

describe('BookingPayment', () => {
  let component: BookingPayment;
  let fixture: ComponentFixture<BookingPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingPayment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
