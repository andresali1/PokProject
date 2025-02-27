import {
  Component,
  Inject,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIErrorsParse, toBase64 } from '../utilidades';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TypeService } from '../../home/admin/type/type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { typeDTO } from '../../home/admin/type/type';
import { PokemonCreationDTO, PokemonDTO } from '../../home/create/pokemon';
import { PokemonService } from '../../home/create/pokemon.service';

@Component({
  selector: 'app-form-pokemon',
  templateUrl: './form-pokemon.component.html',
  styleUrls: ['./form-pokemon.component.css'],
})
export class FormPokemonComponent implements OnInit {
  objPokemon: PokemonDTO = {
    pokedex: 0,
    nombre: '',
    tipoId: 0,
    image: '',
    tipo: null,
  };
  imagenBase64: string = '';
  form: FormGroup;
  tipos: typeDTO[] = [];
  @Input() isEdit: boolean = false;
  @Input() fromAdmin: boolean = false;
  @Input() pokemonId: number = 0;
  @Output()
  pokemonSave: EventEmitter<PokemonCreationDTO> =
    new EventEmitter<PokemonCreationDTO>();
  @Output() modalClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  errors: string[] = [];
  imagenCambiada: boolean = false;

  constructor(
    private formbuilder: FormBuilder,
    private typeService: TypeService,
    private pokemonService: PokemonService,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FormPokemonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.form = this.formbuilder.group({
      pokedex: ['', { validators: [Validators.required] }],
      nombre: ['', { validators: [Validators.required] }],
      tipoId: ['', { validators: [Validators.required] }],
      image: '',
    });
  }

  ngOnInit(): void {
    if (this.pokemonId > 0) {
      this.isEdit = true;
      this.obtenerPorId(this.pokemonId);
    }

    this.typeService.obtenerListado().subscribe(
      (response) => {
        this.tipos = response;
        console.log(this.tipos);
      },
      (error) => {
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
      }
    );
  }

  obtenerPorId(id: number) {
    this.pokemonService.obtenerPorId(id).subscribe(
      (data) => {
        this.objPokemon = data;
        this.form.patchValue({
          pokedex: this.objPokemon.pokedex,
          nombre: this.objPokemon.nombre,
          tipoId: this.objPokemon.tipoId,
          image: this.objPokemon.image,
        });
      },
      (error) => {
        this.errors = APIErrorsParse(error);
        this.dialogRef.close();
      }
    );
  }

  guardarImagen(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      toBase64(file)
        .then((valor: any) => {
          this.imagenBase64 = valor as string;
          this.form.get('image')?.setValue(file);
          this.imagenCambiada = true;
        })
        .catch((error: any) => console.log(error));
    }
  }

  save(pokemon: PokemonCreationDTO) {
    this.pokemonSave.emit(pokemon);
  }

  cancel() {
    this.modalClose.emit(true);
  }

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }
}
