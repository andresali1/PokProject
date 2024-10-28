import { Component, OnInit } from '@angular/core';
import { DEMO_DATA_TYPE } from '../type';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TypeFormComponent } from '../type-form/type-form.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
})
export class TypeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = DEMO_DATA_TYPE;
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
    console.log('entramos papacho');
    const dialogRef = this.dialog.open(TypeFormComponent);

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
      console.log('Eliminamos tipo ' + result);
    });
  }
}
