PETICIÓN 7. BOTÓN PARA MARCAR PELÍCULAS COMO VISTAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame DOS archivos, en este orden:

Primero hooks/useAlternarVista.ts y después components/BotonVista.tsx.

Dame cada uno con su ruta y su código completo.

ARCHIVO 1: hooks/useAlternarVista.ts

Pertenece a la capa 3.

Lleva 'use client'.

Exporta:

useAlternarVista(id: string, vista: boolean)

Devuelve:

{ cargando, manejarClic }

Es el ÚNICO sitio que llama a alternarVista de @/actions/acciones-peliculas y el único que utiliza toast de sonner para esta operación.

FUNCIONAMIENTO:

useState:

cargando (boolean).

Es true mientras dura la acción.

manejarClic:

Es una función async.

Calcula el nuevo estado: !vista.

Llama con await a alternarVista(id, !vista).

Muestra toast.success(resultado.mensaje) si tiene éxito.

Muestra toast.error(resultado.mensaje) si falla.

Restablece cargando a false en todos los casos.

Gestiona también las excepciones inesperadas.

Solo puedes utilizar los hooks permitidos.

ARCHIVO 2: components/BotonVista.tsx

Pertenece a la capa 4.

Lleva 'use client'.

Recibe dos props:

id: string.

vista: boolean.

NO utiliza hooks propios ni toast.

NO importa nada de @/actions.

Solo llama a:

useAlternarVista(id, vista) de @/hooks/useAlternarVista.

DISEÑO Y COMPORTAMIENTO:

Si vista es false, muestra el icono Eye y el texto «Marcar como vista».

Si vista es true, muestra el icono EyeOff y el texto «Marcar como pendiente».

El botón llama a manejarClic al hacer clic.

Se deshabilita mientras cargando sea true.

Utiliza el componente Boton de @/components/ui/Boton.

Utiliza exclusivamente colores de la paleta.

Añade un aria-label descriptivo según el estado actual.