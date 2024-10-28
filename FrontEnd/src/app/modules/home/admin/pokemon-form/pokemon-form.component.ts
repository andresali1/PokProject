import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'],
})
export class PokemonFormComponent implements OnInit {
  isEdit: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.isEdit = data.isEdit;
  }

  ngOnInit(): void {}
}
