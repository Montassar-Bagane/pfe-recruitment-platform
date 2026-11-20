import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/services/models/register-request';
import { AuthenticationControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
validateForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  });
  constructor(public fb: FormBuilder, public router: Router, public authService:AuthenticationControllerService) { }

  ngOnInit(): void {
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      let registerRequest: RegisterRequest = {
        firstname: this.validateForm.value.firstName,
        lastname: this.validateForm.value.lastName,
        email: this.validateForm.value.email,
        password: this.validateForm.value.password,
        phone: this.validateForm.value.phoneNumber
      };
      this.authService.registerRecruiter({
        body: registerRequest
      }).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          alert('Email already exists');
        }
      })
      this.validateForm.reset();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

}
