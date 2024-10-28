import { Component, OnInit } from '@angular/core';
import { DEMO_DATA_USER } from '../user';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'creationDate', 'action'];
  dataSource = DEMO_DATA_USER;
  cantidadTotalRegistros = 11;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    //this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  openForm(isEdit: boolean) {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (isEdit) {
        console.log('Lo editaremos');
      } else {
        console.log('Lo crearemos');
      }
    });
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Eliminamos usuario ' + result);
    });
  }
}
