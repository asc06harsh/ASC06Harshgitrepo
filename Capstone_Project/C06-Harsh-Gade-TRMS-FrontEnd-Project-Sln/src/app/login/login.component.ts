import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  attemptCount: number = 0;
  isDisabled: boolean = false;
  lockEndTime!: Date;

  constructor(
    private formbuilder: UntypedFormBuilder,
    private _http: HttpClient,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.checkAccountLock();
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
        ]
      ]
    });
  }

  logIn() {
    if (this.isDisabled) {
      alert("Account is temporarily disabled. Try again later.");
      return;
    }

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this._http.get<any>('http://localhost:3000/signup').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.email === this.loginForm.value.email &&
            a.password === this.loginForm.value.password
          );
        });

        if (user) {
          
          this._router.navigate(['/booking']);
          this.loginForm.reset();
          this.attemptCount = 0;
          sessionStorage.setItem('loggedin','yes');
        } else {
          this.handleFailedLogin();
        }
      },
      (err) => {
        console.error("Error during login", err);
      }
    );
  }

  handleFailedLogin() {
    this.attemptCount++;
    if (this.attemptCount >= 3) {
      this.isDisabled = true;
      this.lockEndTime = new Date(Date.now() + 1 * 60 * 1000); // 30 minutes
      localStorage.setItem('lockEndTime', this.lockEndTime.toISOString());

      setTimeout(() => {
        this.resetLock();
      }, 30 * 60 * 1000);
    }
    alert("Invalid credentials");
  }

  checkAccountLock() {
    const lockTime = localStorage.getItem('lockEndTime');
    if (lockTime) {
      const lockDate = new Date(lockTime);
      if (lockDate > new Date()) {
        this.isDisabled = true;
        this.lockEndTime = lockDate;
        setTimeout(() => {
          this.resetLock();
        }, lockDate.getTime() - Date.now());
      } else {
        localStorage.removeItem('lockEndTime');
      }
    }
  }

  resetLock() {
    this.isDisabled = false;
    this.attemptCount = 0;
    localStorage.removeItem('lockEndTime');
  }
}
