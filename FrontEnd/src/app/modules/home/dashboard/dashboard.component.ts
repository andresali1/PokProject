import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  //APEXCHARTS
  //https://apexcharts.com/

  constructor() {}

  ngOnInit(): void {
    var options = {
      chart: {
        type: 'donut',
      },
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
      },
    };

    var chart = new ApexCharts(document.querySelector('#chart'), options);

    chart.render();
  }
}
