import { Component, OnInit } from '@angular/core';
import { AddApplication$Params } from 'src/app/services/fn/application-controller/add-application';
import { Job } from 'src/app/services/models';
import { ApplicationControllerService, JobControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  authority=localStorage.getItem('authority');
  
  searchtext: any;
  jobListings!: Job[];
  drawerVisible = false;
  selectedJob: any;
  message: string = '';
  uploadedCV: File | null = null;

  constructor(private jobService: JobControllerService, private applicationService: ApplicationControllerService) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(jobs => {
      this.jobListings = jobs;
    });
    //console.log(this.uploadedCV)
  }

  cancelFileSelection(): void {
    this.uploadedCV=null
  }

  openDrawer(job: any) {
    this.selectedJob = job;
    this.drawerVisible = true;
  }

  closeDrawer() {
    this.drawerVisible = false;
    this.selectedJob = null;
  }

  onFileChange(event: any) {
    this.uploadedCV = event.target.files[0];
  }

  submitApplication() {
    const requestBody: AddApplication$Params = {
      description: this.message,
      idcandidate: localStorage.getItem('id') as unknown as number,
      idjob: this.selectedJob.id,
      body: {
        'file': this.uploadedCV as File
      }
    }
    this.applicationService.addApplication(requestBody).subscribe({
      next: () => {
        this.closeDrawer();
        this.message = '';
        this.uploadedCV = null;
        alert("Application submitted successfully!");
      },
      error: () => {
        alert("Upload your CV!");
      }
    });
    //this.closeDrawer();
  }

}
