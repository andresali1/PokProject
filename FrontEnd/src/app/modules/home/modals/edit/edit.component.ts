import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonCreationDTO } from '../../create/pokemon';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  objPokemon: PokemonCreationDTO = {
    pokedex: 0,
    nombre: '',
    tipoId: 0,
    image: null,
  };
  isEdit: boolean = true;
  pokedex: number = 0;
  fromAdmin: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
    this.pokedex = data.pokedex;
    this.fromAdmin = data.fromAdmin;
  }

  ngOnInit(): void {}

  editar(pokemonCreationDTO: PokemonCreationDTO) {
    this.objPokemon = pokemonCreationDTO;

    this.cdr.detectChanges();

    let element: HTMLElement = document.getElementById(
      'saveBtn'
    ) as HTMLElement;
    element.click();
  }

  cerrar() {
    let element: HTMLElement = document.getElementById(
      'cancelBtn'
    ) as HTMLElement;
    element.click();
  }
}
