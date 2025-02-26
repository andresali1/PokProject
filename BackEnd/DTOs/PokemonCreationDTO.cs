namespace BackEnd.DTOs;

public class PokemonCreationDTO
{
    public int Pokedex { get; set; }
    public string Nombre { get; set; }
    public IFormFile Image { get; set; }
    public int TipoId { get; set; }
}