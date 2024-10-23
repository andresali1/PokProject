import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { toBase64 } from '../utilidades';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-pokemon',
  templateUrl: './form-pokemon.component.html',
  styleUrls: ['./form-pokemon.component.css'],
})
export class FormPokemonComponent implements OnInit {
  imagenBase64?: string;
  form: FormGroup;
  @Input() isEdit: boolean = false;

  constructor(private formbuilder: FormBuilder, private router: Router) {
    this.form = this.formbuilder.group({
      pokedex: ['', { validators: [Validators.required] }],
      name: ['', { validators: [Validators.required] }],
      type: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}

  guardarImagen(event: any) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      toBase64(file)
        .then((valor: any) => {
          this.imagenBase64 = valor as string;
        })
        .catch((error: any) => console.log(error));
    }
  }

  cancel() {
    this.router.navigate(['/home/list']);
  }
}
