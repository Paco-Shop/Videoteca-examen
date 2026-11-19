
'use client'

import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { borrarPelicula } from '@/actions/acciones-peliculas'

export function useBorrarPelicula(id: string) {
  const [armado, setArmado] = useState(false)
  const [borrando, setBorrando] = useState(false)

  const temporizadorRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!armado) {
      return
    }

    temporizadorRef.current = setTimeout(() => {
      setArmado(false)
      temporizadorRef.current = null
    }, 3000)

    return () => {
      if (temporizadorRef.current !== null) {
        clearTimeout(temporizadorRef.current)
        temporizadorRef.current = null
      }
    }
  }, [armado])

  async function manejarClic() {
    if (borrando) {
      return
    }

    if (!armado) {
      setArmado(true)
      return
    }

    setArmado(false)
    setBorrando(true)

    try {
      const resultado = await borrarPelicula(id)

      if (resultado.exito) {
        toast.success(resultado.mensaje)
      } else {
        toast.error(resultado.mensaje)
      }
    } catch {
      toast.error('Ha ocurrido un error inesperado al borrar la película.')
    } finally {
      setBorrando(false)
    }
  }

  return {
    armado,
    borrando,
    manejarClic,
  }
}
