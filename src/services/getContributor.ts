import { wpquery } from "@src/data/wordpress";
import type { Contributtor } from "@src/types/contributtors.types";
import type { Post } from "@src/types/post.type";
import { queryContributor } from "./querys/contributors/contributor";
export async function getContributor(slug: string): Promise<Contributtor> {
  try {
    const data = await wpquery({ query: queryContributor(slug) });
    // Extraer datos del usuario si existen
    const userConnection =
      data?.contributtor?.contribuidores?.tuUsuario?.nodes?.[0];

    const authorData: Contributtor = {
      ...data.contributtor.contribuidores,
      socialLinks: data?.contributtor?.socialLinks,
      cv: data?.contributtor?.contribuidores?.cv?.node?.link,
      banner: data?.contributtor?.contribuidores?.banner.node,
      profilepic: data?.contributtor?.contribuidores?.profilepic.node,
      name: data?.contributtor?.contribuidores?.name,
      // Incluir información del usuario del fragmento AcfUserConnectionFragment
      tuUsuario: userConnection
        ? {
            username: userConnection.username,
            avatar: userConnection.avatar.node,
            firstName: userConnection.posts.nodes[0]?.author.node.firstName,
            lastName: userConnection.posts.nodes[0]?.author.node.lastName,
            slug: userConnection.slug,
            posts: userConnection.posts?.nodes.map((post): Post => {
              return {
                ...post,
                image: post?.featuredImage?.node,
              };
            }),
          }
        : null,
    };
    return authorData;
  } catch (error) {
    console.log("Error fetching contributor:", error);
    throw error;
  }
}
