export interface FeaturedImageNode {
  sourceUrl?: string;
  altText?: string;
}

export interface AuthorNode {
  name?: string;
  firstName?: string;
  lastName?: string;
  slug?: string;
  avatar?: {
    url?: string;
  };
}

export interface CategoryNode {
  name?: string;
  slug?: string;
}

export interface Seo {
  cornerstone?: boolean;
  readingTime?: number;
  metaDesc?: string;
}

export interface Post {
  title: string;
  slug?: string;
  image?: string;
  altdescription?: string;
  featuredImage?: {
    node: FeaturedImageNode;
  };
  seo?: Seo;
  author:AuthorNode;

  authorImage?: {
    url?: string;
  };
  date?: string;
  excerpt?: string;
  categories?: {
    nodes?: CategoryNode[];
  };
  isSticky?: boolean;
}
