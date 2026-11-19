# LAS 14 PETICIONES OPTIMIZADAS — PROYECTO VIDEOTECA

**IMPORTANTE:** Todas las peticiones siguientes deben ejecutarse utilizando el PROMPT MAESTRO DE VIDEOTECA como referencia obligatoria. Sus 14 reglas tienen prioridad sobre cualquier decisión de implementación.

---

# PETICIÓN 1. FUNCIONES DE LECTURA DE PELÍCULAS

Siguiendo estrictamente las reglas del Prompt Maestro de Videoteca, créame el archivo:

`lib/peliculas.ts`

Este archivo pertenece a la capa 1 (lectura de la base de datos).

Mi modelo de Prisma es exactamente:

```prisma
model Pelicula {
  id          String   @id @default(cuid())
  titulo      String
  comentario  String?
  vista       Boolean  @default(false)
  guardadaEn  DateTime @default(now())
}
```

Necesito tres funciones:

1. `obtenerPeliculas()`
   - Devuelve todas las películas.
   - Ordenadas primero las pendientes (`vista: false`) y después las vistas (`vista: true`).
   - Dentro de cada grupo, las más recientes primero.
   - Utiliza exactamente:

```ts
orderBy: [{ vista: 'asc' }, { guardadaEn: 'desc' }]
```

2. `obtenerPeliculasVistas()`
   - Devuelve exclusivamente las películas que tienen `vista: true`.
   - Ordenadas por `guardadaEn: 'desc'`.

3. `obtenerPeliculaPorId(id: string)`
   - Busca una única película por su identificador.
   - Devuelve la película o `null` si no existe.
   - Utiliza `findUnique`.

REGLAS:
- Importa `prisma` exclusivamente desde `@/lib/prisma`.
- Importa el tipo `Pelicula` desde `@prisma/client` si es necesario.
- Son funciones `async` normales.
- Este archivo NO lleva ninguna directiva: ni `'use server'`, ni `'use client'`, ni `'use cache'`.
- No escribas ninguna operación de creación, modificación o borrado.
- No utilices `any`.

Dame la ruta completa, el código completo y una explicación breve de las tres funciones.

# PETICIÓN 2. SERVER ACTIONS PARA ESCRIBIR EN LA BASE DE DATOS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame el archivo:

`actions/acciones-peliculas.ts`

Este archivo pertenece a la capa 2 (escritura).

Necesito tres Server Actions:

**1. `crearPelicula(datosFormulario: FormData)`**

- Lee `titulo` y `comentario` del FormData.
- Valida que el título no esté vacío después de aplicar `trim()`.
- El título no puede superar los 80 caracteres.
- Si el título está vacío o supera los 80 caracteres, no crea nada y devuelve un resultado de error.
- Si `comentario` llega vacío después de aplicar `trim()`, guarda `null`.
- Si tiene contenido, guarda el comentario.
- El campo `vista` debe comenzar en `false`.
- `guardadaEn` debe establecerlo PostgreSQL mediante el valor por defecto del modelo.

**2. `alternarVista(id: string, vista: boolean)`**

- Recibe el identificador y el nuevo estado que se quiere guardar.
- Busca la película y comprueba que existe.
- Si no existe, devuelve un error.
- Actualiza el campo `vista` con el valor booleano recibido.
- El hook será quien calcule el nuevo estado a partir del estado actual.

**3. `borrarPelicula(id: string)`**

- Borra la película correspondiente al identificador.
- Si no existe o se produce un error, devuelve un resultado de error.

REGLAS ADICIONALES:

- El archivo empieza con `'use server'`.
- Exporta este tipo:

```ts
export type ResultadoAccion = {
  exito: boolean
  mensaje: string
}
```

- Las tres funciones deben devolver `Promise<ResultadoAccion>`.
- Envuelve cada operación de Prisma en `try/catch`.
- Devuelve mensajes de éxito y error en español.
- Importa `prisma` exclusivamente desde `@/lib/prisma`.
- Importa `revalidatePath` desde `next/cache`.
- Tras crear, utiliza `revalidatePath('/')`.
- Tras modificar el estado de una película, utiliza:
  - `revalidatePath('/')`
  - `revalidatePath('/vistas')`
  - `revalidatePath('/peliculas/' + id)`
- Tras borrar, utiliza las mismas tres rutas.
- No importes hooks ni componentes.
- No utilices `any`.

Explícame por qué hay que utilizar `revalidatePath()` y por qué cada operación invalida esas rutas concretas.

# PETICIÓN 3. BOTÓN REUTILIZABLE

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

`components/ui/Boton.tsx`

Un botón reutilizable que utilizaremos en toda la aplicación.

PROPS:

- `variante`: `'primario' | 'peligro' | 'fantasma'`, por defecto `'primario'`.
- `cargando`: boolean. Cuando sea `true`:
  - Muestra el icono `Loader2` de lucide-react.
  - El icono gira utilizando `animate-spin`.
  - El botón queda deshabilitado.
- `icono`: un componente de icono de lucide-react, opcional.
- Todas las props nativas de un botón HTML (`type`, `disabled`, `onClick`, `className`, etc.), extendiendo `React.ComponentProps<'button'>`.

REGLAS:

- No lleva `'use client'`.
- No utiliza hooks.
- No tiene estado propio.
- No contiene lógica de negocio.
- Solo recibe props y devuelve JSX.
- Utiliza `LucideIcon` para tipar el icono, importándolo de `lucide-react`.
- Usa exclusivamente los colores de la paleta de la regla 14.
- Combina las clases de forma que se puedan añadir clases externas mediante `className`.
- La variante `peligro` debe utilizar el color semántico `error`, no colores de Tailwind.
- No uses SVG a mano.

Explícame en una línea por qué, aunque se utilice dentro de componentes `'use client'`, este archivo no necesita la directiva.

# PETICIÓN 4. COMPONENTE ESTADO VACÍO

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

`components/ui/EstadoVacio.tsx`

Es el componente que se muestra cuando no hay películas que enseñar.

PROPS:

- `titulo: string`
- `subtitulo: string`

Debe mostrar:

- Un icono grande de lucide-react. Utiliza `Film`.
- El icono debe tener el color `text-texto-terciario`.
- Debajo, el título.
- Debajo, el subtítulo.
- Todo centrado vertical y horizontalmente.
- Buen espaciado.
- Un diseño moderno y limpio.

REGLAS:

- No lleva `'use client'`.
- No utiliza hooks.
- No importa nada de `@/hooks` ni de `@/lib`.
- Solo pinta las props que recibe.
- Utiliza exclusivamente los colores de la paleta.
- El icono decorativo debe llevar `aria-hidden="true"`.

Lo reutilizaremos en la página principal y en la página de vistas, por eso los textos deben recibirse mediante props.

Dame el archivo completo y explica brevemente por qué pertenece a `components/ui/`.

# PETICIÓN 5. FORMULARIO PARA AÑADIR PELÍCULAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame DOS archivos, en este orden:

Primero `hooks/useFormularioPelicula.ts` y después `components/inicio/FormularioPelicula.tsx`.

Dame cada uno con su ruta y su código completo.

## ARCHIVO 1: hooks/useFormularioPelicula.ts

Pertenece a la capa 3.

Lleva `'use client'`.

Exporta:

```ts
export const MAX_TITULO = 80
```

Y la función:

`useFormularioPelicula()`

Debe devolver:

`{ enviando, caracteres, formularioRef, tituloRef, contarCaracteres, manejarEnvio }`

Es el ÚNICO sitio que llama a `crearPelicula` de `@/actions/acciones-peliculas` y el único que utiliza toast de sonner para este formulario.

FUNCIONAMIENTO:

- `manejarEnvio(evento)`:
  - Ejecuta `evento.preventDefault()`.
  - Construye el FormData con `new FormData(evento.currentTarget)`.
  - Llama con `await` a `crearPelicula(datosFormulario)`.

- useState número 1:
  - `enviando` (boolean).
  - Ponlo a `true` antes del await y a `false` después.

- useState número 2:
  - `caracteres` (number).
  - La función `contarCaracteres` actualiza el número de caracteres del título.
  - Se utilizará desde el `onChange` del input.

- useRef número 1:
  - `formularioRef`, referencia al formulario.
  - Si la creación tiene éxito, limpia el formulario mediante:

```ts
formularioRef.current?.reset()
```

- useRef número 2:
  - `tituloRef`, referencia al input del título.

- useEffect:
  - Al montar el formulario, coloca automáticamente el foco en el input del título.

- Tras el await:
  - Si `resultado.exito` es `true`, muestra `toast.success(resultado.mensaje)`, limpia el formulario y pone el contador a 0.
  - Si `resultado.exito` es `false`, muestra `toast.error(resultado.mensaje)`.

- Si se produce una excepción inesperada, gestiona el error y evita dejar `enviando` permanentemente en `true`.

IMPORTANTE: explica por qué NO se debe utilizar `evento.currentTarget.reset()` después del await y por qué necesitamos conservar la referencia al formulario con `useRef`.

Solo puedes utilizar `useState`, `useRef` y `useEffect`.

## ARCHIVO 2: components/inicio/FormularioPelicula.tsx

Pertenece a la capa 4.

Lleva `'use client'`.

NO utiliza `useState`, `useRef`, `useEffect` ni toast.

NO importa nada de `@/actions`.

Solo llama a:

`useFormularioPelicula()` de `@/hooks/useFormularioPelicula`

Y pinta lo que devuelve.

ELEMENTOS:

1. Un formulario:

```tsx
<form ref={formularioRef} onSubmit={manejarEnvio}>
```

2. Un input:

- `name="titulo"`.
- `ref={tituloRef}`.
- `maxLength={MAX_TITULO}`.
- `placeholder="Título de la película o serie"`.
- `onChange={contarCaracteres}`.
- Obligatorio.

3. Debajo del input, un contador:

`caracteres/MAX_TITULO`

Cuando llegue a 80 caracteres, debe utilizar `text-error`. Antes, debe utilizar un color de la paleta adecuado.

4. Un textarea:

- `name="comentario"`.
- Tres filas.
- `placeholder="Comentario (opcional)"`.

5. El botón de enviar:
- Componente `Boton` de `@/components/ui/Boton`.
- Icono `Plus` de lucide-react.
- Texto «Añadir a mi videoteca».
- `cargando={enviando}`.

El componente solo conecta los eventos y pinta. No debe contener lógica de negocio.

# PETICIÓN 6. BOTÓN PARA BORRAR PELÍCULAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame DOS archivos, en este orden:

Primero `hooks/useBorrarPelicula.ts` y después `components/BotonBorrar.tsx`.

Dame cada uno con su ruta y su código completo.

## ARCHIVO 1: hooks/useBorrarPelicula.ts

Pertenece a la capa 3.

Lleva `'use client'`.

Exporta:

`useBorrarPelicula(id: string)`

Devuelve:

`{ armado, borrando, manejarClic }`

Es el ÚNICO sitio que llama a `borrarPelicula` de `@/actions/acciones-peliculas` y el único que utiliza toast de sonner para borrar películas.

COMPORTAMIENTO DE CONFIRMACIÓN DE DOS CLICS:

- useState número 1:
  - `armado` (boolean).
  - El primer clic pone `armado` a `true`.
  - El segundo clic, cuando `armado` ya es `true`, inicia el borrado.

- useState número 2:
  - `borrando` (boolean).
  - Es `true` mientras dura la llamada a la Server Action.

- useRef:
  - Guarda el identificador del temporizador.

- useEffect:
  - Cuando `armado` sea `true`, crea un `setTimeout` de 3 segundos.
  - Si pasan los 3 segundos sin un segundo clic, vuelve `armado` a `false`.
  - Guarda el identificador del temporizador en el `useRef`.
  - Limpia el temporizador con `clearTimeout` en la función de limpieza del efecto.

- Segundo clic:
  - Llama con `await` a `borrarPelicula(id)`.
  - Si el resultado tiene éxito, muestra `toast.success`.
  - Si falla, muestra `toast.error`.
  - Restablece los estados correspondientes.

- Gestiona también las excepciones inesperadas para que `borrando` no se quede permanentemente en `true`.

EXPLÍCAME por qué es necesaria la limpieza del temporizador y qué problemas podría provocar no hacerla.

Solo puedes utilizar `useState`, `useRef` y `useEffect`.

## ARCHIVO 2: components/BotonBorrar.tsx

Pertenece a la capa 4.

Lleva `'use client'`.

Recibe:

`id: string`

NO utiliza hooks propios ni toast.

NO importa nada de `@/actions`.

Solo llama a:

`useBorrarPelicula(id)` de `@/hooks/useBorrarPelicula`.

Utiliza el componente `Boton` de `@/components/ui/Boton` con:

- `variante="peligro"`.
- Icono `Trash2` de lucide-react.
- `cargando={borrando}`.
- `onClick={manejarClic}`.
- Texto «Borrar», que cambia a «¿Seguro?» cuando `armado` sea `true`.

El botón debe deshabilitarse mientras se está borrando.

# PETICIÓN 7. BOTÓN PARA MARCAR PELÍCULAS COMO VISTAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame DOS archivos, en este orden:

Primero `hooks/useAlternarVista.ts` y después `components/BotonVista.tsx`.

Dame cada uno con su ruta y su código completo.

## ARCHIVO 1: hooks/useAlternarVista.ts

Pertenece a la capa 3.

Lleva `'use client'`.

Exporta:

`useAlternarVista(id: string, vista: boolean)`

Devuelve:

`{ cargando, manejarClic }`

Es el ÚNICO sitio que llama a `alternarVista` de `@/actions/acciones-peliculas` y el único que utiliza toast de sonner para esta operación.

FUNCIONAMIENTO:

- useState:
  - `cargando` (boolean).
  - Es `true` mientras dura la acción.

- `manejarClic`:
  - Es una función `async`.
  - Calcula el nuevo estado: `!vista`.
  - Llama con `await` a `alternarVista(id, !vista)`.
  - Muestra `toast.success(resultado.mensaje)` si tiene éxito.
  - Muestra `toast.error(resultado.mensaje)` si falla.
  - Restablece `cargando` a `false` en todos los casos.

- Gestiona también las excepciones inesperadas.

Solo puedes utilizar los hooks permitidos.

## ARCHIVO 2: components/BotonVista.tsx

Pertenece a la capa 4.

Lleva `'use client'`.

Recibe dos props:

- `id: string`.
- `vista: boolean`.

NO utiliza hooks propios ni toast.

NO importa nada de `@/actions`.

Solo llama a:

`useAlternarVista(id, vista)` de `@/hooks/useAlternarVista`.

DISEÑO Y COMPORTAMIENTO:

- Si `vista` es `false`, muestra el icono `Eye` y el texto «Marcar como vista».
- Si `vista` es `true`, muestra el icono `EyeOff` y el texto «Marcar como pendiente».
- El botón llama a `manejarClic` al hacer clic.
- Se deshabilita mientras `cargando` sea `true`.
- Utiliza el componente `Boton` de `@/components/ui/Boton`.
- Utiliza exclusivamente colores de la paleta.
- Añade un `aria-label` descriptivo según el estado actual.

# PETICIÓN 8. TARJETA DE PELÍCULA

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

`components/TarjetaPelicula.tsx`

Pertenece a la capa 4.

Recibe una prop:

`pelicula: Pelicula`

El tipo `Pelicula` debe importarse desde `@prisma/client`.

Debe mostrar, dentro de una tarjeta con bordes redondeados y sombra suave:

1. El título:
   - Como un componente `Link` de `next/link`.
   - Debe llevar a `/peliculas/${pelicula.id}`.

2. El comentario:
   - Solo se muestra si existe.
   - Se recorta a dos líneas mediante `line-clamp-2`.

3. La fecha:
   - Se obtiene de `pelicula.guardadaEn`.
   - Se formatea en español:

```ts
pelicula.guardadaEn.toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
```

4. El botón de vista:
   - Componente `BotonVista` de `@/components/BotonVista`.
   - Recibe `id` y `vista`.

5. El botón de borrar:
   - Componente `BotonBorrar` de `@/components/BotonBorrar`.
   - Recibe `id`.

6. El aspecto de la tarjeta:
   - Las películas pendientes deben distinguirse visualmente de las vistas.
   - Las vistas deben tener un aspecto más discreto.
   - No uses colores prohibidos ni variantes `dark:`.

IMPORTANTE:

- NO lleva `'use client'`.
- Es un Server Component que simplemente coloca dentro los dos botones, que sí son de cliente.
- No importa hooks, actions ni prisma.
- No realiza operaciones de base de datos.

Explícame por qué un Server Component puede incluir componentes que llevan `'use client'` sin provocar errores.

# PETICIÓN 9. LISTA DE PELÍCULAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

`components/ListaPeliculas.tsx`

Pertenece a la capa 4.

PROPS:

- `peliculas: Pelicula[]` (tipo importado de `@prisma/client`).
- `tituloVacio: string`.
- `subtituloVacio: string`.

COMPORTAMIENTO:

1. Si la lista llega vacía (`peliculas.length === 0`):
   - Muestra el componente `EstadoVacio` de `@/components/ui/EstadoVacio`.
   - Le pasa `tituloVacio` y `subtituloVacio`.

2. Si hay películas:
   - Muestra una cuadrícula responsive de `TarjetaPelicula`.
   - Una columna en móvil.
   - Dos columnas en tablet (`sm:`).
   - Tres columnas en escritorio (`lg:`).
   - Utiliza un espacio adecuado entre tarjetas.

3. Cada tarjeta recibe una película y su `key` utiliza `pelicula.id`.

REGLAS:

- NO lleva `'use client'`.
- No utiliza hooks.
- No accede a la base de datos.
- No importa Prisma como conexión.
- No realiza operaciones de escritura.
- Solo recibe props y organiza los componentes.

# PETICIÓN 10. PÁGINA PRINCIPAL DE VIDEOTECA

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

`app/page.tsx`

Es la página principal de la aplicación.

REQUISITOS:

- Es un Server Component `async`.
- NO lleva `'use client'`.
- Exporta:

```ts
export const dynamic = 'force-dynamic'
```

- Obtiene las películas mediante `obtenerPeliculas()` de `@/lib/peliculas`.
- Espera la lectura con `await`.
- No accede directamente a Prisma.

DEBE MOSTRAR:

1. Una cabecera:
   - Título «Mi videoteca».
   - Número total de películas.
   - Plural correcto:
     - «Ninguna película todavía».
     - «1 película».
     - «N películas».

2. El formulario:
   - Componente `FormularioPelicula` de `@/components/inicio/FormularioPelicula`.

3. La lista:
   - Componente `ListaPeliculas` de `@/components/ListaPeliculas`.
   - Le pasa `peliculas`.
   - Estado vacío:
     - Título: «Tu videoteca está vacía».
     - Subtítulo: «Añade una película o serie que quieras ver».

DISEÑO:

- Contenedor centrado.
- Ancho máximo similar a `max-w-4xl`.
- Padding horizontal para que no se pegue a los bordes en móvil.
- Buen espaciado vertical.
- Colores exclusivamente de la paleta.

Explícame por qué es necesario `export const dynamic = 'force-dynamic'` en esta página y qué garantiza.

# PETICIÓN 11. NAVEGACIÓN, FONDO Y NOTIFICACIONES

Siguiendo el Prompt Maestro de Videoteca, necesito adaptar la navegación y el layout.

Primero revisa los archivos existentes del proyecto de Notas que se van a copiar. No inventes componentes ni modifiques la estructura.

Necesito trabajar con estos dos archivos:

## ARCHIVO 1: components/nav/BarraNavegacion.tsx

Adapta la barra de navegación del proyecto de Notas para Videoteca.

Debe mostrar:

- Nombre de la aplicación: «Videoteca».
- Enlace a `/` con el texto «Mi videoteca».
- Enlace a `/vistas` con el texto «Vistas».
- Iconos de lucide-react apropiados.
- Diseño responsive.
- Colores exclusivamente de la paleta.

No añadas enlaces a rutas que no existen.

## ARCHIVO 2: app/layout.tsx

Adapta el layout del proyecto de Notas para Videoteca.

Debe incluir:

- Metadata:
  - Título: «Videoteca».
  - Descripción: «Tu lista de películas y series pendientes».
- La barra de navegación.
- El componente `<Toaster />` de sonner UNA SOLA VEZ.
- La estructura global del layout.
- El fondo general de la aplicación utilizando la paleta.

REGLAS:

- `app/layout.tsx` NO lleva `'use client'`.
- No modifiques `app/globals.css`.
- No modifiques `next.config.ts`.
- No añadas una segunda instancia de Toaster.
- No cambies las versiones ni instales librerías.

Dame ambos archivos completos, en el orden indicado, con sus rutas y explicaciones.

# PETICIÓN 12. PÁGINA DE DETALLE DE UNA PELÍCULA

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

`app/peliculas/[id]/page.tsx`

Es la página de detalle de una película.

REQUISITOS:

- Es un Server Component `async`.
- NO lleva `'use client'`.
- Exporta:

```ts
export const dynamic = 'force-dynamic'
```

ATENCIÓN, regla 6:

Declara la función exactamente así:

```tsx
export default async function PaginaPelicula(
  props: PageProps<'/peliculas/[id]'>
) {
  const { id } = await props.params
}
```

No importes `PageProps`: es un tipo global.

BÚSQUEDA:

- Busca la película con `obtenerPeliculaPorId(id)` de `@/lib/peliculas`.
- Espera el resultado con `await`.
- Si devuelve `null`, llama a `notFound()` importado de `next/navigation`.

SI EXISTE, MUESTRA:

1. Arriba, el componente `EnlaceVolver` de `@/components/nav/EnlaceVolver`.
   - Recibe `href="/"`.
   - Texto «Volver».
   - No escribas otro enlace de volver ni dibujes el icono ArrowLeft manualmente.

2. El título de la película como encabezado grande.

3. El estado:
   - «Vista» si `pelicula.vista` es `true`.
   - «Pendiente» si es `false`.

4. La fecha de registro:
   - Utiliza `pelicula.guardadaEn`.
   - Formatea la fecha en español con `toLocaleDateString('es-ES', ...)`.

5. El comentario:
   - Muestra el comentario completo respetando los saltos de línea mediante `whitespace-pre-wrap`.
   - Si está vacío o es `null`, muestra «Esta película no tiene comentario».

6. Los botones:
   - `BotonVista`.
   - `BotonBorrar`.

Ambos reciben los datos correspondientes de la película.

METADATA:

Exporta también `generateMetadata` para que el título de la pestaña sea el título de la película.

IMPORTANTE:
- `generateMetadata` también recibe `params` como promesa.
- Espera `params` con `await`.
- Obtiene la película utilizando `obtenerPeliculaPorId`.
- Si no existe, utiliza un título genérico apropiado.
- No importes Prisma directamente.

Explícame qué hace exactamente `notFound()` y por qué se utiliza cuando el identificador no existe.

# PETICIÓN 13. PÁGINA DE PELÍCULAS VISTAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

`app/vistas/page.tsx`

Es la página que muestra exclusivamente las películas que ya hemos visto.

Es prácticamente igual que `app/page.tsx`, pero con estas diferencias:

- Utiliza `obtenerPeliculasVistas()` de `@/lib/peliculas` en lugar de `obtenerPeliculas()`.
- El título principal es «Películas vistas».
- NO incluye el formulario de creación.
- Muestra el número de películas vistas, con el plural correcto.
- Utiliza `ListaPeliculas` de `@/components/ListaPeliculas`.
- Los textos del estado vacío son:
  - Título: «Todavía no has visto ninguna».
  - Subtítulo: «Cuando marques una película como vista, aparecerá aquí».

REGLAS:

- Es un Server Component `async`.
- NO lleva `'use client'`.
- Exporta:

```ts
export const dynamic = 'force-dynamic'
```

- Exporta metadata con el título «Películas vistas».
- Espera la lectura con `await`.
- No accede directamente a Prisma.
- Utiliza exclusivamente colores de la paleta.

Dame el archivo completo y explícame por qué esta página utiliza una función de lectura diferente de la página principal.

# PETICIÓN 14. PULIDO VISUAL DE VIDEOTECA

Todo funciona correctamente. Ahora quiero mejorar el diseño visual de la aplicación siguiendo estrictamente el Prompt Maestro de Videoteca.

Quiero:

- Un aspecto más moderno y cuidado.
- Tarjetas con mejor acabado.
- Transiciones suaves al pasar el ratón por las tarjetas.
- Mejor jerarquía tipográfica.
- Mejor espaciado.
- Botones visualmente más cuidados.
- Formularios más claros y agradables.
- Mejor adaptación a móviles.
- Diferenciación visual clara entre películas pendientes y vistas.

IMPORTANTE SOBRE LOS COLORES:

La paleta de la regla 14 ya resuelve los colores y el modo oscuro funciona automáticamente.

Por tanto:

- NO cambies ningún color.
- NO añadas variantes `dark:`.
- NO toques `app/globals.css`.
- NO utilices colores de Tailwind fuera de la paleta.
- Si necesitas matizar un color, utiliza la opacidad de un color permitido.

TRABAJA EXCLUSIVAMENTE CON:

- Espaciado.
- Padding y margin.
- Bordes redondeados.
- Sombras.
- Transiciones.
- Tamaños.
- Pesos de letra.
- Distribución de elementos.
- Clases responsive.

REGLAS IMPORTANTES:

- NO cambies ninguna lógica.
- NO cambies imports.
- NO cambies nombres de funciones.
- NO cambies nombres de componentes.
- NO cambies props.
- NO añadas ni elimines funcionalidades.
- NO cambies las cuatro capas.
- NO modifiques los hooks ni las Server Actions.

Dime archivo por archivo qué clases de Tailwind debo cambiar.

Para cada archivo:

1. Indica su ruta completa.
2. Identifica las clases actuales que debo localizar.
3. Indica las clases nuevas que debo utilizar.
4. Explica brevemente la mejora visual.

No reescribas innecesariamente los archivos completos: quiero modificar únicamente las clases de estilo.

El resultado debe ser una Videoteca moderna, limpia, profesional, responsive y coherente tanto en modo claro como en modo oscuro.

---

# INSTRUCCIÓN FINAL PARA LAS 14 PETICIONES

Estas 14 peticiones se ejecutan en orden, sin saltarse ninguna fase.

Después de cada petición:

1. Revisa que el código cumple las 14 reglas del Prompt Maestro.
2. Comprueba los imports.
3. Comprueba las rutas.
4. Comprueba que no se han saltado las cuatro capas.
5. Comprueba que no hay hooks prohibidos.
6. Comprueba que no hay colores prohibidos.
7. Comprueba que no se han utilizado nombres en inglés.
8. Comprueba que el archivo no contradice los archivos anteriores.
9. Explica cualquier decisión técnica importante.

No adelantes archivos de peticiones posteriores.

No inventes archivos existentes ni supongas que una operación se ha realizado correctamente si no se ha comprobado.

**ESTAMOS CONSTRUYENDO VIDEOTECA. NO NOTAS.**