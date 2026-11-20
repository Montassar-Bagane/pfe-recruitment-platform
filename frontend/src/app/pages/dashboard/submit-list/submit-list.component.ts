import { Component, OnInit } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import { ApplicationToCandidateDto } from 'src/app/services/models';
import { ApplicationControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-submit-list',
  templateUrl: './submit-list.component.html',
  styleUrls: ['./submit-list.component.css']
})
export class SubmitListComponent implements OnInit {

  listSubmit!:ApplicationToCandidateDto[];

  constructor(private modalService: NzModalService, private applicationService: ApplicationControllerService) { }

  ngOnInit(): void {
    this.applicationService.getApplicationsByCandidateId({
      CandidateId: localStorage.getItem('id') as unknown as number
    }).subscribe({
      next: (res) => {
        this.listSubmit = res;
      }
    });
  }
  showConfirm(applicationId: number): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to cancel this application?',
      nzOkText: 'Yes',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.applicationService.deleteApplication({
        idcandidate: localStorage.getItem('id') as unknown as number,
        idapplication: applicationId
      }).subscribe({
        next: () => {
          this.applicationService.getApplicationsByCandidateId({
            CandidateId: localStorage.getItem('id') as unknown as number
          }).subscribe({
            next: (res) => {
              this.listSubmit = res;
            }
          });
        }
      })
    });
  }
}
