using System.ComponentModel.DataAnnotations;
using BackEnd.Validators;

namespace BackEnd.Entities;

public class Pokemon
{
    [Key]
    [Required(ErrorMessage = "El campo {0} es requerido")]
    public int Pokedex { get; set; }

    [Required(ErrorMessage = "El campo {0} es requerido")]
    [StringLength(maximumLength: 50, ErrorMessage = "El campo {0} debe tener un máximo de {1} caracteres")]
    [PrimeraMayuscula]
    public string Nombre { get; set; }

    public string Image { get; set; }

    public int TipoId { get; set; }

    public Tipo Tipo { get; set; }
}