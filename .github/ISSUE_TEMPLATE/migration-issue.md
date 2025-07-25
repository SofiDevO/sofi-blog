# 🔄 Migración paulatina de `wpquery` a `graphqlReq`

## 📝 Descripción

Migrar paulatinamente todas las funciones que utilizan `wpquery` de `@src/data/wordpress` a la nueva función optimizada `graphqlReq` de `@src/data/wordpresscopy` que incluye soporte para autenticación JWT y mejores tipos TypeScript.

## 🎯 Objetivos

- [ ] Migrar todos los servicios que usan `wpquery` a `graphqlReq`
- [ ] Aprovechar las mejoras de autenticación JWT
- [ ] Mejorar type safety en todo el proyecto
- [ ] Consolidar las funciones de GraphQL en una sola implementación optimizada

## 📋 Archivos a migrar

### Servicios de autenticación (Prioridad Alta)
- [ ] `src/services/auth/getUserByName.ts` (2 usos)
- [ ] `src/services/auth/index.ts` (2 usos)

### Servicios de contenido (Prioridad Media)
- [ ] `src/services/getPostContent.js` (1 uso)
- [ ] `src/services/getPostsBySlug.js` (3 usos)
- [ ] `src/services/getCategories.js` (1 uso)
- [ ] `src/services/getCategoryPost.js` (1 uso)
- [ ] `src/services/categoriesWithPosts.ts` (1 uso)
- [ ] `src/services/categories.js` (1 uso)

### Servicios de usuarios y contribuidores (Prioridad Media)
- [ ] `src/services/getContributtors.ts` (1 uso)
- [ ] `src/services/addPost.js` (1 uso)

### Servicios de comentarios (Prioridad Baja)
- [ ] `src/services/comments.js` (2 usos)
- [ ] `src/services/postComment.js` (1 uso)

### Servicios de interfaz (Prioridad Baja)
- [ ] `src/services/getMenu.js` (1 uso)
- [ ] `src/services/getLogo.js` (1 uso)
- [ ] `src/services/getCards.js` (1 uso)
- [ ] `src/services/getResults.js` (2 usos)

## 🔧 Cambios requeridos por archivo

### 1. Cambio de importación
```typescript
// Antes
import { wpquery } from "@src/data/wordpress";

// Después
import graphqlReq from "@src/data/wordpresscopy";
```

### 2. Cambio en la llamada de función
```typescript
// Antes
const data = await wpquery({ query, variables, headers });

// Después
const data = await graphqlReq(query);
// Nota: variables y headers se manejan internamente en graphqlReq
```

### 3. Manejo de variables y headers
- **Variables**: Deben ser incorporadas directamente en la query string
- **Headers**: La autenticación JWT se maneja automáticamente via `WORDPRESS_AUTH_REFRESH_TOKEN`

## ✅ Beneficios de la migración

- 🔐 **Autenticación JWT automática**: Soporte nativo para tokens de autenticación
- 📝 **Mejor TypeScript**: Tipos más estrictos y precisos
- 🛡️ **Manejo de errores mejorado**: Detección de errores HTTP y GraphQL
- 🧹 **Código más limpio**: Una sola función GraphQL optimizada
- 📚 **Documentación**: JSDoc completa para mejor DX

## 📖 Ejemplo de migración

### Antes (getContributor.ts ya migrado)
```typescript
import { wpquery } from "@src/data/wordpress";

export async function getContributor(slug: string) {
  const data = await wpquery({ query: queryContributor(slug) });
  // ...resto del código
}
```

### Después
```typescript
import graphqlReq from "@src/data/wordpresscopy";

export async function getContributor(slug: string): Promise<Contributtor> {
  const data = await graphqlReq(queryContributor(slug));
  // ...resto del código con mejor type safety
}
```

## 🚨 Consideraciones especiales

### Para archivos con autenticación personalizada
Algunos archivos como `auth/getUserByName.ts` e `auth/index.ts` manejan headers personalizados. Estos necesitarán:
1. Verificar si los headers personalizados son necesarios
2. Evaluar si usar `graphqlReq` o crear una función específica
3. Testear thoroughly la autenticación

### Para archivos con variables
Los archivos que usan `variables` en `wpquery` necesitarán que las variables se incorporen directamente en la query string.

## 🧪 Testing

- [ ] Crear tests para cada servicio migrado
- [ ] Verificar que la autenticación funciona correctamente
- [ ] Confirmar que no hay regresiones en funcionalidad

## 📅 Plan de implementación

1. **Fase 1**: Migrar servicios de autenticación (críticos)
2. **Fase 2**: Migrar servicios de contenido principal
3. **Fase 3**: Migrar servicios de contribuidores y posts
4. **Fase 4**: Migrar servicios de interfaz y comentarios
5. **Fase 5**: Deprecar y eliminar `wpquery` cuando todos los servicios estén migrados

## 🔗 Referencias

- Implementación actual: `src/data/wordpresscopy.ts`
- Plugin JWT: [wp-graphql-jwt-authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication)
- Commit de implementación: 7c09f5a

---

**Etiquetas**: `refactor`, `migration`, `graphql`, `typescript`, `jwt-auth`
