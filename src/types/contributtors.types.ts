import type { Author } from "./author.type";
import type { Post } from "./post.type";
export interface Contributtor {
  banner: {
    altText: string;
    mediaItemUrl: string;
    sizes: string;
    srcSet: string;
  };
  customcolor?: string;
  cv?: string;
  description?: string;
  email?: string;
  embedVideo?: string;
  name: string;
  rol: string[];
  profilepic: {
    altText: string;
    mediaItemUrl: string;
    sizes: string;
    srcSet: string;
  };
  socialLinks: SocialLinks;
  slug: string;
  posts: Post[];
  author: Author;
}

export type CardContributtor = Omit<
  Contributtor,
  "cv" | "embedVideo" | "description" | "tuUsuario"
>;

// Row Contributtor
export interface ContributtorRow {
  data: Data;
  extensions: Extensions;
}

export interface Data {
  contributtor: Contributtor2;
}

export interface Contributtor2 {
  socialLinks: SocialLinks;
  title: string;
  contribuidores: Contribuidores;
  slug: string;
}

export interface SocialLinks {
  github: string;
  instagram: any;
  koFi: string;
  linkedin: string;
  twitch: string;
  youtube: string;
}

export interface Contribuidores {
  banner: Banner;
  customcolor: string;
  cv: any;
  description: string;
  email: string;
  name: string;
  profilepic: Profilepic;
  rol: string[];
  tuUsuario: TuUsuario;
}

export interface Banner {
  node: Node;
}

export interface Node {
  altText: string;
  mediaItemUrl: string;
  sizes: string;
  srcSet: string;
  authorDatabaseId: number;
}

export interface Profilepic {
  node: Node2;
}

export interface Node2 {
  altText: string;
  mediaItemUrl: string;
  srcSet: any;
  sizes: string;
}

export interface TuUsuario {
  nodes: Node3[];
}

export interface Node3 {
  username: string;
  posts: Posts;
  avatar: Avatar;
}

export interface Posts {
  nodes: any[];
}

export interface Avatar {
  url: string;
  default: string;
}

export interface Extensions {
  debug: Debug[];
}

export interface Debug {
  type: string;
  message: string;
}

