# Doc Level Landings

Landings iniciales para el flujo de papas primerizos:

- `/papa-primerizo`: pagina de registro de una sola pantalla, con modal para ActiveCampaign.
- `/papa-primerizo/gracias`: pagina de agradecimiento con boton obligatorio al grupo de WhatsApp.

Tambien siguen funcionando las rutas internas de la app de landings:

- `/`
- `/gracias`

## Configuracion

Copia `.env.example` a `.env.local` para pruebas locales y reemplaza:

- `VITE_WHATSAPP_GROUP_URL`: enlace real del grupo de WhatsApp.
El formulario oficial de ActiveCampaign ya esta integrado:

```html
<div class="_form_227"></div>
<script src="https://cefincapacitacion.activehosted.com/f/embed.php?id=227" charset="utf-8"></script>
```

En ActiveCampaign, el formulario `227` debe tener como URL de gracias:

```txt
https://www.doclevelacademy.com/papa-primerizo/gracias
```

Si el formulario esta configurado con una URL de Cressara, ActiveCampaign puede redirigir fuera de esta app aunque el codigo local este correcto.

## Rewrite en el repo principal DocLevel

En el repo `alfredo31410-ctrl/DocLevel`, agrega o ajusta `vercel.json` para que el dominio principal sirva estas landings desde el proyecto de landings:

```json
{
  "rewrites": [
    {
      "source": "/papa-primerizo",
      "destination": "https://doclevel-landings.vercel.app"
    },
    {
      "source": "/papa-primerizo/:path*",
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
