import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditComponent } from './modals/edit/edit.component';
import { SecurityService } from '../security/security.service';
import { PokemonService } from './create/pokemon.service';
import { PokemonCreationDTO } from './create/pokemon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { APIErrorsParse } from '../utilidades/utilidades';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public readonly esAdmin: boolean = false;
  username: string = '';
  errores: string[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private securityServide: SecurityService,
    private pokemonService: PokemonService,
    private _snackBar: MatSnackBar
  ) {
    this.esAdmin = this.securityServide.obtenerRol() == 'admin';
  }

  ngOnInit(): void {
    this.getUserName();
  }

  goHome() {
    this.router.navigate(['/home/dashboard']);
  }

  goList() {
    this.router.navigate(['/home/list']);
  }

  goCreate() {
    const dialogRef = this.dialog.open(EditComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.create(result);
    });
  }

  create(pokemon: PokemonCreationDTO) {
    this.pokemonService.crear(pokemon).subscribe(
      () => {
        this.openSnackBar('Registro guardado exitosamente', 'Cerrar', true);
        this.router.navigate(['/home/list']);
      },
      (error) => {
        this.errores = APIErrorsParse(error);
        this.openSnackBar('Oops! ha ocurrido un error', 'Cerrar', false);
      }
    );
  }

  goAdmin() {
    if (this.esAdmin) {
      this.router.navigate(['/home/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }

  getUserName() {
    const email = this.securityServide.getUserEmail();
    const username = email.split('@')[0];
    this.username = username;
  }

  logout() {
    this.securityServide.logout();
    this.router.navigate(['/auth']);
  }

  openSnackBar(message: string, action: string, success: boolean) {
    const snackClass = success ? 'success-snackbar' : 'fail-snackbar';

    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: [snackClass],
    });
  }
}
