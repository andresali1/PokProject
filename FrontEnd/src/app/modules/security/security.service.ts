import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { authenticationResponse, userCredentials } from './security';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private apiUrl = environment.apiUrl + 'cuentas';
  private readonly tokenKey = 'token';
  private readonly emailKey = 'email';
  private readonly roleKey = 'role';
  private readonly expirationKey = 'token-expiracion';

  constructor(private httpClient: HttpClient) {}

  register(credentials: userCredentials): Observable<authenticationResponse> {
    return this.httpClient.post<authenticationResponse>(
      `${this.apiUrl}/crear`,
      credentials
    );
  }

  login(credentials: userCredentials): Observable<authenticationResponse> {
    return this.httpClient.post<authenticationResponse>(
      `${this.apiUrl}/login`,
      credentials
    );
  }

  saveToken(authenticationResponse: authenticationResponse) {
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(
      this.expirationKey,
      authenticationResponse.expiracion.toString()
    );
  }

  saveEmail(email: string) {
    localStorage.setItem(this.emailKey, email);
  }

  removeEmail() {
    localStorage.removeItem(this.emailKey);
  }

  getEmail() {
    return localStorage.getItem(this.emailKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationKey);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  getUserEmail(): string {
    const token = this.getToken();
    let result: string = '';

    if (token != null) {
      try {
        const decodedToken: any = jwtDecode(token);
        const email = decodedToken.email;

        result = email;
      } catch (error) {
        result = '';
      }
    }

    return result;
  }

  obtenerRol() {
    const token = this.getToken();

    return this.obtenerCampoJWT(token != null ? token : '', this.roleKey);
  }

  obtenerCampoJWT(token: string, campo: string): string {
    const dataToken = JSON.parse(atob(token.split('.')[1]));

    return dataToken[campo];
  }

  recover(credentials: userCredentials): Observable<authenticationResponse> {
    return this.httpClient.post<authenticationResponse>(
      `${this.apiUrl}/recover`,
      credentials
    );
  }
}
