import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../create/pokemon.service';
import { PokemonCreationDTO, PokemonDTO } from '../create/pokemon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIErrorsParse } from '../../utilidades/utilidades';

export interface Card {
  title: string;
  subtitle: string;
  text: string;
}

const DATA: Card[] = [
  {
    title: 'Shiba Inu 1',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 2',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 3',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 4',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 5',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 6',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 7',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 8',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 9',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
  {
    title: 'Shiba Inu 10',
    subtitle: 'Dog Breed',
    text: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.',
  },
];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  pokemons: PokemonDTO[] = [];
  cantidadTotalRegistros: any = 0;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 5;
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

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }
}
