
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import  BotonBorrar  from '@/components/BotonBorrar'
import  BotonVista  from '@/components/BotonVista'
import { EnlaceVolver } from '@/components/nav/EnlaceVolver'
import { obtenerPeliculaPorId } from '@/lib/peliculas'

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  props: PageProps<'/peliculas/[id]'>
): Promise<Metadata> {
  const { id } = await props.params
  const pelicula = await obtenerPeliculaPorId(id)

  return {
    title: pelicula?.titulo ?? 'Película no encontrada',
  }
}

export default async function PaginaPelicula(
  props: PageProps<'/peliculas/[id]'>
) {
  const { id } = await props.params
  const pelicula = await obtenerPeliculaPorId(id)

  if (!pelicula) {
    notFound()
  }

  const fechaRegistro = pelicula.guardadaEn.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="min-h-screen bg-fondo px-4 py-8 text-texto">
      <div className="mx-auto max-w-3xl">
        <EnlaceVolver href="/">Volver</EnlaceVolver>

        <article className="mt-6 rounded-xl border border-borde bg-superficie p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                pelicula.vista
                  ? 'bg-exito/10 text-exito'
                  : 'bg-advertencia/10 text-advertencia'
              }`}
            >
              {pelicula.vista ? 'Vista' : 'Pendiente'}
            </span>

            <p className="text-sm text-texto-secundario">
              Añadida el {fechaRegistro}
            </p>
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-texto sm:text-4xl">
            {pelicula.titulo}
          </h1>

          <section className="mt-8">
            <h2 className="mb-3 text-lg font-semibold text-texto">
              Comentario
            </h2>

            <div className="rounded-lg bg-superficie-secundaria p-4">
              {pelicula.comentario ? (
                <p className="whitespace-pre-wrap text-texto-secundario">
                  {pelicula.comentario}
                </p>
              ) : (
                <p className="text-texto-terciario">
                  Esta película no tiene comentario
                </p>
              )}
            </div>
          </section>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-borde pt-6">
            <BotonVista id={pelicula.id} vista={pelicula.vista} />
            <BotonBorrar id={pelicula.id} />
          </div>
        </article>
      </div>
    </main>
  )
}
