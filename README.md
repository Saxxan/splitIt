# SplitIt

## Aplicación web para compartir y repartir gastos de cuentas entre varias personas. Organiza cuentas pendientes de viajes, comidas, regalos, lo que tu quieras. 

### Tecnologías

La aplicación se ha creado con Astro empleando componentes de React y TypeScript para el tipado. Para los estilos se ha usado el framework de CSS, Tailwind. La cuenta se gestiona con un contexto global creado con Zustand.

- Astro
- React
- TypeScript
- Tailwind
- Zustand

### Wireframe aplicación

![Wireframe-SplitIt](https://github.com/Saxxan/splitIt/assets/78732743/60823162-f78b-49f4-b502-07fb05ac0169)

### Estructura del proyecto (Pendiente)

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

### Descargar el repositorio y ejecutarlo en local

1. Descarga el repositorio:
   ``git clone https://github.com/Saxxan/splitIt``

2. Instala las dependencias
   ``pnpm install``
   
3. Ejecuta la aplicación
   ``pnpm run dev``

#### Comandos de Astro

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |
