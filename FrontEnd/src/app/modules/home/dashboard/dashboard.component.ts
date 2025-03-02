import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { PokemonService } from '../create/pokemon.service';
import { PokemonDTO } from '../create/pokemon';
import { dashboardDTO } from './dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  pokemonReciente: PokemonDTO = {
    pokedex: 0,
    nombre: '',
    tipoId: 0,
    tipo: null,
    image: '',
  };
  options: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.obtenerPokemon();
    var options = this.obtenerDashboard();
  }

  obtenerPokemon() {
    this.pokemonService.obtenerUltimoCreado().subscribe(
      (respuesta) => {
        this.pokemonReciente = respuesta;
      },
      (error) => console.log(error)
    );
  }

  obtenerDashboard() {
    this.pokemonService.obtenerDashboard().subscribe(
      (response) => {
        let options = {
          series: response.conteo,
          chart: {
            width: 520,
            type: 'donut',
          },
          plotOptions: {
            pie: {
              startAngle: -90,
              endAngle: 270,
            },
          },
          dataLabels: {
            enabled: false,
          },
          fill: {
            type: 'gradient',
          },
          labels: response.tipos,
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: 'bottom',
                },
              },
            },
          ],
        };

        var chart = new ApexCharts(document.querySelector('#chart'), options);
        chart.render();
      },
      (error) => console.log(error)
    );
  }
}
