PETICIÓN 9. LISTA DE PELÍCULAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

components/ListaPeliculas.tsx

Pertenece a la capa 4.

PROPS:

peliculas: Pelicula[] (tipo importado de @prisma/client).

tituloVacio: string.

subtituloVacio: string.

COMPORTAMIENTO:

Si la lista llega vacía (peliculas.length === 0):

Muestra el componente EstadoVacio de @/components/ui/EstadoVacio.

Le pasa tituloVacio y subtituloVacio.

Si hay películas:

Muestra una cuadrícula responsive de TarjetaPelicula.

Una columna en móvil.

Dos columnas en tablet (sm:).

Tres columnas en escritorio (lg:).

Utiliza un espacio adecuado entre tarjetas.

Cada tarjeta recibe una película y su key utiliza pelicula.id.

REGLAS:

NO lleva 'use client'.

No utiliza hooks.

No accede a la base de datos.

No importa Prisma como conexión.

No realiza operaciones de escritura.

Solo recibe props y organiza los componentes.