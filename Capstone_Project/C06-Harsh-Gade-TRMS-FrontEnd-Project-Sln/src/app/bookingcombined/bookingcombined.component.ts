import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { BookingCombinedService } from '../shared/bookingcombined.service';
import { BookingCombinedData } from '../model/bookingcombined.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-bookingcombined',
  templateUrl: './bookingcombined.component.html',
  styleUrls: ['./bookingcombined.component.css']
})
export class BookingCombinedComponent implements OnInit {
  formValue!: UntypedFormGroup;
  bookingModelObj: BookingCombinedData = new BookingCombinedData();
  allBookingData: any;
  filteredBookingData: any;
  availableTrips: any[] = [];
  availableCabs: any[] = [];
  showAdd!: boolean;
  showBtn!: boolean;
  searchTerm: string = '';

  @ViewChild('closeButton') closeButton!: ElementRef;

  constructor(
    private formBuilder: UntypedFormBuilder, 
    private api: BookingCombinedService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      customerName: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$')]],
      tripName: ['none', Validators.required],
      cabModel: ['none', Validators.required],
      bookingDate: ['', Validators.required],
      totalPrice: [{ value: '', disabled: true }]
    });

    this.getAllData();
    this.getAvailableTrips();
    this.getAvailableCabs();
  }

  clickAddBooking() {
    this.formValue.reset({
      tripName: 'none',
      cabModel: 'none',
      totalPrice: ''
    });
    this.showAdd = true;
    this.showBtn = false;
  }

  addBooking() {
    if (this.formValue.invalid) {
      alert("Please fill all the required fields correctly!");
      return;
    }

    this.bookingModelObj = { ...this.formValue.value };
    this.calculateTotalPrice();

    this.api.postBooking(this.bookingModelObj).subscribe(
      res => {
        alert("Booking Added Successfully");
        this.formValue.reset();
        this.closeButton.nativeElement.click();
        this.getAllData();
      },
      err => {
        alert("Failed to add booking!");
      }
    );
  }

  calculateTotalPrice() {
    const selectedTrip = this.availableTrips.find(trip => trip.name === this.bookingModelObj.tripName);
    const selectedCab = this.availableCabs.find(cab => cab.model === this.bookingModelObj.cabModel);

    let totalPrice = 0;

    if (this.bookingModelObj.tripName !== 'none' && selectedTrip) {
      totalPrice += selectedTrip.price;
    }
    if (this.bookingModelObj.cabModel !== 'none' && selectedCab) {
      totalPrice += selectedCab.pricePerDay;
    }

    this.formValue.controls['totalPrice'].setValue(totalPrice);
    this.bookingModelObj.totalPrice = totalPrice;
  }

  getAllData() {
    this.api.getBooking().subscribe(res => {
      this.allBookingData = res;
      this.filteredBookingData = res;
    });
  }

  deleteBooking(id: any) {
    this.api.deleteBooking(id).subscribe(res => {
      this.getAllData();
    });
  }

  onEditBooking(data: any) {
    this.showAdd = false;
    this.showBtn = true;
    this.bookingModelObj.id = data.id;
    this.formValue.patchValue(data);
  }

  updateBooking() {
    if (this.formValue.invalid) {
      alert("Please fill all the required fields correctly!");
      return;
    }

    this.bookingModelObj = { ...this.bookingModelObj, ...this.formValue.value };
    this.calculateTotalPrice();

    this.api.updateBooking(this.bookingModelObj.id, this.bookingModelObj).subscribe(
      res => {
        alert("Booking Updated Successfully");
        this.formValue.reset();
        this.closeButton.nativeElement.click();
        this.getAllData();
      },
      err => {
        alert("Failed to update booking!");
      }
    );
  }

  filterData() {
    this.filteredBookingData = this.allBookingData.filter((booking: any) =>
      booking.customerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getAvailableTrips() {
    this.api.getAvailableTrips().subscribe(res => {
      this.availableTrips = res;
    });
  }

  getAvailableCabs() {
    this.api.getAvailableCabs().subscribe(res => {
      this.availableCabs = res;
    });
  }

  // Form control getters for validation
  get customerName() {
    return this.formValue.get('customerName');
  }

  get tripName() {
    return this.formValue.get('tripName');
  }

  get cabModel() {
    return this.formValue.get('cabModel');
  }

  get bookingDate() {
    return this.formValue.get('bookingDate');
  }

  get totalPrice() {
    return this.formValue.get('totalPrice');
  }

  LogOut(){
    sessionStorage.removeItem('loggedin');
    this.router.navigate(['/login']);
  }
}
