import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { authenticationResponse, userCredentials } from './security';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private apiUrl = environment.apiUrl + 'cuentas';
  private readonly tokenKey = 'token';
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

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
