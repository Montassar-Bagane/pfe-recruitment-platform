import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import { Job, JobDto } from 'src/app/services/models';
import { JobControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-my-offer',
  templateUrl: './my-offer.component.html',
  styleUrls: ['./my-offer.component.css']
})
export class MyOfferComponent implements OnInit {

  jobId!: number;
  jobListings!: JobDto[];
  //editedJob!: Job;
  editModalVisible = false;
  editForm= this.fb.group({
    company: ['', Validators.required],
    title: ['', Validators.required],
    type: ['', Validators.required],
    salary: ['', [Validators.required, Validators.min(0)]],
    unit: ['', Validators.required],
    timeType: ['', Validators.required],
    description: ['', Validators.required],
  });

  editJob(jobId: number) {
    this.jobId = jobId;
    this.jobService.getJobById({
      'id': jobId
    }).subscribe({
      next: (job) => {
        this.editForm.patchValue(job);
      }
    })
    //this.editForm.patchValue(this.editedJob);
    this.editModalVisible = true;
  }
  saveEdit() {
    let updatedJob: Job = {
      company: this.editForm.value.company,
      title: this.editForm.value.title,
      type: this.editForm.value.type,
      salary: this.editForm.value.salary,
      unit: this.editForm.value.unit,
      timeType: this.editForm.value.timeType,
      description: this.editForm.value.description
    }
    this.jobService.updateJob({
      'idrecruiter': localStorage.getItem('id') as unknown as number,
      'idjob': this.jobId,
      body: updatedJob
    }).subscribe({
      next: () => {
        this.jobService.getJobsByRecruiterId({
          'idrecruiter': localStorage.getItem('id') as unknown as number
        }).subscribe({
          next: (jobs) => {
            this.jobListings = jobs;
          }
        })
      }
    })
    this.editModalVisible = false;
  }
  confirmDelete(jobId: number) {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this job?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger:true,
      nzOnOk: () => this.jobService.deleteJob({
        'idjob': jobId
      }).subscribe({
        next: () => {
          this.jobService.getJobsByRecruiterId({
            'idrecruiter': localStorage.getItem('id') as unknown as number
          }).subscribe({
            next: (jobs) => {
              this.jobListings = jobs;
            }
          })
        }
      }),
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }
  
  cancelEdit() {
    this.editModalVisible = false;
  }

  constructor(private fb: FormBuilder,private modalService: NzModalService, private jobService: JobControllerService) { }

  ngOnInit(): void {
    this.jobService.getJobsByRecruiterId({
      'idrecruiter': localStorage.getItem('id') as unknown as number
    }).subscribe({
      next: (jobs) => {
        this.jobListings = jobs;
      }
    })
  }

}
