
'use client'

import { Eye, EyeOff } from 'lucide-react'
import Boton from '@/components/ui/Boton'
import { useAlternarVista } from '@/hooks/useAlternarVista'

type BotonVistaProps = {
  id: string
  vista: boolean
}

export default function BotonVista({ id, vista }: BotonVistaProps) {
  const { cargando, manejarClic } = useAlternarVista(id, vista)

  const texto = vista
    ? 'Marcar como pendiente'
    : 'Marcar como vista'

  const Icono = vista ? EyeOff : Eye

  return (
    <Boton
      type="button"
      variante="fantasma"
      icono={Icono}
      cargando={cargando}
      disabled={cargando}
      onClick={manejarClic}
      aria-label={texto}
    >
      {texto}
    </Boton>
  )
}
