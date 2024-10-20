import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigate(['/home/dashboard']);
  }

  goList() {
    this.router.navigate(['/home/list']);
  }

  goCreate() {
    console.log('entro a crear');
    this.router.navigate(['/home/create']);
  }

  goAdmin() {
    console.log('entro a admin');
    this.router.navigate(['/home/admin']);
  }
}
