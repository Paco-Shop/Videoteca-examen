
import FormularioPelicula from '@/components/inicio/FormularioPelicula'
import ListaPeliculas from '@/components/ListaPeliculas'
import { obtenerPeliculas } from '@/lib/peliculas'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const peliculas = await obtenerPeliculas()

  const total = peliculas.length

  const textoTotal =
    total === 0
      ? 'Ninguna película todavía'
      : total === 1
        ? '1 película'
        : `${total} películas`

  return (
    <main className="min-h-screen bg-fondo px-4 py-10 text-texto sm:px-6 sm:py-14">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Mi videoteca
          </h1>

          <p className="text-sm text-texto-secundario">
            {textoTotal}
          </p>
        </header>

        <section className="rounded-xl border border-borde bg-superficie p-5 shadow-sm sm:p-6">
          <FormularioPelicula />
        </section>

        <section className="flex flex-col gap-5">
          <ListaPeliculas
            peliculas={peliculas}
            tituloVacio="Tu videoteca está vacía"
            subtituloVacio="Añade una película o serie que quieras ver"
          />
        </section>
      </div>
    </main>
  )
}
