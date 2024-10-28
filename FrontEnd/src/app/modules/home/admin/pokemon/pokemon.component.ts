import { Component, OnInit } from '@angular/core';
import { DEMO_DATA_POKEMON } from '../pokemon';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  displayedColumns: string[] = [
    'pokedex',
    'name',
    'type',
    'creationDate',
    'creationUser',
    'action',
  ];
  dataSource = DEMO_DATA_POKEMON;
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
    const dialogRef = this.dialog.open(PokemonFormComponent, {
      data: { isEdit: isEdit },
    });

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
      console.log('Eliminamos pokemon ' + result);
    });
  }
}
