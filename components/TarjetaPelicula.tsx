
import Link from 'next/link'
import type { Pelicula } from '@prisma/client'
import BotonVista from '@/components/BotonVista'
import BotonBorrar from '@/components/BotonBorrar'

type TarjetaPeliculaProps = {
  pelicula: Pelicula
}

export default function TarjetaPelicula({
  pelicula,
}: TarjetaPeliculaProps) {
  const fecha = pelicula.guardadaEn.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article
      className={`flex flex-col gap-4 rounded-xl border p-5 shadow-sm ${
        pelicula.vista
          ? 'border-borde bg-superficie-secundaria opacity-75'
          : 'border-borde-secundario bg-superficie'
      }`}
    >
      <div className="flex flex-col gap-2">
        <Link
          href={`/peliculas/${pelicula.id}`}
          className="text-lg font-semibold text-texto transition-colors hover:text-primario"
        >
          {pelicula.titulo}
        </Link>

        {pelicula.comentario && (
          <p className="line-clamp-2 text-sm leading-relaxed text-texto-secundario">
            {pelicula.comentario}
          </p>
        )}

        <p className="text-xs text-texto-terciario">
          Guardada el {fecha}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-borde pt-3">
        <BotonVista
          id={pelicula.id}
          vista={pelicula.vista}
        />

        <BotonBorrar id={pelicula.id} />
      </div>
    </article>
  )
}
