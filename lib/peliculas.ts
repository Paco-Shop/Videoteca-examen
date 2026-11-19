
import  prisma  from '@/lib/prisma'
import type { Pelicula } from '@prisma/client'

// Devuelve todas las películas: primero las pendientes y después las vistas.
// Dentro de cada grupo, muestra primero las más recientes.
export async function obtenerPeliculas(): Promise<Pelicula[]> {
  return await prisma.pelicula.findMany({
    orderBy: [{ vista: 'asc' }, { guardadaEn: 'desc' }],
  })
}

// Devuelve exclusivamente las películas marcadas como vistas,
// ordenadas de la más reciente a la más antigua.
export async function obtenerPeliculasVistas(): Promise<Pelicula[]> {
  return await prisma.pelicula.findMany({
    where: { vista: true },
    orderBy: { guardadaEn: 'desc' },
  })
}

// Busca una película por su identificador.
// Devuelve la película encontrada o null si no existe.
export async function obtenerPeliculaPorId(
  id: string
): Promise<Pelicula | null> {
  return await prisma.pelicula.findUnique({
    where: { id },
  })
}
