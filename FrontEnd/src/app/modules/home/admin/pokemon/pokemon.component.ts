import { Component, OnInit } from '@angular/core';
import { DEMO_DATA_POKEMON } from '../pokemon';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';
import { PokemonService } from '../../create/pokemon.service';
import { PokemonCreationDTO } from '../../create/pokemon';
import { APIErrorsParse } from 'src/app/modules/utilidades/utilidades';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  errores: string[] = [];

  constructor(
    public dialog: MatDialog,
    private pokemonService: PokemonService,
    private _snackBar: MatSnackBar
  ) {}

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
      console.log('Mira Felipe', result);

      if (result != '') {
        if (isEdit) {
          console.log('Lo editaremos');
        } else {
          this.create(result);
        }
      }
    });
  }

  create(pokemon: PokemonCreationDTO) {
    this.pokemonService.crear(pokemon).subscribe(
      () => {
        //this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
        this.openSnackBar('Registro guardado exitosamente', 'Cerrar', true);
      },
      (error) => {
        console.log(error);
        this.errores = APIErrorsParse(error);
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
      }
    );
  }

  deleteDialog() {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Eliminamos pokemon ' + result);
    });
  }

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }
}
