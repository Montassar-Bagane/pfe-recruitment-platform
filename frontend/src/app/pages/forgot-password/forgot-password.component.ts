import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(public fb: FormBuilder, public router:Router, private forgotPassServ:ForgotPasswordControllerService) { }
  validateForm: FormGroup= this.fb.group({
    userName: ['', [Validators.required, Validators.email]],
  });
  ngOnInit(): void {
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      const encodedEmail = encodeURIComponent(this.validateForm.value.userName);
      this.forgotPassServ.verifyEmail({
        email: this.validateForm.value.userName
      }).subscribe({
        next: () => {
          this.router.navigate(['/otp', encodedEmail])
        },
        error: () => {
          alert('Invalid email');
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
