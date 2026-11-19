PETICIÓN 10. PÁGINA PRINCIPAL DE VIDEOTECA

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

app/page.tsx

Es la página principal de la aplicación.

REQUISITOS:

Es un Server Component async.

NO lleva 'use client'.

Exporta:

export const dynamic = 'force-dynamic'

Obtiene las películas mediante obtenerPeliculas() de @/lib/peliculas.

Espera la lectura con await.

No accede directamente a Prisma.

DEBE MOSTRAR:

Una cabecera:

Título «Mi videoteca».

Número total de películas.

Plural correcto:

«Ninguna película todavía».

«1 película».

«N películas».

El formulario:

Componente FormularioPelicula de @/components/inicio/FormularioPelicula.

La lista:

Componente ListaPeliculas de @/components/ListaPeliculas.

Le pasa peliculas.

Estado vacío:

Título: «Tu videoteca está vacía».

Subtítulo: «Añade una película o serie que quieras ver».

DISEÑO:

Contenedor centrado.

Ancho máximo similar a max-w-4xl.

Padding horizontal para que no se pegue a los bordes en móvil.

Buen espaciado vertical.

Colores exclusivamente de la paleta.

Explícame por qué es necesario export const dynamic = 'force-dynamic' en esta página y qué garantiza.