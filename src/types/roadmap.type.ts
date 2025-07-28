export interface Roadmap {
    slug: string;
    content: string;
    title: string;
    image?: FeaturedImage;
    infoRoadmap: {
        level: string[];
        modulos: {
                slug: string;
        };
    };
}


export interface RoadmapRoot {
  data: Data
  extensions: Extensions
}

export interface Data {
  developerRoadMaps: DeveloperRoadMaps
}

export interface DeveloperRoadMaps {
  nodes: Node[]
}

export interface Node {
  content: string
  slug: string
  title: string
  featuredImage: FeaturedImage
  infoRoadmap: InfoRoadmap
}

export interface FeaturedImage {
  node: Node2
}

export interface Node2 {
  altText: string
  mediaItemUrl: string
  sizes: string
  srcSet: string
}

export interface InfoRoadmap {
  level: string[]
  modulos: Modulos
}

export interface Modulos {
  nodes: Node3[]
}

export interface Node3 {
  slug: string
}

export interface Extensions {
  debug: Debug[]
}

export interface Debug {
  type: string
  message: string
}
