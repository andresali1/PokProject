import { Component, OnInit } from '@angular/core';
import { DEMO_DATA_TYPE } from '../type';
import { PageEvent } from '@angular/material/paginator';

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

  constructor() {}

  ngOnInit(): void {}

  actualizarPaginacion(datos: PageEvent) {
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    //this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }
}
