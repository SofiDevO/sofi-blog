import { wpquery } from "@/services/wordpress";
import type {
  Contributtor,
  ContributtorRaw,

} from "@/types/contributtors.types";
import type { Post } from "@/types/post.type";
import { queryContributor } from "@/services/querys/contributors/contributor";

export async function getContributor(slug: string): Promise<Contributtor> {
  try {
    const data = await wpquery<any>({ query: queryContributor(slug) });

    if (!data?.contributtor) {
      throw new Error(`Contributor not found with slug: ${slug}`);
    }

    const contributorData = data.contributtor;
    const userConnection = contributorData?.contribuidores?.tuUsuario?.nodes?.[0];

  const authorData: Contributtor = {
    slug: contributorData.slug,
    name: contributorData?.contribuidores?.name || "Nombre no disponible",
    rol: contributorData?.contribuidores?.rol || [],
    socialLinks: contributorData?.contribuidores?.socialLinks || {},
    cv: contributorData?.contribuidores?.cv?.node?.link,
    banner: contributorData?.contribuidores?.banner?.node,
    profilepic: contributorData?.contribuidores?.profilepic?.node,
    customcolor: contributorData?.contribuidores?.customcolor,
    description: contributorData?.contribuidores?.description,
    email: contributorData?.contribuidores?.email,
    posts:
      userConnection?.posts?.nodes.map((post): Post => {
        return {
          ...post,
          image: post.featuredImage?.node,
        };
      }) || [],
    author: userConnection?.posts?.nodes[0]?.author.node || {},
  };

  return authorData;
  } catch (error) {
    console.error("Error fetching contributor:", error);
    throw new Error(`Failed to fetch contributor with slug: ${slug}`);
  }
}
