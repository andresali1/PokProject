import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from '../security.service';
import { userCredentials } from '../security';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private securityService: SecurityService
  ) {
    this.form = this.formBuilder.group({
      email: ['', { validators: [Validators.required] }],
      password: ['', { validators: [Validators.required] }],
    });
  }

  ngOnInit(): void {}

  getRegister(credentials: userCredentials) {
    this.securityService.register(credentials).subscribe(
      (response) => {
        console.log('*** Respuesta ***');
        console.log(response);
        console.log('*****************');
        this.router.navigate(['/']);
      },
      (error) => console.log(error)
    );
  }

  getLogin() {
    this.router.navigate(['/auth/login']);
  }
}
