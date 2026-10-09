# DocLevel Landings

Aplicación de landings de DocLevel. La estructura sigue la convención del
proyecto `web_cefin`: cada campaña vive en su propia carpeta y cada subruta se
representa con una subcarpeta que contiene un archivo `page.jsx`.

## Estructura

```txt
src/
├── app/
│   ├── App.jsx
│   └── routes.jsx
├── components/landing/
├── landings/
│   ├── agente-ia-doctores/
│   │   ├── config.js
│   │   └── page.jsx
│   ├── ebook-nace-un-bebe/
│   │   ├── config.js
│   │   └── page.jsx
│   ├── ENARM/
│   │   ├── page.jsx
│   │   ├── gracias/page.jsx
│   │   ├── sprint/page.jsx
│   │   └── unirse-whatsapp/page.jsx
│   ├── las-primeras-hrs-de-tu-bebe/
│   │   ├── config.js
│   │   ├── page.jsx
│   │   ├── components/
│   │   └── gracias/page.jsx
│   ├── medicos-docentes/
│   │   ├── config.js
│   │   ├── page.jsx
│   │   └── gracias/page.jsx
│   └── primer-mes-bebe-mx/
│       ├── config.js
│       └── page.jsx
├── utils/
├── main.jsx
└── styles.css
```

`src/main.jsx` solo inicia React. La resolución de URLs está centralizada en
`src/app/routes.jsx`; las páginas y configuraciones pertenecen a cada landing.

## Rutas principales

- `/landings/las-primeras-hrs-de-tu-bebe`
- `/landings/las-primeras-hrs-de-tu-bebe/gracias`
- `/landings/primer-mes-bebe-mx`
- `/landings/ebook-nace-un-bebe`
- `/landings/agente-ia-doctores`
- `/landings/abc-consulta-pediatrica`
- `/landings/enarm`
- `/landings/enarm/gracias`
- `/landings/enarm/sprint`
- `/landings/enarm/unirse-whatsapp`
- `/landings/medicos-docentes`

La raíz `/` muestra la landing `las-primeras-hrs-de-tu-bebe` para conservar el
comportamiento anterior.

## Agregar una landing

1. Crea `src/landings/<slug>/page.jsx`.
2. Guarda su configuración en `src/landings/<slug>/config.js`.
3. Agrega subrutas como carpetas, por ejemplo `gracias/page.jsx`.
4. Registra la ruta en `src/app/routes.jsx`.
5. Añade los recursos exclusivos dentro de la carpeta de la landing; usa
   `src/assets/` solamente para recursos compartidos.

## Las primeras horas de tu bebé

El formulario oficial de ActiveCampaign ya está integrado:

```html
<div class="_form_355"></div>
<script src="https://cefincapacitacion.activehosted.com/f/embed.php?id=355" charset="utf-8"></script>
```

En ActiveCampaign, el formulario `355` debe tener como URL de gracias:

```txt
https://www.doclevelacademy.com/landings/las-primeras-hrs-de-tu-bebe/gracias
```

Si el formulario está configurado con una URL de Cressara, ActiveCampaign puede
redirigir fuera de esta app aunque el código local esté correcto.

### Tracking de conversión

El píxel de Meta usa los siguientes eventos para esta landing:

- `PageView`: visita de cualquier ruta.
- `ViewContent`: visita a la página de registro.
- `CompleteRegistration`: conversión principal. Se dispara cuando
  ActiveCampaign confirma el registro y tiene respaldo en la página de gracias.
- `Contact`: clic al grupo de WhatsApp después del registro.

`CompleteRegistration` se deduplica en la sesión para evitar que el formulario y
la página de gracias contabilicen dos conversiones por el mismo registro. Los
parámetros UTM, identificadores de anuncios y `fbclid` presentes en la URL se
conservan en la sesión y se agregan a los eventos de la campaña.

## Rewrite en el repo principal DocLevel

En el repo `alfredo31410-ctrl/DocLevel`, agrega o ajusta `vercel.json` para que el dominio principal sirva estas landings desde el proyecto de landings:

```json
{
  "rewrites": [
    {
      "source": "/landings/las-primeras-hrs-de-tu-bebe",
      "destination": "https://doclevel-landings.vercel.app"
    },
    {
      "source": "/landings/las-primeras-hrs-de-tu-bebe/:path*",
      "destination": "https://doclevel-landings.vercel.app/:path*"
    }
  ]
}
```

Si `DocLevel` ya tiene rewrites, conserva los existentes y agrega estas dos reglas antes de la regla catch-all.

## Comandos

```bash
npm install
npm run dev
npm run build
```

Vercel puede construir el sitio con `npm run build`. Las rutas se sirven desde la misma app con las rewrites de `vercel.json`.

## El ABC de la consulta pediátrica

La campaña usa una landing informativa de venta directa y continúa el cierre
con un asesor por WhatsApp. El número y el mensaje inicial se administran desde
`sales` en `src/landings/abc-consulta-pediatrica/config.js`.

El tracking incluye `PageView`, `ViewContent`, `WhatsAppSalesIntent` y
`Contact`. También conserva UTMs, IDs de anuncios, `fbclid` y `gclid`, y
refleja los eventos de la campaña en `dataLayer`.
