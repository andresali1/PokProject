# PeliculasAngular.Net
Proyecto WebApi con una aplicación de registro de Pokemon. Tiene un sistema de Autenticación y de autorización. Usa SQL Server como motor de base de datos. Adicionalmente hay un cliente en Angular que consume el web API desde un front end.

### Tecnologías Utilizadas
:keyboard: C# 10  
:keyboard: .Net 6  
:computer: Visual Studio Code  
:file_cabinet: Sql Server 2022 - 16.0.4175.1  
:window: Angular CLI: 12.2.18  
:keyboard: Node: 14.15.5  
:keyboard: NPM: 6.14.11

### :open_book: Configuración  
1. En una carpeta del sistema ejecutar el comando :arrow_forward: git clone https://github.com/andresali1/PokProject.git
2. Ubicarse dentro de la carpeta "Back-end" y abrir con VS Code
3. Verificar las cadenas de conexión a la Base de datos en los archivos "appsettings.json" y colocar la cadena de conexión propia a SQL Server
4. Abrir la terminal y con dotnet cli usar el comando "dotnet ef database update"
5. Ejecutar el Proyecto Back-end desde dotnet cli o con las herramientas de VS Code
6. Ubicarse dentro de la carpeta "Front-end"
7. Ejecutar el comando :arrow_forward: npm install
8. Verificar la carpeta "environments" dentro del proyecto y colocar la URL que tenga el proyecto Back-end
9. Ejecutar el proyecto Front-end con el comando :arrow_forward: ng serve -open

