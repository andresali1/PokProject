import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { userCredentials } from '../security';
import { APIErrorsParse } from '../../utilidades/utilidades';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide: boolean = true;
  errors: string[] = [];
  isFirstLogin: boolean = false;
  defaultEmail: string = '';
  private readonly isResetKey: string = 'isReset';
  private readonly isActiveKey: string = 'isActive';

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private securityService: SecurityService
  ) {
    this.form = this.formbuilder.group({
      email: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}

  getError(field: string): string | void {
    switch (field) {
      case 'email':
        var email = this.form.get('email');

        if (email?.hasError('required')) {
          return 'El campo Email es requerido';
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

  getLogin(credentials: userCredentials) {
    this.securityService.login(credentials).subscribe(
      (response) => {
        let isPasswordReset: string = this.securityService.obtenerCampoJWT(
          response.token,
          this.isResetKey
        );

        let isActive: string = this.securityService.obtenerCampoJWT(
          response.token,
          this.isActiveKey
        );

        this.securityService.saveEmail(credentials.email);

        if (isActive === 'False') {
          this.getRecover();
        } else if (isPasswordReset === 'True') {
          this.isFirstLogin = true;
        } else {
          this.isFirstLogin = false;
          this.securityService.saveToken(response);
          this.router.navigate(['/']);
        }
      },
      (error) => {
        this.errors = APIErrorsParse(error);
        console.log(this.errors);
      }
    );
  }

  getRegister() {
    this.router.navigate(['/auth/register']);
  }

  getRecover() {
    this.isFirstLogin = true;
  }
}
