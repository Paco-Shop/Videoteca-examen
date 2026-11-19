PETICIÓN 12. PÁGINA DE DETALLE DE UNA PELÍCULA

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

app/peliculas/[id]/page.tsx

Es la página de detalle de una película.

REQUISITOS:

Es un Server Component async.

NO lleva 'use client'.

Exporta:

export const dynamic = 'force-dynamic'

ATENCIÓN, regla 6:

Declara la función exactamente así:

export default async function PaginaPelicula(
  props: PageProps<'/peliculas/[id]'>
) {
  const { id } = await props.params
}

No importes PageProps: es un tipo global.

BÚSQUEDA:

Busca la película con obtenerPeliculaPorId(id) de @/lib/peliculas.

Espera el resultado con await.

Si devuelve null, llama a notFound() importado de next/navigation.

SI EXISTE, MUESTRA:

Arriba, el componente EnlaceVolver de @/components/nav/EnlaceVolver.

Recibe href="/".

Texto «Volver».

No escribas otro enlace de volver ni dibujes el icono ArrowLeft manualmente.

El título de la película como encabezado grande.

El estado:

«Vista» si pelicula.vista es true.

«Pendiente» si es false.

La fecha de registro:

Utiliza pelicula.guardadaEn.

Formatea la fecha en español con toLocaleDateString('es-ES', ...).

El comentario:

Muestra el comentario completo respetando los saltos de línea mediante whitespace-pre-wrap.

Si está vacío o es null, muestra «Esta película no tiene comentario».

Los botones:

BotonVista.

BotonBorrar.

Ambos reciben los datos correspondientes de la película.

METADATA:

Exporta también generateMetadata para que el título de la pestaña sea el título de la película.

IMPORTANTE:

generateMetadata también recibe params como promesa.

Espera params con await.

Obtiene la película utilizando obtenerPeliculaPorId.

Si no existe, utiliza un título genérico apropiado.

No importes Prisma directamente.

Explícame qué hace exactamente notFound() y por qué se utiliza cuando el identificador no existe.