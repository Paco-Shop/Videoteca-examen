PETICIÓN 8. TARJETA DE PELÍCULA

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

components/TarjetaPelicula.tsx

Pertenece a la capa 4.

Recibe una prop:

pelicula: Pelicula

El tipo Pelicula debe importarse desde @prisma/client.

Debe mostrar, dentro de una tarjeta con bordes redondeados y sombra suave:

El título:

Como un componente Link de next/link.

Debe llevar a /peliculas/${pelicula.id}.

El comentario:

Solo se muestra si existe.

Se recorta a dos líneas mediante line-clamp-2.

La fecha:

Se obtiene de pelicula.guardadaEn.

Se formatea en español:

pelicula.guardadaEn.toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

El botón de vista:

Componente BotonVista de @/components/BotonVista.

Recibe id y vista.

El botón de borrar:

Componente BotonBorrar de @/components/BotonBorrar.

Recibe id.

El aspecto de la tarjeta:

Las películas pendientes deben distinguirse visualmente de las vistas.

Las vistas deben tener un aspecto más discreto.

No uses colores prohibidos ni variantes dark:.

IMPORTANTE:

NO lleva 'use client'.

Es un Server Component que simplemente coloca dentro los dos botones, que sí son de cliente.

No importa hooks, actions ni prisma.

No realiza operaciones de base de datos.

Explícame por qué un Server Component puede incluir componentes que llevan 'use client' sin provocar errores.