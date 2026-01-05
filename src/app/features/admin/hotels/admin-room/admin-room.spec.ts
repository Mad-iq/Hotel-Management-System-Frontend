import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoom } from './admin-room';

describe('AdminRoom', () => {
  let component: AdminRoom;
  let fixture: ComponentFixture<AdminRoom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
