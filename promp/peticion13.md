PETICIÓN 13. PÁGINA DE PELÍCULAS VISTAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

app/vistas/page.tsx

Es la página que muestra exclusivamente las películas que ya hemos visto.

Es prácticamente igual que app/page.tsx, pero con estas diferencias:

Utiliza obtenerPeliculasVistas() de @/lib/peliculas en lugar de obtenerPeliculas().

El título principal es «Películas vistas».

NO incluye el formulario de creación.

Muestra el número de películas vistas, con el plural correcto.

Utiliza ListaPeliculas de @/components/ListaPeliculas.

Los textos del estado vacío son:

Título: «Todavía no has visto ninguna».

Subtítulo: «Cuando marques una película como vista, aparecerá aquí».

REGLAS:

Es un Server Component async.

NO lleva 'use client'.

Exporta:

export const dynamic = 'force-dynamic'

Exporta metadata con el título «Películas vistas».

Espera la lectura con await.

No accede directamente a Prisma.

Utiliza exclusivamente colores de la paleta.

Dame el archivo completo y explícame por qué esta página utiliza una función de lectura diferente de la página principal.