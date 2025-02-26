import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokemonCreationDTO } from './pokemon';
import { Observable } from 'rxjs';
import { pokemonDTO } from '../admin/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = environment.apiUrl + 'pokemon';

  constructor(private http: HttpClient) {}

  public obtenerPaginado(
      pagina: number,
      cantidadRegistrosAMostrar: number
    ): Observable<any> {
      let params = new HttpParams();
      params = params.append('pagina', pagina.toString());
      params = params.append(
        'recordsPorPagina',
        cantidadRegistrosAMostrar.toString()
      );
  
      return this.http.get<pokemonDTO[]>(this.apiUrl, {
        observe: 'response',
        params,
      });
    }

  crear(pokemon: PokemonCreationDTO): Observable<number> {
    const formData = this.construirFormData(pokemon);

    return this.http.post<number>(`${this.apiUrl}`, formData);
  }

  private construirFormData(pokemon: PokemonCreationDTO): FormData {
    const formData = new FormData();

    formData.append('pokedex', pokemon.pokedex.toString());
    formData.append('nombre', pokemon.nombre);
    formData.append('tipoId', pokemon.tipoId.toString());

    if (pokemon.image) {
      formData.append('image', pokemon.image);
    }

    return formData;
  }
}
