import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userDTO } from '../user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { toBase64 } from 'src/app/modules/utilidades/utilidades';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  @Input() isEdit: boolean = false;
  imagenBase64?: string;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.form = this.formbuilder.group({
      name: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}

  user: userDTO = { id: 1, name: 'Felipe', creationDate: new Date() };

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
}
