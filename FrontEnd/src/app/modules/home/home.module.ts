import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { CardComponent } from './card/card.component';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    CardComponent,
    CreateComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
})
export class HomeModule {}
