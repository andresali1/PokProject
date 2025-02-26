import { typeDTO } from '../admin/type/type';

export interface PokemonCreationDTO {
  pokedex: number;
  nombre: string;
  tipoId: number;
  image: File | null;
}

export interface PokemonDTO {
  pokedex: number;
  nombre: string;
  tipoId: number;
  image: string;
  tipo: typeDTO;
}
