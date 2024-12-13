import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/trip.service';
import { TripData } from '../model/trip.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  formValue!: UntypedFormGroup;
  tripModelObj: TripData = new TripData();
  allTripData: any = [];
  filteredTripData: any = [];
  selectedFile!: File;
  showAdd!: boolean;
  showBtn!: boolean;
  searchTerm: string = '';
  lastGeneratedId: number = 1000;

  @ViewChild('closeButton') closeButton!: ElementRef;

  constructor(private formbuilder: UntypedFormBuilder, private api: ApiService,private router:Router) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      image: [null, Validators.required]
    });
    this.getAllData();
  }

  // Generate Trip ID in "TNNNN" format
  generateTripId(): string {
    this.lastGeneratedId++;
    return `T${this.lastGeneratedId.toString().padStart(4, '0')}`;
  }

  clickAddTrip() {
    this.formValue.reset();
    this.formValue.patchValue({ id: this.generateTripId() });
    this.showAdd = true;
    this.showBtn = false;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.formValue.patchValue({ image: this.selectedFile });
  }

  addTrip() {
    if (this.formValue.invalid || !this.selectedFile) {
      alert("Please fill all required fields and upload an image.");
      return;
    }

    const formData = new FormData();
    const formDataValues = this.formValue.getRawValue();

    formData.append('id', formDataValues.id);
    formData.append('image', this.selectedFile);
    formData.append('name', formDataValues.name);
    formData.append('startDate', formDataValues.startDate);
    formData.append('endDate', formDataValues.endDate);
    formData.append('price', formDataValues.price);

    this.api.postTrip(formData).subscribe(
      () => {
        alert("Trip Added Successfully");
        this.closeButton.nativeElement.click();
        this.getAllData();
      },
      (err) => {
        console.error(err);
        alert("Failed to add trip!");
      }
    );
  }

  getAllData() {
    this.api.getTrip().subscribe(
      (res) => {
        this.allTripData = res;
        this.filteredTripData = res;
        if (this.allTripData.length) {
          this.lastGeneratedId = Math.max(...this.allTripData.map((trip: any) => Number(trip.id.substring(1))));
        }
      },
      (err) => console.error(err)
    );
  }

  deleteTrip(id: string) {
    this.api.deleteTrip(id).subscribe(
      () => this.getAllData(),
      (err) => console.error(err)
    );
  }

  onEditTrip(data: any) {
    this.showAdd = false;
    this.showBtn = true;
    this.formValue.patchValue(data);
  }

  updateTrip() {
    if (this.formValue.invalid) {
      alert("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    const formDataValues = this.formValue.getRawValue();

    formData.append('id', formDataValues.id);
    formData.append('image', this.selectedFile || '');
    formData.append('name', formDataValues.name);
    formData.append('startDate', formDataValues.startDate);
    formData.append('endDate', formDataValues.endDate);
    formData.append('price', formDataValues.price);

    this.api.updateTrip(formDataValues.id, formData).subscribe(
      () => {
        alert("Trip Updated Successfully");
        this.closeButton.nativeElement.click();
        this.getAllData();
      },
      (err) => {
        console.error(err);
        alert("Failed to update trip!");
      }
    );
  }

  filterData() {
    this.filteredTripData = this.allTripData.filter((trip: any) =>
      trip.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  LogOut(){
    sessionStorage.removeItem('loggedin');
    this.router.navigate(['/login']);
  }
}
