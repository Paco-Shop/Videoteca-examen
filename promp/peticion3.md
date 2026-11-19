PETICIÓN 3. BOTÓN REUTILIZABLE

Siguiendo las reglas del Prompt Maestro de Videoteca, créame:

components/ui/Boton.tsx

Un botón reutilizable que utilizaremos en toda la aplicación.

PROPS:

variante: 'primario' | 'peligro' | 'fantasma', por defecto 'primario'.

cargando: boolean. Cuando sea true:

Muestra el icono Loader2 de lucide-react.

El icono gira utilizando animate-spin.

El botón queda deshabilitado.

icono: un componente de icono de lucide-react, opcional.

Todas las props nativas de un botón HTML (type, disabled, onClick, className, etc.), extendiendo React.ComponentProps<'button'>.

REGLAS:

No lleva 'use client'.

No utiliza hooks.

No tiene estado propio.

No contiene lógica de negocio.

Solo recibe props y devuelve JSX.

Utiliza LucideIcon para tipar el icono, importándolo de lucide-react.

Usa exclusivamente los colores de la paleta de la regla 14.

Combina las clases de forma que se puedan añadir clases externas mediante className.

La variante peligro debe utilizar el color semántico error, no colores de Tailwind.

No uses SVG a mano.

Explícame en una línea por qué, aunque se utilice dentro de componentes 'use client', este archivo no necesita la directiva.