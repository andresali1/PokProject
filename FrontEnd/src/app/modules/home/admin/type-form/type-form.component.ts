import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { typeCreationDTO } from '../type';
import { TypeService } from '../type/type.service';
import { APIErrorsParse } from 'src/app/modules/utilidades/utilidades';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css'],
})
export class TypeFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<TypeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.form = this.formbuilder.group({
      nombre: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}
}
