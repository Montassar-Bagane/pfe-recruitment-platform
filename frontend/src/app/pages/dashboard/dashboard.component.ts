import { Component, OnInit } from '@angular/core';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  constructor(public router:Router) { }

  authority=localStorage.getItem('authority');

  ngOnInit(): void {
  }
  onLogout():void{
    localStorage.clear()
    //window.location.reload()
    this.router.navigate(['/'])

  }

}
