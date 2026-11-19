
import { Film } from 'lucide-react'

type EstadoVacioProps = {
  titulo: string
  subtitulo: string
}

export default function EstadoVacio({
  titulo,
  subtitulo,
}: EstadoVacioProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <Film
        className="size-16 text-texto-terciario"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-texto">
          {titulo}
        </h2>

        <p className="max-w-md text-sm leading-relaxed text-texto-secundario">
          {subtitulo}
        </p>
      </div>
    </div>
  )
}
