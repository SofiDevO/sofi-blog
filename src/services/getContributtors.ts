import { wpquery } from "@src/data/wordpress";
import type { Contributtor } from "@src/types/contributtors.types";
const { SECRET_USER, SECRET_PASSWORD   } = import.meta.env
console.log(import.meta.env);

export const getContributtors: () => Promise<Contributtor[]> = async () => {
  const query = `
        query NewQuery {
            users {
                nodes {
                contribuidores {
                    banner {
                    node {
                        altText
                        mediaItemUrl
                        sizes(size: ALX_MEDIUM)
                        srcSet(size: ALX_MEDIUM)
                    }
                    }
                    customcolor
                    cv {
                    node {
                        mediaItemUrl
                    }
                    }
                    description
                    email
                    embedVideo
                    name
                    profilepic {
                    node {
                        mediaItemUrl
                        sizes(size: ALX_SMALL)
                        srcSet(size: ALX_SMALL)
                        altText
                    }
                    }
                    rol
                }
                slug
                }
            }
            }
    `;

  const data = await wpquery({ query });
  const result =
    data &&
    data.users?.nodes?.map((user) => {
      return {
        banner: user?.contribuidores?.banner?.node,
        customcolor: user?.contribuidores?.customcolor,
        cv: user?.contribuidores?.cv?.node?.mediaItemUrl,
        description: user?.contribuidores?.description,
        email: user?.contribuidores?.email,
        embedVideo: user?.contribuidores?.embedVideo,
        name: user?.contribuidores?.name,
        profilepic: user?.contribuidores?.profilepic.node,
        rol: user?.contribuidores?.rol,
        slug: user?.slug,
      };
    });
  return result;
};
