import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ChangePassword } from 'src/app/services/models';
import { ForgotPasswordControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(private fb:FormBuilder, private router:Router, private activatedRoute:ActivatedRoute, private forgotPassServ:ForgotPasswordControllerService) { }
  validateForm: FormGroup= this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });
  ngOnInit(): void {
  }

  checkPasswords(): void {
    const password = this.validateForm.value.password;
  const confirmPassword = this.validateForm.value.confirmPassword;

  if (password !== confirmPassword) {
    // Set a custom validation error for confirm password
    this.validateForm.get('confirmPassword')!.setErrors({ mustMatch: true });
  } else {
    // Clear the validation error if passwords match
    this.validateForm.get('confirmPassword')!.setErrors(null);
  }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const encodedEmail = this.activatedRoute.snapshot.params['email'];
      const decodedEmail = decodeURIComponent(encodedEmail);
      let ChangePassword: ChangePassword = {
        password: this.validateForm.value.password,
        confirmPassword: this.validateForm.value.confirmPassword
      }
      this.forgotPassServ.changePassword({
        email: decodedEmail,
        body: ChangePassword
      }).subscribe({
        next: () => {
          this.router.navigate(['/login'])
        },
        error: () => {
          
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
