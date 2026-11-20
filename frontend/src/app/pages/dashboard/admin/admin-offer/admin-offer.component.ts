import { Component, OnInit } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import { JobControllerService } from 'src/app/services/services';
import { Job } from 'src/app/services/models';

@Component({
  selector: 'app-admin-offer',
  templateUrl: './admin-offer.component.html',
  styleUrls: ['./admin-offer.component.css']
})
export class AdminOfferComponent implements OnInit {
  data!: Job[];

  constructor(private modalService: NzModalService, private jobService: JobControllerService) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(jobs => {
      this.data = jobs;
    });
  }
  showConfirm(jobId: number): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this offer?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk : () => this.jobService.deleteJob({
        idjob: jobId
      }).subscribe({
        next: () => {
          this.jobService.getAllJobs().subscribe(jobs => {
            this.data = jobs;
          });
        }
      })
    });
  }


}
