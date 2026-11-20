import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationControllerService } from 'src/app/services/services';

@Component({
  selector: 'app-cv-details',
  templateUrl: './cv-details.component.html',
  styleUrls: ['./cv-details.component.css']
})
export class CvDetailsComponent implements OnInit {

  afterLoadComplete(event: any) {

}

  pdfFileUrl: any;
  
  constructor(private route: ActivatedRoute, private applicationService: ApplicationControllerService) { }

  ngOnInit(): void {
    this.applicationService.getCv({
      id: this.route.snapshot.params['id']
    }).subscribe({
      next: (response) => {
        let blob: Blob = new Blob([response], { type: 'application/pdf' });
        this.pdfFileUrl = window.URL.createObjectURL(blob);
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
