using System.ComponentModel.DataAnnotations;
using BackEnd.Validators;

namespace BackEnd.DTOs;
public class TipoCreacionDTO
{
    [Required(ErrorMessage = "El campo {0} es requerido")]
    [StringLength(maximumLength: 50, ErrorMessage = "El campo {0} debe tener un máximo de {1} caracteres")]
    [PrimeraMayuscula]
    public string Nombre { get; set; }
}
