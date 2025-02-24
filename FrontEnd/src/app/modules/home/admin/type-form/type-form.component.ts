import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { typeCreationDTO, typeDTO } from '../type';
import { TypeService } from '../type/type.service';
import { APIErrorsParse } from 'src/app/modules/utilidades/utilidades';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css'],
})
export class TypeFormComponent implements OnInit {
  form: FormGroup;
  objTipo: typeDTO = { id: 0, nombre: '' };
  errors: string[] = [];
  label: string = 'Crear';

  constructor(
    private typeService: TypeService,
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<TypeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.form = this.formbuilder.group({
      nombre: ['', { validators: [Validators.required] }],
    });

    if (data.id > 0) {
      this.label = 'Actualizar';
      this.typeService.obtenerPorId(data.id).subscribe(
        (data) => {
          this.objTipo = data;
          this.form.patchValue({
            nombre: this.objTipo.nombre,
          });
        },
        (error) => {
          this.errors = APIErrorsParse(error);
          this.dialogRef.close();
        }
      );
    }
  }

  ngOnInit(): void {}
}
