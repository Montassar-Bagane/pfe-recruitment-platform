import { Component, OnInit } from '@angular/core';
import {NzModalService} from "ng-zorro-antd/modal";
import { Candidate } from 'src/app/services/models';
import { AccountManagementControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-condidate',
  templateUrl: './condidate.component.html',
  styleUrls: ['./condidate.component.css']
})
export class CondidateComponent implements OnInit {
  data!: Candidate[];

  constructor(private modalService: NzModalService, private AccountManagementService: AccountManagementControllerService) { }

  ngOnInit(): void {
    this.AccountManagementService.getAllCandidates().subscribe(candidates => {
      this.data = candidates;
    });
  }
  showConfirm(candidateId: number): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Are you sure you want to delete this candidate?',
      nzOkText: 'Delete',
      nzCancelText: 'Cancel',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.AccountManagementService.deleteUser({
        id: candidateId
      }).subscribe({
        next: () => {
          this.AccountManagementService.getAllCandidates().subscribe(candidates => {
            this.data = candidates;
          });
        }
      })
    });
  }

}
