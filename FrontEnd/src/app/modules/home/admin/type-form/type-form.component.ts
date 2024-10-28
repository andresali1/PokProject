import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-form',
  templateUrl: './type-form.component.html',
  styleUrls: ['./type-form.component.css'],
})
export class TypeFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private dialogRef: MatDialogRef<TypeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
    this.form = this.formbuilder.group({
      name: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}
}
