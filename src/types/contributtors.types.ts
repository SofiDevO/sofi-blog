export interface Contributtor {
  banner: {
    altText: string;
    mediaItemUrl: string;
    sizes: string;
    srcSet: string;
  };
  customcolor: string;
  cv: string;
  description: string;
  email: string;
  embedVideo: string;
  name: string;
  rol: string[];
  profilepic: {
    altText: string;
    mediaItemUrl: string;
    sizes: string;
    srcSet: string;
  };
  socialLinks: {
    github: string;
    instagram: string;
    kofi: string;
    linkedin: string;
    twitch: string;
    youtube: string;
  };
  slug: string;
  // Información del usuario del fragmento AcfUserConnectionFragment
  tuUsuario?: {
    username: string;
    avatar: {
      url: string;
      default: string;
    };
    posts: Array<{
      title: string;
      slug: string;
      excerpt: string;
      featuredImage?: {
        node: {
          altText: string;
          mediaItemUrl: string;
        };
      };
    }>;
  } | null;
}

export type CardContributtor = Omit<Contributtor, "cv" | "embedVideo" |  "description" | "tuUsuario">