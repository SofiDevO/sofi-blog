# 🤝 Guía de Contribución - SofiBlog

¡Bienvenido/a a SofiBlog! Nos emociona que estés interesado/a en contribuir a nuestro proyecto. Esta guía te ayudará a participar de manera efectiva y profesional en el desarrollo de nuestra plataforma de blog moderna.

## 📋 Tabla de Contenidos

- [🌟 Sobre el Proyecto](#-sobre-el-proyecto)
- [🚀 Primeros Pasos](#-primeros-pasos)
- [💻 Configuración del Entorno de Desarrollo](#-configuración-del-entorno-de-desarrollo)
- [📝 Estilo de Código y Buenas Prácticas](#-estilo-de-código-y-buenas-prácticas)
- [🔄 Flujo de Trabajo de Pull Request](#-flujo-de-trabajo-de-pull-request)
- [🧪 Directrices de Testing](#-directrices-de-testing)
- [📚 Directrices de Documentación](#-directrices-de-documentación)
- [🚀 Proceso de Despliegue](#-proceso-de-despliegue)
- [🤗 Directrices de la Comunidad](#-directrices-de-la-comunidad)
- [🆘 Obtener Ayuda y Recursos Útiles](#-obtener-ayuda-y-recursos-útiles)
- [🏆 Reconocimientos](#-reconocimientos)

## 🌟 Sobre el Proyecto

SofiBlog es una plataforma de blog moderna, rápida y optimizada para SEO, construida con **Astro** y alimentada por **WordPress** como CMS headless. Nos enfocamos en crear contenido de desarrollo web con una hermosa interfaz, sistema de autenticación de usuarios y funcionalidad de comentarios.

### Características Principales

- ⚡ **Ultra Rápido**: Construido con Astro para rendimiento óptimo
- 📱 **Diseño Responsivo**: Enfoque mobile-first con Tailwind CSS
- 🎨 **UI Moderna**: Diseño limpio y profesional con principios de diseño atómico
- 🔐 **Autenticación de Usuarios**: Login, registro y dashboard de usuario
- 💬 **Sistema de Comentarios**: Comentarios interactivos con funcionalidad de respuesta
- 🔍 **Búsqueda Avanzada**: Funcionalidad de búsqueda en todo el contenido

## 🚀 Primeros Pasos

### Antes de Contribuir

1. **Lee el [README.md](./README.md)** para entender la estructura del proyecto
2. **Revisa las [issues abiertas](https://github.com/SofiDevO/sofi-blog/issues)** para encontrar tareas disponibles
3. **Familiarízate con nuestra [guía de migración](./MIGRATION_WPQUERY_TO_GRAPHQLREQ.md)** para entender las mejoras en curso

### Tipos de Contribuciones que Valoramos

- 🐛 **Reportes de bugs** y correcciones
- ✨ **Nuevas características** y mejoras
- 📝 **Mejoras en documentación**
- 🎨 **Mejoras en UI/UX**
- 🔧 **Optimizaciones de rendimiento**
- 🧪 **Tests** y mejoras en testing
- 🌍 **Traducciones** y mejoras de accesibilidad

## 💻 Configuración del Entorno de Desarrollo

### Prerrequisitos

- **Node.js 18+**
- **npm** o **yarn**
- **Sitio WordPress** con plugin WP GraphQL instalado

### Configuración Paso a Paso

1. **Fork el repositorio**

   ```bash
   # Haz fork desde GitHub UI, luego clona tu fork
   git clone https://github.com/TU_USUARIO/sofi-blog.git
   cd sofi-blog
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno**

   ```bash
   cp dev.env .env
   ```

   Actualiza las siguientes variables en tu archivo `.env`:

   ```env
   SECRET_USER=tu_usuario_wordpress
   SECRET_PASSWORD=tu_contraseña_app_wordpress
   WPGRAPHQL_URL=https://tu-sitio-wordpress.com/graphql
   SECRET_KEY=tu_clave_secreta_jwt
   ```

4. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   El sitio estará disponible en `http://localhost:3000`

5. **Verifica que la compilación funciona**
   ```bash
   npm run build
   ```

### Estructura del Proyecto

Seguimos principios de **diseño atómico** para una arquitectura de componentes escalable:

```
📦src
 ┣ 📂components
 ┃ ┣ 📂atoms          # Bloques básicos de construcción
 ┃ ┣ 📂molecules      # Combinaciones simples de componentes
 ┃ ┗ 📂organisms      # Componentes complejos
 ┣ 📂content          # Colecciones de contenido
 ┣ 📂controllers      # Lógica de negocio
 ┣ 📂services         # Servicios de API externa
 ┣ 📂pages            # Páginas/rutas de Astro
 ┗ 📂types            # Tipos de TypeScript
```

Para más detalles, consulta la [estructura completa en el README](./README.md#-project-structure).

## 📝 Estilo de Código y Buenas Prácticas

### Herramientas de Formato

Utilizamos **Prettier** para mantener consistencia en el código:

```bash
# El formato se aplica automáticamente al guardar
# También puedes ejecutar manualmente:
npx prettier --write .
```

### Convenciones de Nomenclatura

- **Archivos de componentes**: PascalCase (`UserProfile.astro`)
- **Archivos de servicios**: camelCase (`getUserData.ts`)
- **Directorios**: camelCase o kebab-case
- **Variables y funciones**: camelCase
- **Constantes**: UPPER_SNAKE_CASE

### Principios de Diseño Atómico

- **Atoms**: Componentes básicos no divisibles (botones, inputs, títulos)
- **Molecules**: Combinaciones de átomos (formularios de búsqueda, tarjetas)
- **Organisms**: Componentes complejos (header, comentarios, listas de posts)

### TypeScript

- Usa tipos explícitos siempre que sea posible
- Aprovecha la inferencia de tipos cuando sea clara
- Define interfaces para objetos complejos
- Consulta `src/types/` para tipos existentes

### Mejores Prácticas

1. **Componentes pequeños y enfocados**: Cada componente debe tener una responsabilidad específica
2. **Props tipadas**: Siempre define las props con TypeScript
3. **Nombres descriptivos**: Usa nombres que expliquen claramente la función
4. **Comentarios útiles**: Comenta lógica compleja, no código obvio
5. **Reutilización**: Antes de crear, verifica si existe algo similar

## 🔄 Flujo de Trabajo de Pull Request

### 1. Preparación

1. **Crea una rama específica** para tu feature/fix:

   ```bash
   git checkout -b feature/nombre-descriptivo
   # o
   git checkout -b fix/descripcion-del-bug
   ```

2. **Mantén tu rama actualizada**:
   ```bash
   git fetch origin
   git rebase origin/main
   ```

### 2. Desarrollo

1. **Haz commits pequeños y descriptivos**:

   ```bash
   git commit -m "feat: añadir componente de búsqueda avanzada"
   git commit -m "fix: corregir overflow en móviles"
   git commit -m "docs: actualizar guía de instalación"
   ```

2. **Sigue la convención de commits**:
   - `feat:` - Nueva característica
   - `fix:` - Corrección de bug
   - `docs:` - Cambios en documentación
   - `style:` - Cambios de formato (sin afectar lógica)
   - `refactor:` - Refactorización de código
   - `test:` - Añadir o modificar tests
   - `chore:` - Tareas de mantenimiento

### 3. Testing y Verificación

Antes de enviar tu PR:

1. **Ejecuta la verificación de build**:

   ```bash
   npm run build
   ```

2. **Verifica el formato del código**:

   ```bash
   npx prettier --check .
   ```

3. **Prueba tu funcionalidad manualmente**
4. **Asegúrate de que no has roto funcionalidad existente**

### 4. Envío del Pull Request

1. **Estructura del PR**:
   - **Título claro**: Describe qué hace el cambio
   - **Descripción detallada**: Explica el problema y tu solución
   - **Screenshots**: Para cambios visuales
   - **Testing**: Describe cómo probaste los cambios

2. **Template de descripción**:

   ```markdown
   ## Descripción

   Breve descripción de los cambios realizados.

   ## Tipo de cambio

   - [ ] Bug fix
   - [ ] Nueva característica
   - [ ] Cambio que rompe compatibilidad
   - [ ] Actualización de documentación

   ## Testing

   - [ ] He probado mi código localmente
   - [ ] He verificado que el build funciona
   - [ ] He probado en diferentes navegadores/dispositivos

   ## Screenshots (si aplica)

   [Añadir capturas de pantalla]

   ## Notas adicionales

   Cualquier información adicional relevante.
   ```

### 5. Proceso de Review

1. **Revisión automática**: Los checks automáticos deben pasar
2. **Revisión de código**: Un maintainer revisará tu código
3. **Feedback**: Implementa los cambios solicitados
4. **Aprobación**: Una vez aprobado, será merged

## 🧪 Directrices de Testing

### Testing Manual

Para cada cambio significativo:

1. **Prueba en múltiples navegadores**: Chrome, Firefox, Safari
2. **Prueba en dispositivos móviles**: Responsividad y usabilidad
3. **Verifica la funcionalidad completa**: No solo tu cambio específico
4. **Prueba casos edge**: Datos vacíos, errores de red, etc.

### Áreas Críticas para Testing

- **Autenticación**: Login, logout, registro
- **Comentarios**: Crear, responder, moderar
- **Búsqueda**: Funcionalidad y rendimiento
- **Navegación**: Enlaces, routing, breadcrumbs
- **Forms**: Validación, envío, errores

### Testing de Rendimiento

- Verifica que las páginas cargan rápido
- Comprueba que las imágenes están optimizadas
- Revisa el bundle size después de cambios

## 📚 Directrices de Documentación

### Código Auto-documentado

- Usa nombres descriptivos para variables y funciones
- Añade comentarios JSDoc para funciones complejas
- Documenta interfaces y tipos TypeScript

### Documentación de Características

- Actualiza el README.md si añades nuevas características
- Incluye ejemplos de uso cuando sea relevante
- Documenta nuevas configuraciones o variables de entorno

### Comentarios de Código

```typescript
// ✅ Bueno: Explica el "por qué"
// Usando setTimeout para evitar race conditions con el DOM
setTimeout(() => updateUI(), 0);

// ❌ Malo: Explica el "qué" (obvio)
// Incrementa el contador en 1
counter++;
```

## 🚀 Proceso de Despliegue

### Entornos

- **Desarrollo**: Local (`npm run dev`)
- **Preview**: Build local (`npm run build && npm run preview`)
- **Producción**: Vercel (automático desde `main`)

### Preparación para Producción

1. **Verifica variables de entorno** en Vercel
2. **Prueba el build de producción** localmente
3. **Optimiza assets** (imágenes, CSS, JS)
4. **Verifica SEO** (meta tags, sitemap, robots.txt)

### Despliegue Automático

- **Cada push a `main`** dispara deploy automático en Vercel
- **Pull Requests** generan preview deployments automáticamente
- **Variables de entorno** se configuran en Vercel dashboard

Para más detalles, consulta la [sección de deployment en el README](./README.md#-deployment).

## 🤗 Directrices de la Comunidad

### Nuestros Valores

- **Inclusividad**: Todos son bienvenidos, independientemente de su nivel de experiencia
- **Respeto**: Tratamos a todos con cortesía y profesionalismo
- **Colaboración**: Trabajamos juntos hacia objetivos comunes
- **Aprendizaje**: Compartimos conocimiento y ayudamos a otros a crecer
- **Calidad**: Nos esforzamos por crear código y contenido de alta calidad

### Código de Conducta

- **Sé respetuoso**: Usa lenguaje inclusivo y constructivo
- **Sé paciente**: Recuerda que todos estamos aprendiendo
- **Sé colaborativo**: Comparte conocimientos y ayuda a otros
- **Sé profesional**: Mantén las discusiones enfocadas y productivas

### Comunicación

- **Issues**: Para reportar bugs o proponer características
- **Discussions**: Para preguntas generales y ideas
- **Pull Requests**: Para contribuciones de código
- **Email**: Para asuntos privados (contacta al maintainer)

### Reconocimiento

- Valoramos toda contribución, grande o pequeña
- Los contribuidores regulares pueden ser invitados como collaborators
- Reconocemos públicamente las contribuciones significativas

## 🆘 Obtener Ayuda y Recursos Útiles

### Documentación del Proyecto

- **[README principal](./README.md)**: Información general y setup
- **[Guía de migración](./MIGRATION_WPQUERY_TO_GRAPHQLREQ.md)**: Para entender la evolución del proyecto
- **[Issues](https://github.com/SofiDevO/sofi-blog/issues)**: Para reportar problemas o ver tareas pendientes

### Recursos Externos

- **[Documentación de Astro](https://docs.astro.build/)**: Framework principal
- **[Documentación de Tailwind CSS](https://tailwindcss.com/docs)**: Para estilos
- **[WP GraphQL](https://www.wpgraphql.com/)**: Para la integración con WordPress
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**: Para tipado
- **[Vercel Docs](https://vercel.com/docs)**: Para deployment

### Preguntas Frecuentes

**P: ¿Cómo puedo configurar WordPress localmente?**
R: Puedes usar cualquier instalación de WordPress con el plugin WP GraphQL. Para desarrollo, recomendamos usar un servidor WordPress en línea.

**P: ¿Qué hacer si mi PR falla los checks automáticos?**
R: Revisa los logs de error, generalmente son problemas de formato o build. Ejecuta `npm run build` localmente para verificar.

**P: ¿Puedo contribuir si soy principiante?**
R: ¡Absolutamente! Busca issues marcadas como "good first issue" o "help wanted". También puedes mejorar documentación o reportar bugs.

**P: ¿Cómo puedo proponer una nueva característica?**
R: Abre un issue describiendo la característica, su propósito y cómo beneficiaría al proyecto. Discutiremos la implementación juntos.

## 🏆 Reconocimientos

### Contribuidores Actuales

Agradecemos a todos los que han contribuido a SofiBlog:

- **[SofiDev](https://github.com/SofiDevO)** - Creadora y maintainer principal
- Y a todos los futuros contribuidores... ¡incluido tú!

### Cómo Contribuir al Reconocimiento

- Mejoras significativas al código o arquitectura
- Contribuciones regulares y de calidad
- Ayuda a otros contribuidores
- Mejoras en documentación y onboarding
- Reporte y solución de bugs importantes

---

## 💜 ¡Gracias por Contribuir!

Tu participación hace que SofiBlog sea mejor para toda la comunidad. No importa si es tu primera contribución o si eres un desarrollador experimentado, valoramos tu tiempo y esfuerzo.

¿Tienes preguntas? No dudes en abrir un issue o contactar al maintainer. ¡Estamos aquí para ayudar!

**¡Feliz coding! 🚀**

---

_Esta guía está viva y evoluciona. Si tienes sugerencias para mejorarla, ¡compártelas!_
