import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import { AuthenticationRequest } from 'src/app/services/models';
import { AuthenticationControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public fb: FormBuilder, public router:Router, public authService:AuthenticationControllerService) { }
  validateForm: FormGroup= this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });
  ngOnInit(): void {
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      let authReq: AuthenticationRequest = {
        email: this.validateForm.value.userName,
        password: this.validateForm.value.password
      }
      this.authService.authenticate({
        body: authReq
      }).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token as string);
          localStorage.setItem('id', res.id as unknown as string);
          localStorage.setItem('authority', res.authority as string);
          this.router.navigate(['/dashboard/home'])
        },
        error: () => {
          alert('Invalid email or password');
        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
