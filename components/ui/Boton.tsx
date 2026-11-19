
import type { ComponentProps } from 'react'
import { Loader2, type LucideIcon } from 'lucide-react'

type BotonProps = ComponentProps<'button'> & {
  variante?: 'primario' | 'peligro' | 'fantasma'
  cargando?: boolean
  icono?: LucideIcon
}

export default function Boton({
  variante = 'primario',
  cargando = false,
  icono: Icono,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: BotonProps) {
  const clasesBase =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const clasesVariantes = {
    primario:
      'bg-primario text-texto-invertido hover:opacity-90 focus-visible:outline-primario',
    peligro:
      'bg-error text-texto-invertido hover:opacity-90 focus-visible:outline-error',
    fantasma:
      'bg-transparent text-texto hover:bg-superficie-secundaria focus-visible:outline-borde',
  }

  const clases = [
    clasesBase,
    clasesVariantes[variante],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      disabled={disabled || cargando}
      className={clases}
      {...props}
    >
      {cargando ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : Icono ? (
        <Icono className="size-4" aria-hidden="true" />
      ) : null}

      {children}
    </button>
  )
}
