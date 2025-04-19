export interface FeaturedImageNode {
  mediaItemUrl: string;
  srcSet?: string;
  sizes?: string;
  altText?: string;
  link?: string;
  sourceUrl?: string
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
  databaseId?: number;
}
export interface PostcategoryNode {
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
  altdescription?: string;
  image?: FeaturedImageNode,
  seo?: Seo;
  author:AuthorNode;
  authorImage?: {
    url?: string;
  };
  date?: string;
  excerpt?: string;
  categories?:
    PostcategoryNode[];
  isSticky?: boolean;
}

export interface CategoryWithPosts {
  name: string;
  slug: string;
  id: number;
  databaseId: number;
  posts: CardPost[];
}
export interface CardPost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  image?: {
      altText: string
      mediaItemUrl: string
      srcSet: string
      sizes: string
      link: string;
      sourceUrl: string
  };
  categories: CategoriesResponse[];
  author: {
      avatar: {
          url: string;
      };
      name: string;
      slug: string;
      firstName: string;
      lastName: string;
  };
}

type CategoriesResponse = {
  name: string;
  slug: string;
}


export interface Categories {
  [key: string]:CategoryWithPosts;
}