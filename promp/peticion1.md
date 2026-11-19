PETICIÓN 1. FUNCIONES DE LECTURA DE PELÍCULAS

Siguiendo estrictamente las reglas del Prompt Maestro de Videoteca, créame el archivo:

lib/peliculas.ts

Este archivo pertenece a la capa 1 (lectura de la base de datos).

Mi modelo de Prisma es exactamente:

model Pelicula {
  id          String   @id @default(cuid())
  titulo      String
  comentario  String?
  vista       Boolean  @default(false)
  guardadaEn  DateTime @default(now())
}

Necesito tres funciones:

obtenerPeliculas()

Devuelve todas las películas.

Ordenadas primero las pendientes (vista: false) y después las vistas (vista: true).

Dentro de cada grupo, las más recientes primero.

Utiliza exactamente:

orderBy: [{ vista: 'asc' }, { guardadaEn: 'desc' }]

obtenerPeliculasVistas()

Devuelve exclusivamente las películas que tienen vista: true.

Ordenadas por guardadaEn: 'desc'.

obtenerPeliculaPorId(id: string)

Busca una única película por su identificador.

Devuelve la película o null si no existe.

Utiliza findUnique.

REGLAS:

Importa prisma exclusivamente desde @/lib/prisma.

Importa el tipo Pelicula desde @prisma/client si es necesario.

Son funciones async normales.

Este archivo NO lleva ninguna directiva: ni 'use server', ni 'use client', ni 'use cache'.

No escribas ninguna operación de creación, modificación o borrado.

No utilices any.

Dame la ruta completa, el código completo y una explicación breve de las tres funciones.