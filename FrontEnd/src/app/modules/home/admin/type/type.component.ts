import { Component, OnInit } from '@angular/core';
import { typeCreationDTO, typeDTO } from './type';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TypeFormComponent } from '../type-form/type-form.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';
import { TypeService } from './type.service';
import { APIErrorsParse } from 'src/app/modules/utilidades/utilidades';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css'],
})
export class TypeComponent implements OnInit {
  tipos: typeDTO[] = [];
  displayedColumns: string[] = ['nombre', 'action'];
  cantidadTotalRegistros: any = 0;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5;
  errores: string[] = [];

  constructor(
    public dialog: MatDialog,
    private typeService: TypeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadRegistrosAMostrar: any) {
    this.typeService.obtenerTodos(pagina, cantidadRegistrosAMostrar).subscribe(
      (respuesta: HttpResponse<typeDTO[]>) => {
        this.tipos = respuesta.body!;
        this.cantidadTotalRegistros = respuesta.headers.get(
          'cantidadTotalRegistros'
        );
      },
      (error) => console.error(error)
    );
  }

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  openForm(isEdit: boolean, recordId: number | null = null) {
    const id: number = recordId != null ? recordId : 0;

    const dialogRef = this.dialog.open(TypeFormComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != '') {
        if (isEdit) {
          this.update(id, result);
        } else {
          this.create(result);
        }
      }
    });
  }

  create(type: typeCreationDTO) {
    this.typeService.create(type).subscribe(
      () => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.openSnackBar('Registro guardado exitosamente', 'Cerrar', true);
      },
      (error) => {
        this.errores = APIErrorsParse(error);
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
      }
    );
  }

  update(typeId: number, type: typeCreationDTO) {
    this.typeService.update(typeId, type).subscribe(
      () => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.openSnackBar('Registro actualizado exitosamente', 'Cerrar', true);
      },
      (error) => {
        this.errores = APIErrorsParse(error);
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
      }
    );
  }

  deleteDialog(typeId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: typeId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != '') {
        this.delete(result);
      }
    });
  }

  delete(typeId: number) {
    this.typeService.delete(typeId).subscribe(
      () => {
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.openSnackBar('Registro eliminado exitosamente', 'Cerrar', true);
      },
      (error) => {
        this.errores = APIErrorsParse(error);
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
      }
    );
  }
}
