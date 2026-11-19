PETICIÓN 5. FORMULARIO PARA AÑADIR PELÍCULAS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame DOS archivos, en este orden:

Primero hooks/useFormularioPelicula.ts y después components/inicio/FormularioPelicula.tsx.

Dame cada uno con su ruta y su código completo.

ARCHIVO 1: hooks/useFormularioPelicula.ts

Pertenece a la capa 3.

Lleva 'use client'.

Exporta:

export const MAX_TITULO = 80

Y la función:

useFormularioPelicula()

Debe devolver:

{ enviando, caracteres, formularioRef, tituloRef, contarCaracteres, manejarEnvio }

Es el ÚNICO sitio que llama a crearPelicula de @/actions/acciones-peliculas y el único que utiliza toast de sonner para este formulario.

FUNCIONAMIENTO:

manejarEnvio(evento):

Ejecuta evento.preventDefault().

Construye el FormData con new FormData(evento.currentTarget).

Llama con await a crearPelicula(datosFormulario).

useState número 1:

enviando (boolean).

Ponlo a true antes del await y a false después.

useState número 2:

caracteres (number).

La función contarCaracteres actualiza el número de caracteres del título.

Se utilizará desde el onChange del input.

useRef número 1:

formularioRef, referencia al formulario.

Si la creación tiene éxito, limpia el formulario mediante:

formularioRef.current?.reset()

useRef número 2:

tituloRef, referencia al input del título.

useEffect:

Al montar el formulario, coloca automáticamente el foco en el input del título.

Tras el await:

Si resultado.exito es true, muestra toast.success(resultado.mensaje), limpia el formulario y pone el contador a 0.

Si resultado.exito es false, muestra toast.error(resultado.mensaje).

Si se produce una excepción inesperada, gestiona el error y evita dejar enviando permanentemente en true.

IMPORTANTE: explica por qué NO se debe utilizar evento.currentTarget.reset() después del await y por qué necesitamos conservar la referencia al formulario con useRef.

Solo puedes utilizar useState, useRef y useEffect.

ARCHIVO 2: components/inicio/FormularioPelicula.tsx

Pertenece a la capa 4.

Lleva 'use client'.

NO utiliza useState, useRef, useEffect ni toast.

NO importa nada de @/actions.

Solo llama a:

useFormularioPelicula() de @/hooks/useFormularioPelicula

Y pinta lo que devuelve.

ELEMENTOS:

Un formulario:

<form ref={formularioRef} onSubmit={manejarEnvio}>

Un input:

name="titulo".

ref={tituloRef}.

maxLength={MAX_TITULO}.

placeholder="Título de la película o serie".

onChange={contarCaracteres}.

Obligatorio.

Debajo del input, un contador:

caracteres/MAX_TITULO

Cuando llegue a 80 caracteres, debe utilizar text-error. Antes, debe utilizar un color de la paleta adecuado.

Un textarea:

name="comentario".

Tres filas.

placeholder="Comentario (opcional)".

El botón de enviar:

Componente Boton de @/components/ui/Boton.

Icono Plus de lucide-react.

Texto «Añadir a mi videoteca».

cargando={enviando}.

El componente solo conecta los eventos y pinta. No debe contener lógica de negocio.