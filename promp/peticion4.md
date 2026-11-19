PETICIÓN 4. COMPONENTE ESTADO VACÍO

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

components/ui/EstadoVacio.tsx

Es el componente que se muestra cuando no hay películas que enseñar.

PROPS:

titulo: string

subtitulo: string

Debe mostrar:

Un icono grande de lucide-react. Utiliza Film.

El icono debe tener el color text-texto-terciario.

Debajo, el título.

Debajo, el subtítulo.

Todo centrado vertical y horizontalmente.

Buen espaciado.

Un diseño moderno y limpio.

REGLAS:

No lleva 'use client'.

No utiliza hooks.

No importa nada de @/hooks ni de @/lib.

Solo pinta las props que recibe.

Utiliza exclusivamente los colores de la paleta.

El icono decorativo debe llevar aria-hidden="true".

Lo reutilizaremos en la página principal y en la página de vistas, por eso los textos deben recibirse mediante props.

Dame el archivo completo y explica brevemente por qué pertenece a components/ui/.