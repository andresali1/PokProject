import { Component, OnInit } from '@angular/core';
import { DEMO_DATA_POKEMON } from '../pokemon';
import { PageEvent } from '@angular/material/paginator';

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

  constructor() {}

  ngOnInit(): void {}

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    //this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
}
