import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      user: ['', { validators: [Validators.required] }],
      email: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}
}
