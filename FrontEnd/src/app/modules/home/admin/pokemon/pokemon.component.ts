import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PokemonFormComponent } from '../pokemon-form/pokemon-form.component';
import { ConfirmComponent } from '../../modals/confirm/confirm.component';
import { PokemonService } from '../../create/pokemon.service';
import { PokemonCreationDTO, PokemonDTO } from '../../create/pokemon';
import { APIErrorsParse } from 'src/app/modules/utilidades/utilidades';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  pokemons: PokemonDTO[] = [];
  displayedColumns: string[] = ['pokedex', 'image', 'name', 'type', 'action'];
  cantidadTotalRegistros: any = 0;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;
  errores: string[] = [];

  constructor(
    public dialog: MatDialog,
    private pokemonService: PokemonService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadRegistrosAMostrar: any) {
    this.pokemonService
      .obtenerPaginado(pagina, cantidadRegistrosAMostrar)
      .subscribe(
        (respuesta: HttpResponse<PokemonDTO[]>) => {
          this.pokemons = respuesta.body!;
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

  openForm(isEdit: boolean, pokedex: number | null = null) {
    const id: number = pokedex != null ? pokedex : 0;

    const dialogRef = this.dialog.open(PokemonFormComponent, {
      data: { id: id, isEdit: isEdit },
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

  create(pokemon: PokemonCreationDTO) {
    this.pokemonService.crear(pokemon).subscribe(
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

  update(pokemonId: number, pokemon: PokemonCreationDTO) {
    this.pokemonService.editar(pokemonId, pokemon).subscribe(
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

  deleteDialog(pokemonId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: pokemonId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != '') {
        this.delete(result);
      }
    });
  }

  delete(pokemonId: number) {
    this.pokemonService.delete(pokemonId).subscribe(
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

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }
}
