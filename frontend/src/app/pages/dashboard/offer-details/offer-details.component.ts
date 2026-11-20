import { Component, OnInit } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import { ApplicationControllerService, JobControllerService } from 'src/app/services/services';
import { ApplicationToRecruiterDto, Job } from 'src/app/services/models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css']
})
export class OfferDetailsComponent implements OnInit {

  job!: Job;

  listSbmits!:ApplicationToRecruiterDto[];

  constructor(private modalService: NzModalService, private applicationService: ApplicationControllerService,
               private route: ActivatedRoute, private jobService: JobControllerService) { }
               

  showConfirm(listid: number): void {
    this.modalService.success({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to accept this candidate?',
      nzOkText: 'Accept',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOnOk: () => this.applicationService.updateApplicationToAccepted({
        idapplication: listid
      }).subscribe({
        next: () => {
          this.applicationService.getApplicationsByJobId({
            JobId: this.route.snapshot.params['id']
          }).subscribe({
            next: (res) => {
              this.listSbmits = res;
            }
          });
        }
      })
    });
  }

  showConfirm1(listid: number): void {
    this.modalService.error({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to refuse this candidate?',
      nzOkText: 'Refuse',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.applicationService.updateApplicationToRefused({
        idapplication: listid
      }).subscribe({
        next: () => {
          this.applicationService.getApplicationsByJobId({
            JobId: this.route.snapshot.params['id']
          }).subscribe({
            next: (res) => {
              this.listSbmits = res;
            }
          });
        }
      })
    });
  }

  ngOnInit(): void {
    this.applicationService.getApplicationsByJobId({
      JobId: this.route.snapshot.params['id']
    }).subscribe({
      next: (res) => {
        this.listSbmits = res;
      }
    });

    this.jobService.getJobById({
      id: this.route.snapshot.params['id']
    }).subscribe({
      next: (res) => {
        this.job = res;
      }
    })
  }

}
