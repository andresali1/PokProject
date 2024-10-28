import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../modals/edit/edit.component';
import { ConfirmComponent } from '../modals/confirm/confirm.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  editDialog() {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { isEdit: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Soy Card");
      console.log(result);
    });
  }

  closeDialog() {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
