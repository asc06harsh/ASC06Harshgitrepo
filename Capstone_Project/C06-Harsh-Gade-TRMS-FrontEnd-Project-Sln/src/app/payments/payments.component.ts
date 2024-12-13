import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { ApiService } from '../shared/payment.service';
import { PaymentData } from '../model/payment.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  formValue!: UntypedFormGroup;
  paymentModelObj: PaymentData = new PaymentData();
  allPaymentData: any;
  filteredPaymentData: any;
  showAdd!: boolean;
  showBtn!: boolean;
  searchTerm: string = '';

  @ViewChild('closeButton') closeButton!: ElementRef;

  constructor(private formbuilder: UntypedFormBuilder, private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      description: [''],
      amount: [''],
      date: [''],
    });
    this.getAllData();
  }

  clickAddPayment() {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }

  addPayment() {
    this.paymentModelObj = { ...this.formValue.value };

    this.api.postPayment(this.paymentModelObj).subscribe(res => {
      alert("Payment Added Successfully");
      this.formValue.reset();
      this.closeButton.nativeElement.click(); // Close modal
      this.getAllData();
    }, err => {
      console.log(err);
      alert("Failed to add payment!");
    });
  }

  getAllData() {
    this.api.getPayment().subscribe(res => {
      this.allPaymentData = res;
      this.filteredPaymentData = res;
    }, err => {
      console.log(err);
    });
  }

  deletePayment(id: any) {
    this.api.deletePayment(id).subscribe(res => {
      
      this.getAllData();
    }, err => {
      console.log(err);
    });
  }

  onEditPayment(data: any) {
    this.showAdd = false;
    this.showBtn = true;
    
    this.paymentModelObj.id = data.id;
    this.formValue.patchValue(data);
  }

  updatePayment() {
    this.paymentModelObj = { ...this.paymentModelObj, ...this.formValue.value };

    this.api.updatePayment(this.paymentModelObj.id, this.paymentModelObj).subscribe(res => {
      alert("Payment Updated Successfully");
      this.formValue.reset();
      this.closeButton.nativeElement.click(); // Close modal
      this.getAllData();
    }, err => {
      console.log(err);
    });
  }

  filterData() {
    this.filteredPaymentData = this.allPaymentData.filter((payment: any) =>
      payment.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  LogOut(){
    sessionStorage.removeItem('loggedin');
    this.router.navigate(['/login']);
  }
}
