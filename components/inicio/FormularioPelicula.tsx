
'use client'

import { Plus } from 'lucide-react'
import Boton from '@/components/ui/Boton'
import {
  MAX_TITULO,
  useFormularioPelicula,
} from '@/hooks/useFormularioPelicula'

export default function FormularioPelicula() {
  const {
    enviando,
    caracteres,
    formularioRef,
    tituloRef,
    contarCaracteres,
    manejarEnvio,
  } = useFormularioPelicula()

  return (
    <form
      ref={formularioRef}
      onSubmit={manejarEnvio}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <input
          ref={tituloRef}
          type="text"
          name="titulo"
          maxLength={MAX_TITULO}
          placeholder="Título de la película o serie"
          onChange={contarCaracteres}
          required
          disabled={enviando}
          className="w-full rounded-lg border border-borde bg-superficie px-4 py-3 text-texto placeholder:text-texto-terciario focus:outline-2 focus:outline-primario disabled:opacity-50"
        />

        <p
          className={`text-right text-xs ${
            caracteres >= MAX_TITULO
              ? 'text-error'
              : 'text-texto-secundario'
          }`}
        >
          {caracteres}/{MAX_TITULO}
        </p>
      </div>

      <textarea
        name="comentario"
        rows={3}
        placeholder="Comentario (opcional)"
        disabled={enviando}
        className="w-full resize-y rounded-lg border border-borde bg-superficie px-4 py-3 text-texto placeholder:text-texto-terciario focus:outline-2 focus:outline-primario disabled:opacity-50"
      />

      <Boton
        type="submit"
        icono={Plus}
        cargando={enviando}
        className="w-full sm:w-auto sm:self-start"
      >
        Añadir a mi videoteca
      </Boton>
    </form>
  )
}
