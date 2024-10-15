import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private formbuilder: FormBuilder, private router: Router) {
    this.form = this.formbuilder.group({
      user: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}

  getError(field: string): string | void {
    switch (field) {
      case 'user':
        var email = this.form.get('user');

        if (email?.hasError('required')) {
          return 'El campo Usuario es requerido';
        }

        break;
      case 'password':
        var password = this.form.get('password');

        if (password?.hasError('required')) {
          return 'El campo Contraseña es requerido';
        }

        break;
      default:
        break;
    }
  }

  getRegister() {
    this.router.navigate(['/auth/register']);
  }
  
  getRecover() {
    this.router.navigate(['/auth/recover']);
  }
}
