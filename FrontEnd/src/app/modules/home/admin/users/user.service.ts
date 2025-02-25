import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SecurityService } from '../../../security/security.service';
import { userCredentials } from '../../../security/security';
import { userCreationDTO, userDTO } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private defaultPass: string = 'Default-123';
  private apiUrl = environment.apiUrl + 'cuentas';

  constructor(
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  public obtenerTodos(
    pagina: number,
    cantidadRegistrosAMostrar: number
  ): Observable<any> {
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append(
      'recordsPorPagina',
      cantidadRegistrosAMostrar.toString()
    );

    return this.http.get<userDTO[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  create(user: userCreationDTO) {
    let userCredentials: userCredentials = {
      email: user.email,
      password: this.defaultPass,
      fromAdmin: true,
    };

    return this.securityService.register(userCredentials);
  }

  hacerAdmin(usuarioId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(
      `${this.apiUrl}/hacerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }

  removerAdmin(usuarioId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(
      `${this.apiUrl}/removerAdmin`,
      JSON.stringify(usuarioId),
      { headers }
    );
  }

  eliminar(usuarioId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiUrl}/cuenta`, JSON.stringify(usuarioId), {
      headers,
    });
  }
}
