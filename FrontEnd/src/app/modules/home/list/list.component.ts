import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../create/pokemon.service';
import { PokemonCreationDTO, PokemonDTO } from '../create/pokemon';
import { PageEvent } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIErrorsParse } from '../../utilidades/utilidades';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  pokemons: PokemonDTO[] = [];
  cantidadTotalRegistros: any = 0;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 4;
  errores: string[] = [];

  constructor(
    private pokemonService: PokemonService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
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

  update(pokemonCreationDTO: PokemonCreationDTO) {
    this.pokemonService
      .editar(pokemonCreationDTO.pokedex, pokemonCreationDTO)
      .subscribe(
        () => {
          this.cargarRegistros(
            this.paginaActual,
            this.cantidadRegistrosAMostrar
          );
          this.openSnackBar(
            'Registro actualizado exitosamente',
            'Cerrar',
            true
          );
        },
        (error) => {
          this.errores = APIErrorsParse(error);
          this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
        }
      );
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

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }
}
