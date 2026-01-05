import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePricing } from './base-pricing';

describe('BasePricing', () => {
  let component: BasePricing;
  let fixture: ComponentFixture<BasePricing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasePricing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasePricing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
