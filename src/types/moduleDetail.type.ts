export interface ModuleDetailResponse {
  modules: Modules;
}

export interface Modules {
  nodes: ModuleNode[];
}

export interface ModuleNode {
  databaseId: number;
  slug: string;
  title: string;
  moduleFields: ModuleFields;
  content: string;
  date: string;
  featuredImage?: FeaturedImage;
}

export interface ModuleFields {
  recursos?: Recursos;
}

export interface Recursos {
  node: MediaItem;
}

export interface FeaturedImage {
  node: FeaturedImageNode;
}

export interface FeaturedImageNode {
  altText: string;
  mediaItemUrl: string;
  sizes: string;
  srcSet: string;
}

export interface MediaItem {
  mediaItemUrl: string;
}
