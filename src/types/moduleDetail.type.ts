export interface ModuleDetailResponse {
  modules: Modules
}

export interface Modules {
  nodes: Node[]
}

export interface ModuleNode {
  slug: string
  title: string
  databaseId: number
  moduleFields: ModuleFields
  content: string
  date: string
  featuredImage?: FeaturedImage
}

export interface ModuleFields {
  recursos?: Recursos
  multimedia?: string
}

export interface Recursos {
  node: Node2
}

export interface Node2 {
  mediaItemUrl: string
}

export interface FeaturedImage {
  node: Node3
}

export interface Node3 {
  altText: string
  mediaItemUrl: string
  sizes: string
  srcSet: string
}

export interface Extensions {
  debug: Debug[]
  queryAnalyzer: QueryAnalyzer
}

export interface Debug {
  type: string
  message: string
  type_name: string
  stack: string[]
}

export interface QueryAnalyzer {
  keys: string
  keysLength: number
  keysCount: number
  skippedKeys: string
  skippedKeysSize: number
  skippedKeysCount: number
  skippedTypes: any[]
}
