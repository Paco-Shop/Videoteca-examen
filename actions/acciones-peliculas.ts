
'use server'

import { revalidatePath } from 'next/cache'
import  prisma  from '@/lib/prisma'

export type ResultadoAccion = {
  exito: boolean
  mensaje: string
}

// Crea una película nueva.
export async function crearPelicula(
  datosFormulario: FormData
): Promise<ResultadoAccion> {
  const tituloRecibido = datosFormulario.get('titulo')
  const comentarioRecibido = datosFormulario.get('comentario')

  const titulo =
    typeof tituloRecibido === 'string' ? tituloRecibido.trim() : ''

  const comentario =
    typeof comentarioRecibido === 'string'
      ? comentarioRecibido.trim()
      : ''

  if (!titulo) {
    return {
      exito: false,
      mensaje: 'El título no puede estar vacío.',
    }
  }

  if (titulo.length > 80) {
    return {
      exito: false,
      mensaje: 'El título no puede superar los 80 caracteres.',
    }
  }

  try {
    await prisma.pelicula.create({
      data: {
        titulo,
        comentario: comentario || null,
        vista: false,
      },
    })

    revalidatePath('/')

    return {
      exito: true,
      mensaje: 'Película añadida correctamente.',
    }
  } catch {
    return {
      exito: false,
      mensaje: 'No se ha podido añadir la película.',
    }
  }
}

// Cambia el estado de una película.
export async function alternarVista(
  id: string,
  vista: boolean
): Promise<ResultadoAccion> {
  try {
    const pelicula = await prisma.pelicula.findUnique({
      where: { id },
    })

    if (!pelicula) {
      return {
        exito: false,
        mensaje: 'No se ha encontrado la película.',
      }
    }

    await prisma.pelicula.update({
      where: { id },
      data: { vista },
    })

    revalidatePath('/')
    revalidatePath('/vistas')
    revalidatePath('/peliculas/' + id)

    return {
      exito: true,
      mensaje: vista
        ? 'Película marcada como vista.'
        : 'Película marcada como pendiente.',
    }
  } catch {
    return {
      exito: false,
      mensaje: 'No se ha podido cambiar el estado de la película.',
    }
  }
}

// Borra una película por su identificador.
export async function borrarPelicula(
  id: string
): Promise<ResultadoAccion> {
  try {
    const pelicula = await prisma.pelicula.findUnique({
      where: { id },
    })

    if (!pelicula) {
      return {
        exito: false,
        mensaje: 'No se ha encontrado la película.',
      }
    }

    await prisma.pelicula.delete({
      where: { id },
    })

    revalidatePath('/')
    revalidatePath('/vistas')
    revalidatePath('/peliculas/' + id)

    return {
      exito: true,
      mensaje: 'Película borrada correctamente.',
    }
  } catch {
    return {
      exito: false,
      mensaje: 'No se ha podido borrar la película.',
    }
  }
}
