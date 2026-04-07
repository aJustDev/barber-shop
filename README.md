# GybbenchyDept

Barbería y Asesoría de Imagen en León.

> Tu imagen, nuestra pasión.

## Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Astro | 6.x | Framework principal (SSG) |
| React | 19.x | Componente de reservas |
| Tailwind CSS | 4.x | Estilos (dark theme) |
| TypeScript | - | Tipado |

## Requisitos

- Node.js >= 22.12.0
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321)

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (genera `dist/`) |
| `npm run preview` | Vista previa del build |
| `npm run astro -- <cmd>` | Comandos Astro CLI |

## Páginas

### Landing (`/`)

- Hero con nombre y CTA
- Sección de servicios (corte, barba, corte+barba, asesoría)
- Horarios de atención
- Ubicación y datos de contacto
- Footer con enlace a reservas

### Reservas (`/booking`)

Formulario de reservas via WhatsApp:

1. Seleccionar servicio
2. Elegir fecha (desde mañana)
3. Elegir hora (horario de atención)
4. Introducir nombre y teléfono
5. Click en "Reservar" → abre WhatsApp con mensaje predefinido

## Sistema de Reservas

El booking está implementado via **WhatsApp Business**:

- Sin backend propio
- El formulario genera un mensaje formateado
- Abre `wa.me` con el número de la barbería
- El barbero confirma manualmente

### Configurar número de WhatsApp

Editar `src/components/BookingForm.tsx`:

```typescript
const WHATSAPP_NUMBER = "34XXXXXXXXX";
```

## Estructura de Archivos

```
proyectos/barberia/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── BookingForm.tsx    # Formulario React
│   ├── layouts/
│   │   └── Layout.astro      # Layout base
│   ├── pages/
│   │   ├── index.astro       # Landing
│   │   └── booking.astro     # Reservas
│   └── styles/
│       └── global.css        # Tailwind + theme
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Theme

Dark theme con acentos dorados:

- Background: `#0A0A0A`
- Cards: `#141414`
- Acento: `#C9A227` (gold)
- Texto: `#E5E5E5`
- Tipografía: JetBrains Mono

## Despliegue

El proyecto está preparado para desplegar en **GitHub Pages**.

Build estático en `dist/`:

```bash
npm run build
```

## Datos de la Barbería

- **Nombre:** GybbenchyDept
- **Horario:** L-V 10:00-14:00 / 16:00-20:00
- **Dirección:** C. Fotógrafo Pepe Gracia, 24005 León
- **Instagram:** @gybbenchydept
- **Servicios:**
  - Corte: 12€
  - Barba: 8€
  - Corte + Barba: 16€
  - Asesoría de imagen: Consultar

---

Creado con Astro + Tailwind + React
