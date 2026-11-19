PETICIÓN 2. SERVER ACTIONS PARA ESCRIBIR EN LA BASE DE DATOS

Siguiendo las reglas del Prompt Maestro de Videoteca, créame el archivo:

actions/acciones-peliculas.ts

Este archivo pertenece a la capa 2 (escritura).

Necesito tres Server Actions:

1. crearPelicula(datosFormulario: FormData)

Lee titulo y comentario del FormData.

Valida que el título no esté vacío después de aplicar trim().

El título no puede superar los 80 caracteres.

Si el título está vacío o supera los 80 caracteres, no crea nada y devuelve un resultado de error.

Si comentario llega vacío después de aplicar trim(), guarda null.

Si tiene contenido, guarda el comentario.

El campo vista debe comenzar en false.

guardadaEn debe establecerlo PostgreSQL mediante el valor por defecto del modelo.

2. alternarVista(id: string, vista: boolean)

Recibe el identificador y el nuevo estado que se quiere guardar.

Busca la película y comprueba que existe.

Si no existe, devuelve un error.

Actualiza el campo vista con el valor booleano recibido.

El hook será quien calcule el nuevo estado a partir del estado actual.

3. borrarPelicula(id: string)

Borra la película correspondiente al identificador.

Si no existe o se produce un error, devuelve un resultado de error.

REGLAS ADICIONALES:

El archivo empieza con 'use server'.

Exporta este tipo:

export type ResultadoAccion = {
  exito: boolean
  mensaje: string
}

Las tres funciones deben devolver Promise<ResultadoAccion>.

Envuelve cada operación de Prisma en try/catch.

Devuelve mensajes de éxito y error en español.

Importa prisma exclusivamente desde @/lib/prisma.

Importa revalidatePath desde next/cache.

Tras crear, utiliza revalidatePath('/').

Tras modificar el estado de una película, utiliza:

revalidatePath('/')

revalidatePath('/vistas')

revalidatePath('/peliculas/' + id)

Tras borrar, utiliza las mismas tres rutas.

No importes hooks ni componentes.

No utilices any.

Explícame por qué hay que utilizar revalidatePath() y por qué cada operación invalida esas rutas concretas.