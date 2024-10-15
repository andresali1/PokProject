import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, RecoverComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class SecurityModule {}
