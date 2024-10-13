import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './modules/home/home.component';
import { SecurityComponent } from './modules/security/security.component';
import { HomeModule } from './modules/home/home.module';
import { SecurityModule } from './modules/security/security.module';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, SecurityComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    MaterialModule,
    SecurityModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
