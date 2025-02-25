import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userCredentials, userCredentialsRecover } from '../security';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { APIErrorsParse } from '../../utilidades/utilidades';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css'],
})
export class RecoverComponent implements OnInit {
  form: FormGroup;
  hide: boolean = true;
  errors: string[] = [];
  defaultEmail: string | null = '';

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private securityService: SecurityService
  ) {
    this.form = this.formbuilder.group({
      email: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
      re_password: ['', { validators: [Validators.required] }],
    });

    this.defaultEmail = this.securityService.getEmail();

    if (this.defaultEmail != null) {
      this.form.patchValue({
        email: this.defaultEmail,
      });
    }

    this.securityService.removeEmail();
  }

  ngOnInit(): void {}

  getRecover(formCredentials: userCredentialsRecover) {
    const passwordsMatch = this.passwordsMatch();

    if (passwordsMatch) {
      const credentials: userCredentials = {
        email: formCredentials.email,
        password: formCredentials.password,
        fromAdmin: false,
      };

      this.securityService.recover(credentials).subscribe(
        (response) => {
          this.securityService.saveToken(response);
          this.router.navigate(['/']);
        },
        (error) => (this.errors = APIErrorsParse(error))
      );
    } else {
      this.errors = ["Passwords don't match"];
    }
  }

  passwordsMatch(): boolean {
    let pass1 = this.form.value.password;
    let pass2 = this.form.value.re_password;
    return pass1 == pass2;
  }
}
