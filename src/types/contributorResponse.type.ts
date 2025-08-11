
export interface ContributorResponse {
  data: Data
  extensions: Extensions
}

export interface ContributorResponse {
  contributtors: Contributtors
}
export interface Root {
  data: ContributorResponse
  extensions: Extensions
}

export interface Data {
  contributtors: Contributtors
}

export interface Contributtors {
  nodes: Node[]
}

export interface Node {
  contribuidores: Contribuidores
  slug: string
}

export interface Contribuidores {
  banner: Banner
  customcolor: string
  cv: any
  description: string
  email: string
  name: string
  rol: string[]
  profilepic: Profilepic
  socialLinks: SocialLinks
}

export interface Banner {
  node: Node2
}

export interface Node2 {
  altText: string
  mediaItemUrl: string
  sizes: string
  srcSet: string
}

export interface Profilepic {
  node: Node3
}

export interface Node3 {
  altText: string
  mediaItemUrl: string
  sizes: string
  srcSet: string
}

export interface SocialLinks {
  github: string
  linkedin: string
  portafolio: string
  youtube: string
  instagram: string
  kofi: string
  twitch: string
}

export interface Extensions {
  debug: Debug[]
}

export interface Debug {
  type: string
  message: string
}
