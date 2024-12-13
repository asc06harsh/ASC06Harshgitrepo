import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/cab.service';
import { CabData } from '../model/cab.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cab',
  templateUrl: './cab.component.html',
  styleUrls: ['./cab.component.css']
})
export class CabComponent implements OnInit {
  formValue!: UntypedFormGroup;
  cabData: CabData[] = [];
  filteredCabData: CabData[] = [];
  searchTerm: string = '';
  showAdd: boolean = true;
  showBtn: boolean = false;
  currentCabId: number = 0;

  @ViewChild('closeButton') closeButton!: ElementRef; 

  constructor(private formBuilder: UntypedFormBuilder, private apiService: ApiService,private router:Router) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      model: ['', [Validators.required, Validators.minLength(3)]],
      licensePlate: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$')]],
      capacity: ['', [Validators.required, Validators.min(1), Validators.max(20)]],
      pricePerDay: ['', [Validators.required, Validators.min(1)]]
    });

    this.getAllCabs();
  }

  filterData() {
    this.filteredCabData = this.cabData.filter(cab =>
      cab.model.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getAllCabs() {
    this.apiService.getCabData().subscribe(response => {
      this.cabData = response;
      this.filteredCabData = response;
    }, err => {
      console.error(err);
    });
  }

  clickAddCab() {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }

  addCab() {
    if (this.formValue.valid) {
      this.apiService.postCabData(this.formValue.value).subscribe(() => {
        alert("Cab Added Successfully");
        this.formValue.reset();
        this.closeButton.nativeElement.click(); 
        this.getAllCabs();
      }, err => {
        console.error(err);
        alert("Failed to add cab!");
      });
    }
  }

  deleteCab(id: number) {
    this.apiService.deleteCabData(id).subscribe(() => {
      alert("Cab Deleted Successfully");
      this.getAllCabs();
    }, err => {
      console.error(err);
      alert("Failed to delete cab!");
    });
  }

  onEditCab(cab: CabData) {
    this.showAdd = false;
    this.showBtn = true;
    this.formValue.setValue({
      model: cab.model,
      licensePlate: cab.licensePlate,
      capacity: cab.capacity,
      pricePerDay: cab.pricePerDay
    });
    this.currentCabId = cab.id;
  }

  updateCab() {
    if (this.formValue.valid) {
      this.apiService.updateCabData(this.currentCabId, this.formValue.value).subscribe(() => {
        alert("Cab Updated Successfully");
        this.formValue.reset();
        this.closeButton.nativeElement.click(); 
        this.getAllCabs();
      }, err => {
        console.error(err);
        alert("Failed to update cab!");
      });
    }
  }
  LogOut(){
    sessionStorage.removeItem('loggedin');
    this.router.navigate(['/login']);
  }
 
}
