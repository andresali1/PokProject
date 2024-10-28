import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditComponent } from './modals/edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  goHome() {
    this.router.navigate(['/home/dashboard']);
  }

  goList() {
    this.router.navigate(['/home/list']);
  }

  goCreate() {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Soy home');
      console.log(result);
    });
  }

  goAdmin() {
    this.router.navigate(['/home/admin']);
  }
}
