
import type { Metadata } from 'next'
import { ListaPeliculas } from '@/components/ListaPeliculas'
import { obtenerPeliculasVistas } from '@/lib/peliculas'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Películas vistas',
}

export default async function PaginaVistas() {
  const peliculas = await obtenerPeliculasVistas()
  const total = peliculas.length

  const textoCantidad =
    total === 1 ? '1 película vista' : `${total} películas vistas`

  return (
    <main className="min-h-screen bg-fondo px-4 py-8 text-texto">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-texto sm:text-4xl">
            Películas vistas
          </h1>

          <p className="mt-2 text-sm text-texto-secundario">
            {textoCantidad}
          </p>
        </header>

        <section>
          <ListaPeliculas
            peliculas={peliculas}
            tituloVacio="Todavía no has visto ninguna"
            subtituloVacio="Cuando marques una película como vista, aparecerá aquí"
          />
        </section>
      </div>
    </main>
  )
}
