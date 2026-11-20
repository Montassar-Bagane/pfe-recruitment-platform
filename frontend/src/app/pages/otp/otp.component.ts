import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { decode } from 'querystring';
import { ForgotPasswordControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OTPComponent implements OnInit {

  constructor(private fb: FormBuilder, private router:Router, private activatedRoute: ActivatedRoute, private forgotPassServ:ForgotPasswordControllerService) { }
  
  validateForm: FormGroup= this.fb.group({
    userName: ['', [Validators.required]],
  });

  ngOnInit(): void {
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const encodedEmail = this.activatedRoute.snapshot.params['email'];
      const decodedEmail = decodeURIComponent(encodedEmail);
      this.forgotPassServ.verifyOtp({
        email: decodedEmail,
        otp: this.validateForm.value.userName
      }).subscribe({
        next: () => {
          this.router.navigate(['/new-password', decodedEmail])
        },
        error: () => {
          alert('Invalid OTP');
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
