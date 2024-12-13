import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      loginid: ['harshgade@ascendion.com', Validators.required],
      password: ['123456', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      
      Swal.fire({
        title: 'Error',
        text: 'Please fill in both fields.',
        icon: 'error',
        showConfirmButton: true
      });
      return;
    }

    const loginid: string = this.loginForm.get('loginid')?.value;
    const password: string = this.loginForm.get('password')?.value;

    if (loginid === 'harshgade@ascendion.com' && password === '123456') {
      
      sessionStorage.setItem('loggedIn', 'yes');
      this.router.navigate(['/issue-list']);
      Swal.fire({
        title: 'Login Successful!',
        showConfirmButton: false,
        timer: 2000,
        icon: 'success'
      });
    } else {
      
      Swal.fire({
        title: 'Login Failed',
        text: 'Incorrect username or password.',
        icon: 'error',
        showConfirmButton: true
      });
    }
  }
}

