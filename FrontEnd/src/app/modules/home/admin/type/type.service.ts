import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { typeCreationDTO, typeDTO } from './type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TypeService {
  private apiUrl = environment.apiUrl + 'tipos';

  constructor(private http: HttpClient) {}

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

    return this.http.get<typeDTO[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  public obtenerPorId(id: number): Observable<typeDTO> {
    return this.http.get<typeDTO>(`${this.apiUrl}/${id}`);
  }

  create(type: typeCreationDTO) {
    return this.http.post(this.apiUrl, type);
  }

  update(typeId: number, type: typeCreationDTO) {
    return this.http.put(`${this.apiUrl}/${typeId}`, type);
  }

  delete(typeId: number) {
    return this.http.delete(`${this.apiUrl}/${typeId}`);
  }
}
