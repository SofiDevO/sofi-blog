
export interface ContributorResponse {
  data: Data
  extensions: Extensions
}

export interface Data {
  contributtors: Contributtors
}

export interface Contributtors {
  nodes: Node[]
}

export interface Node {
  contribuidores: Contribuidores2
  socialLinks: SocialLinks
  slug: string
}

export interface Contribuidores2 {
  banner: Banner
  customcolor: string
  cv?: Cv
  description: string
  email: string
  name: string
  rol: string[]
  profilepic: Profilepic
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

export interface Cv {
  node: Node3
}

export interface Node3 {
  mediaItemUrl: string
}

export interface Profilepic {
  node: Node4
}

export interface Node4 {
  altText: string
  mediaItemUrl: string
  sizes: string
  srcSet: string
}

export interface SocialLinks {
  github: string
  linkedin: string
  portafolio: any
  youtube: string
  instagram: string
  kofi?: string
  twitch?: string
}

export interface Extensions {
  debug: Debug[]
}

export interface Debug {
  type: string
  message: string
}
