export interface LanguageDetailResponse {
  languages: Languages
}

export interface Languages {
  nodes: Node[]
}

export interface Node {
  curso: Curso
  slug: string
  title: string
  content: string
}

export interface Curso {
  icon: Icon
  modulo?: Modulo
}

export interface Icon {
  node: Node2
}

export interface Node2 {
  srcSet: string
  sizes: string
  mediaItemUrl: string
}

export interface Modulo {
  nodes: Node3[]
}

export interface Node3 {
  title: string
  slug: string
  moduleFields?: {
    leccion?: string | null
    modulo?: string | null
  } | null
}

export interface Extensions {
  debug: any[]
  queryAnalyzer: QueryAnalyzer
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
