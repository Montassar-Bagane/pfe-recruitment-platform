import { Component, OnInit } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import { Recruiter } from 'src/app/services/models';
import { AccountManagementControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {
  data!:Recruiter[];

  constructor(private modalService: NzModalService, private AccountManagementService: AccountManagementControllerService) { }

  ngOnInit(): void {
    this.AccountManagementService.getAllRecruiters().subscribe(recruiters => {
      this.data = recruiters;
    });
  }
  showConfirm(recruiterId: number): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this recruiter?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk : () => this.AccountManagementService.deleteUser({
        id: recruiterId
      }).subscribe({
        next: () => {
          this.AccountManagementService.getAllRecruiters().subscribe(recruiters => {
            this.data = recruiters;
          });
        }
      })
    });
  }

}
