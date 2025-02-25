import { Component, OnInit } from '@angular/core';
import { userCreationDTO, userDTO } from './user';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIErrorsParse } from 'src/app/modules/utilidades/utilidades';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: userDTO[] = [];
  displayedColumns: string[] = ['email', 'active', 'action'];
  cantidadTotalRegistros: any = 0;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5;
  errores: string[] = [];

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadRegistrosAMostrar: any) {
    this.userService.obtenerTodos(pagina, cantidadRegistrosAMostrar).subscribe(
      (respuesta: HttpResponse<userDTO[]>) => {
        this.users = respuesta.body!;
        this.cantidadTotalRegistros = respuesta.headers.get(
          'cantidadTotalRegistros'
        );
      },
      (error) => console.error(error)
    );
  }

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  openForm() {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.create(result);
    });
  }

  create(user: userCreationDTO) {
    this.userService.create(user).subscribe(
      () => {
        this.openSnackBar('Usuario creado exitosamente', 'Cerrar', true);
      },
      (error) => {
        this.errores = APIErrorsParse(error);
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
      }
    );
  }

  hacerAdmin(usuarioId: string) {
    this.userService.hacerAdmin(usuarioId).subscribe(
      () =>
        this.openSnackBar('Operación Realizada exitosamente', 'Cerrar', true),
      (error) =>
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false)
    );
  }

  removerAdmin(usuarioId: string) {
    this.userService.removerAdmin(usuarioId).subscribe(
      () =>
        this.openSnackBar('Operación Realizada exitosamente', 'Cerrar', true),
      (error) =>
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false)
    );
  }

  deleteDialog(userId: string) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: userId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != '') {
        this.eliminar(result);
      }
    });
  }

  eliminar(usuarioId: string) {
    console.log('Entramos a eliminar');

    this.userService.eliminar(usuarioId).subscribe(
      (response) => {
        console.log('Tu respuesta: ', response);
        this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.openSnackBar('Usuario eliminado exitosamente', 'Cerrar', true);
      },
      (error) => {
        console.log(error);
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
      }
    );
  }

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }
}
