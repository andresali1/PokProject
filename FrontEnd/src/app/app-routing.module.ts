import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { SecurityComponent } from './modules/security/security.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/home/home.routing.module').then(
        (m) => m.HomeRoutingModule
      ),
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/home/home.routing.module').then(
        (m) => m.HomeRoutingModule
      ),
  },
  {
    path: 'auth',
    component: SecurityComponent,
    loadChildren: () =>
      import('./modules/security/security.routing.module').then(
        (m) => m.SecurityRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
