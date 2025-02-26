namespace BackEnd.Utilities
{
    public interface IAlmacenadorArchivos
    {
        Task<string> GuardarArchivo(string contenedor, IFormFile archivo);
        Task<string> EditaArchivo(string contenedor, IFormFile archivo, string ruta);
        Task BorrarArchivo(string ruta, string contenedor);
    }
}