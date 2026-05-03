export interface LanguagesResponse {
  languages: Languages
}

export interface Languages {
  nodes: Node[]
}

export interface Node {
  title: string
  slug: string
  curso: Curso
  date:string
}

export interface Curso {
  description: string
  modulo: Modulo
  icon: Icon
  excerp: string
}

export interface Modulo {
  nodes: Node2[]
}

export interface Node2 {
  slug: string
  title: string
}

export interface Icon {
  node: Node3
}

export interface Node3 {
  altText: string
  mediaItemUrl: string
  sizes: string
  srcSet: string
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
