import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { SecurityComponent } from './modules/security/security.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { LogoutGuard } from './guards/auth/logout.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/home/home.routing.module').then(
        (m) => m.HomeRoutingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/home/home.routing.module').then(
        (m) => m.HomeRoutingModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    component: SecurityComponent,
    loadChildren: () =>
      import('./modules/security/security.routing.module').then(
        (m) => m.SecurityRoutingModule
      ),
    canActivate: [LogoutGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
