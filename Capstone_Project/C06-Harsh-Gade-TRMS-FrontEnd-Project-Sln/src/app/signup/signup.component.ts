import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: UntypedFormGroup;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  signUp() {
    if (this.signupForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.signupForm.markAllAsTouched();
      return;
    }

    this.http.post<any>('http://localhost:3000/signup', this.signupForm.value).subscribe(
      (res) => {
        console.log(res);
        alert('Signup Successfully');
        this.signupForm.reset();
        this.router.navigate(['/login']);
      },
      (err) => {
        console.log(err);
        alert('Signup Error');
      }
    );
  }

  // Helper getter to access form controls in the template
  get f() {
    return this.signupForm.controls;
  }
}
