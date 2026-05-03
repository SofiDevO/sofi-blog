export interface LanguagesResponse {
  languages: Languages
}

export interface Languages {
  nodes: Node[]
}

export interface Node {
  curso: Curso
}

export interface Curso {
  description: string
  icon: Icon
}

export interface Icon {
  node: Node2
}

export interface Node2 {
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
