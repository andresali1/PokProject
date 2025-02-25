import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeService } from '../type/type.service';
import { typeDTO } from '../type/type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PokemonCreationDTO } from '../../pokemon';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css'],
})
export class PokemonFormComponent implements OnInit {
  objPokemon: PokemonCreationDTO = { pokedex: 0, name: '', type: 0, image: '' };
  isEdit: boolean = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PokemonFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEdit = data.isEdit;
  }

  ngOnInit(): void {}

  guardarPokemon(pokemon: PokemonCreationDTO) {
    this.objPokemon = pokemon;

    this.cdr.detectChanges();

    let element: HTMLElement = document.getElementById(
      'saveBtn'
    ) as HTMLElement;
    element.click();
  }

  cerrarModal() {
    let element: HTMLElement = document.getElementById(
      'cancelBtn'
    ) as HTMLElement;
    element.click();
  }

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }
}
