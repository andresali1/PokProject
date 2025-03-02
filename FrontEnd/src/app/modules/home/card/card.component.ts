import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../modals/edit/edit.component';
import { ConfirmComponent } from '../modals/confirm/confirm.component';
import { PokemonCreationDTO, PokemonDTO } from '../create/pokemon';
import { PokemonService } from '../create/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() pokemon: PokemonDTO = {
    pokedex: 0,
    nombre: '',
    tipoId: 0,
    tipo: null,
    image: '',
  };

  @Output() editarRegistro: EventEmitter<PokemonCreationDTO> =
    new EventEmitter<PokemonCreationDTO>();

  @Output() eliminarRegistro: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    public dialog: MatDialog,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {}

  editDialog() {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { isEdit: true, pokedex: this.pokemon.pokedex, fromAdmin: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.pokedex != undefined) {
        this.update(result);
      }
    });
  }

  update(pokemon: PokemonCreationDTO) {
    this.editarRegistro.emit(pokemon);
  }

  deleteDialog(pokemonId: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { id: pokemonId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != '' && result != undefined) {
        this.eliminarRegistro.emit(result);
      }
    });
  }
}
