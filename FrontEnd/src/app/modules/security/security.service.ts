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

  constructor(private httpClient: HttpClient) {}

  register(credentials: userCredentials): Observable<authenticationResponse> {
    return this.httpClient.post<authenticationResponse>(
      `${this.apiUrl}/crear`,
      credentials
    );
  }
}
