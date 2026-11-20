import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { Job } from 'src/app/services/models';
import { JobControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  myForm = this.fb.group({
    name: ['', Validators.required],
    title: ['', Validators.required],
    type: ['', Validators.required],
    salary: ['', [Validators.required, Validators.min(0)]],
    unit: ['', Validators.required],
    timeType: ['', Validators.required],
    description: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private jobService: JobControllerService, private route: Router) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.myForm.valid) {
      let job: Job = {
        company: this.myForm.value.name,
        title: this.myForm.value.title,
        type: this.myForm.value.type,
        salary: this.myForm.value.salary,
        unit: this.myForm.value.unit,
        timeType: this.myForm.value.timeType,
        description: this.myForm.value.description
      };
      this.jobService.addJob({
        'idrecruiter': localStorage.getItem('id') as unknown as number,
        body: job
      }).subscribe({
        next: () => {
          this.route.navigate(['/dashboard/my-offer']);
        }
      })
    }
  }
  getValidationStatus(controlName: string): string {
    const control = this.myForm.get(controlName);
    if (control?.touched && control.invalid) {
      return 'error';
    } else if (control?.touched && control.valid) {
      return 'success';
    } else {
      return '';
    }
  }

}
