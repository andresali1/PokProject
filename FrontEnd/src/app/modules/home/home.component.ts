import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditComponent } from './modals/edit/edit.component';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public readonly esAdmin: boolean = false;
  username: string = '';

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private securityServide: SecurityService
  ) {
    this.esAdmin = this.securityServide.obtenerRol() == 'admin';
  }

  ngOnInit(): void {
    this.getUserName();
  }

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
    if (this.esAdmin) {
      this.router.navigate(['/home/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }

  getUserName() {
    const email = this.securityServide.getUserEmail();
    const username = email.split('@')[0];
    this.username = username;
  }

  logout() {
    this.securityServide.logout();
    this.router.navigate(['/auth']);
  }
}
