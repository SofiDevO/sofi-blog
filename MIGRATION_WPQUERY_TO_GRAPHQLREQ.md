# 🔄 Migración paulatina de `wpquery` a `graphqlReq`

## 📝 Descripción

Migrar paulatinamente todas las funciones que utilizan `wpquery` de `@src/data/wordpress` a la nueva función optimizada `graphqlReq` de `@src/data/wordpresscopy` que incluye soporte para autenticación JWT y mejores tipos TypeScript.

## 🎯 Objetivos

- [ ] Migrar todos los servicios que usan `wpquery` a `graphqlReq`
- [ ] Aprovechar las mejoras de autenticación JWT
- [ ] Mejorar type safety en todo el proyecto
- [ ] Consolidar las funciones de GraphQL en una sola implementación optimizada

## 📊 Estado actual: 1/17 archivos migrados (5.9%)

### ✅ Completados
- [x] `src/services/getContributor.ts` - **Migrado**

## 📋 Archivos pendientes de migración

### 🔴 Servicios de autenticación (Prioridad Alta)
- [ ] `src/services/auth/getUserByName.ts` (2 usos de wpquery)
- [ ] `src/services/auth/index.ts` (2 usos de wpquery)

### 🟡 Servicios de contenido (Prioridad Media)
- [ ] `src/services/getPostContent.js` (1 uso)
- [ ] `src/services/getPostsBySlug.js` (3 usos)
- [ ] `src/services/getCategories.js` (1 uso)
- [ ] `src/services/getCategoryPost.js` (1 uso)
- [ ] `src/services/categoriesWithPosts.ts` (1 uso)
- [ ] `src/services/categories.js` (1 uso)

### 🟡 Servicios de usuarios y contribuidores (Prioridad Media)
- [ ] `src/services/getContributtors.ts` (1 uso)
- [ ] `src/services/addPost.js` (1 uso)

### 🟢 Servicios de comentarios (Prioridad Baja)
- [ ] `src/services/comments.js` (2 usos)
- [ ] `src/services/postComment.js` (1 uso)

### 🟢 Servicios de interfaz (Prioridad Baja)
- [ ] `src/services/getMenu.js` (1 uso)
- [ ] `src/services/getLogo.js` (1 uso)
- [ ] `src/services/getCards.js` (1 uso)
- [ ] `src/services/getResults.js` (2 usos)

## 🔧 Patrón de migración

### 1. Cambio de importación
```typescript
// ❌ Antes
import { wpquery } from "@src/data/wordpress";

// ✅ Después
import graphqlReq from "@src/data/wordpresscopy";
```

### 2. Cambio en la llamada de función
```typescript
// ❌ Antes
const data = await wpquery({ query, variables, headers });

// ✅ Después
const data = await graphqlReq(query);
```

### 3. Uso de spread operator para optimizar código
```typescript
// ✅ Optimizado con spread
const result = {
  ...data.someObject,
  specificField: data.someObject.field?.node,
  // Solo sobrescribir campos específicos
};
```

## 🎁 Beneficios de la migración

- 🔐 **Autenticación JWT automática**: Via `WORDPRESS_AUTH_REFRESH_TOKEN`
- 📝 **TypeScript mejorado**: Tipos genéricos y type safety
- 🛡️ **Manejo de errores robusto**: HTTP + GraphQL errors
- 🧹 **Código más limpio**: Spread operators y menos líneas
- 📚 **Documentación JSDoc**: Mejor developer experience
- ⚡ **Performance**: Validaciones tempranas y error handling

## 📖 Ejemplo completo de migración

### ❌ Antes (patrón wpquery)
```typescript
import { wpquery } from "@src/data/wordpress";

export async function getContributor(slug: string) {
  try {
    const data = await wpquery({ query: queryContributor(slug) });

    const authorData = {
      name: data.contributtor.contribuidores.name || '',
      description: data.contributtor.contribuidores.description || '',
      email: data.contributtor.contribuidores.email || '',
      // ... 20+ líneas más de mapeo manual
    };

    return authorData;
  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
}
```

### ✅ Después (patrón graphqlReq optimizado)
```typescript
import graphqlReq from "@src/data/wordpresscopy";
import type { Contributtor } from "@src/types/contributtors.types";

export async function getContributor(slug: string): Promise<Contributtor> {
  try {
    const data = await graphqlReq(queryContributor(slug));

    if (!data?.contributtor?.contribuidores) {
      throw new Error(`No contributor found with slug: ${slug}`);
    }

    const contributorData = data.contributtor.contribuidores;

    return {
      ...contributorData, // ⚡ Spread para todas las propiedades base
      socialLinks: data.contributtor.socialLinks,
      cv: contributorData.cv?.node?.link,
      banner: contributorData.banner?.node,
      profilepic: contributorData.profilepic?.node,
      // Solo campos específicos que necesitan transformación
    };
  } catch (error) {
    console.error("Error fetching contributor:", error);
    throw new Error(`Failed to fetch contributor with slug: ${slug}`);
  }
}
```

## 🚨 Consideraciones especiales

### Archivos con autenticación personalizada
- `auth/getUserByName.ts` y `auth/index.ts` usan headers personalizados
- Evaluar si migrar a `graphqlReq` o mantener `wpquery` temporalmente
- Testing exhaustivo requerido

### Archivos con variables GraphQL
- Incorporar variables directamente en la query string
- Verificar que las queries sigan funcionando correctamente

### Archivos JavaScript vs TypeScript
- Aprovechar para migrar `.js` a `.ts` cuando sea posible
- Agregar tipos apropiados para mejor DX

## 🧪 Checklist de migración por archivo

Para cada archivo migrado:
- [ ] Cambiar import de `wpquery` a `graphqlReq`
- [ ] Actualizar llamada de función
- [ ] Agregar validación de datos básicos
- [ ] Implementar spread operators donde sea apropiado
- [ ] Agregar tipos TypeScript si el archivo no los tiene
- [ ] Mejorar manejo de errores
- [ ] Testing manual de funcionalidad
- [ ] Verificar que no hay regresiones

## 📅 Roadmap de implementación

### Sprint 1 (Crítico) 🔴
- [ ] `auth/getUserByName.ts`
- [ ] `auth/index.ts`

### Sprint 2 (Alto impacto) 🟡
- [ ] `getPostsBySlug.js` → `.ts`
- [ ] `getCategories.js` → `.ts`
- [ ] `categoriesWithPosts.ts`

### Sprint 3 (Contenido) 🟡
- [ ] `getPostContent.js` → `.ts`
- [ ] `getCategoryPost.js` → `.ts`
- [ ] `categories.js` → `.ts`

### Sprint 4 (Features) 🟡
- [ ] `getContributtors.ts`
- [ ] `addPost.js` → `.ts`

### Sprint 5 (Complementarios) 🟢
- [ ] `comments.js` → `.ts`
- [ ] `postComment.js` → `.ts`
- [ ] `getMenu.js` → `.ts`
- [ ] `getLogo.js` → `.ts`
- [ ] `getCards.js` → `.ts`
- [ ] `getResults.js` → `.ts`

### Sprint 6 (Cleanup)
- [ ] Deprecar `wpquery` si no se usa en otros lugares
- [ ] Documentar cambios en README
- [ ] Actualizar guías de desarrollo

## 🔗 Referencias

- **Implementación base**: `src/data/wordpresscopy.ts`
- **Ejemplo migrado**: `src/services/getContributor.ts`
- **Plugin JWT**: [wp-graphql-jwt-authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication)
- **Commit inicial**: `7c09f5a - Implementa autenticación JWT para WP-GraphQL`

---

**Labels**: `enhancement`, `refactor`, `migration`, `graphql`, `typescript`, `jwt-auth`, `tech-debt`
**Estimate**: 8-12 horas de desarrollo
**Priority**: Medium-High
