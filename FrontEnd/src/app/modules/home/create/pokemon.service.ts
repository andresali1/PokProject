import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PokemonCreationDTO, PokemonDTO } from './pokemon';
import { Observable } from 'rxjs';

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

    return this.http.get<PokemonDTO[]>(this.apiUrl, {
      observe: 'response',
      params,
    });
  }

  public obtenerPorId(id: number): Observable<PokemonDTO> {
    return this.http.get<PokemonDTO>(`${this.apiUrl}/${id}`);
  }

  crear(pokemon: PokemonCreationDTO): Observable<number> {
    const formData = this.construirFormData(pokemon);

    return this.http.post<number>(`${this.apiUrl}`, formData);
  }

  editar(pokemonId: number, pokemon: PokemonCreationDTO) {
    const formData = this.construirFormData(pokemon);

    return this.http.put(`${this.apiUrl}/${pokemonId}`, formData);
  }

  delete(pokemonId: number) {
    return this.http.delete(`${this.apiUrl}/${pokemonId}`);
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
