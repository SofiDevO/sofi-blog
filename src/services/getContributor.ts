import graphqlReq from "@src/data/wordpresscopy";
import type {
  Contributtor,
  ContributtorRow,
} from "@src/types/contributtors.types";
import type { Post } from "@src/types/post.type";
import { queryContributor } from "./querys/contributors/contributor";

export async function getContributor(slug: string): Promise<Contributtor> {
  try {
    const data = await graphqlReq<ContributtorRow["data"]>(
      queryContributor(slug),
    );

    const contributorData = data.contributtor.contribuidores;
    const userConnection = contributorData.tuUsuario?.nodes?.[0];

    const authorData: Contributtor = {
      ...contributorData,
      socialLinks: data.contributtor.socialLinks,
      cv: contributorData.cv?.node?.link,
      banner: contributorData.banner?.node,
      profilepic: contributorData.profilepic?.node,
      posts:
        userConnection.posts?.nodes.map((post): Post => {
          return {
            ...post,
            image: post.featuredImage?.node,
          };
        }) || [],
      slug: data.contributtor.slug,
      author: userConnection.posts?.nodes[0]?.author.node || {},
    };

    return authorData;
  } catch (error) {
    console.error("Error fetching contributor:", error);
    throw new Error(`Failed to fetch contributor with slug: ${slug}`);
  }
}
