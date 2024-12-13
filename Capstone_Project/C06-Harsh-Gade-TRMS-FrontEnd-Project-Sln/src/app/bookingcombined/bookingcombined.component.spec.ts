import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingcombinedComponent } from './bookingcombined.component';

describe('BookingcombinedComponent', () => {
  let component: BookingcombinedComponent;
  let fixture: ComponentFixture<BookingcombinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingcombinedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingcombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
