import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
      email: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}
}
