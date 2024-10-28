import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './modals/edit/edit.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { AdminComponent } from './admin/admin.component';
import { PokemonComponent } from './admin/pokemon/pokemon.component';
import { TypeComponent } from './admin/type/type.component';
import { UsersComponent } from './admin/users/users.component';
import { FormPokemonComponent } from '../utilidades/form-pokemon/form-pokemon.component';
import { UserFormComponent } from './admin/user-form/user-form.component';
import { PokemonFormComponent } from './admin/pokemon-form/pokemon-form.component';
import { TypeFormComponent } from './admin/type-form/type-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    CardComponent,
    CreateComponent,
    EditComponent,
    ConfirmComponent,
    AdminComponent,
    UsersComponent,
    PokemonComponent,
    TypeComponent,
    FormPokemonComponent,
    UserFormComponent,
    PokemonFormComponent,
    TypeFormComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class HomeModule {}
