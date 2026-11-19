PETICIÓN 6. BOTÓN PARA BORRAR PELÍCULAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame DOS archivos, en este orden:

Primero hooks/useBorrarPelicula.ts y después components/BotonBorrar.tsx.

Dame cada uno con su ruta y su código completo.

ARCHIVO 1: hooks/useBorrarPelicula.ts

Pertenece a la capa 3.

Lleva 'use client'.

Exporta:

useBorrarPelicula(id: string)

Devuelve:

{ armado, borrando, manejarClic }

Es el ÚNICO sitio que llama a borrarPelicula de @/actions/acciones-peliculas y el único que utiliza toast de sonner para borrar películas.

COMPORTAMIENTO DE CONFIRMACIÓN DE DOS CLICS:

useState número 1:

armado (boolean).

El primer clic pone armado a true.

El segundo clic, cuando armado ya es true, inicia el borrado.

useState número 2:

borrando (boolean).

Es true mientras dura la llamada a la Server Action.

useRef:

Guarda el identificador del temporizador.

useEffect:

Cuando armado sea true, crea un setTimeout de 3 segundos.

Si pasan los 3 segundos sin un segundo clic, vuelve armado a false.

Guarda el identificador del temporizador en el useRef.

Limpia el temporizador con clearTimeout en la función de limpieza del efecto.

Segundo clic:

Llama con await a borrarPelicula(id).

Si el resultado tiene éxito, muestra toast.success.

Si falla, muestra toast.error.

Restablece los estados correspondientes.

Gestiona también las excepciones inesperadas para que borrando no se quede permanentemente en true.

EXPLÍCAME por qué es necesaria la limpieza del temporizador y qué problemas podría provocar no hacerla.

Solo puedes utilizar useState, useRef y useEffect.

ARCHIVO 2: components/BotonBorrar.tsx

Pertenece a la capa 4.

Lleva 'use client'.

Recibe:

id: string

NO utiliza hooks propios ni toast.

NO importa nada de @/actions.

Solo llama a:

useBorrarPelicula(id) de @/hooks/useBorrarPelicula.

Utiliza el componente Boton de @/components/ui/Boton con:

variante="peligro".

Icono Trash2 de lucide-react.

cargando={borrando}.

onClick={manejarClic}.

Texto «Borrar», que cambia a «¿Seguro?» cuando armado sea true.

El botón debe deshabilitarse mientras se está borrando.