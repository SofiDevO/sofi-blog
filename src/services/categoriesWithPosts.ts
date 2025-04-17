import { wpquery } from "@src/data/wordpress";
import type { CardPost, CategoryWithPosts } from '@src/types/post.type.ts';

export interface Category {
    [key: string]:CategoryWithPosts;
}
export const getCategoriesWithPosts = async () => {
    const categories = await wpquery({
        query : `
            query getCategoriesWithPosts {

                categories {
                    nodes {
                        name
                        id
                        slug
                        databaseId
                        posts {
                            nodes {
                             categories {
                                nodes {
                                    name
                                    slug
                                    parentId
                                    databaseId
                                }
                            }
                                excerpt(format: RENDERED)
                                author {
                                    node {
                                       avatar {
                                        url
                                    }
                                    firstName
                                    lastName
                                    name
                                    slug
                                    }
                                }
                                date
                                 featuredImage {
                                    node {
                                    altText
                                    mediaItemUrl
                                    srcSet(size: MEDIUM)
                                    sizes(size: LARGE)
                                    altText
                                    link
                                    sourceUrl(size: LARGE)
                                    }
                                }
                                slug
                                title(format: RENDERED)
                            }
                        }
                    }
                }
            }

        `,
    })
    const categoriesWithPosts: CategoryWithPosts[] = categories.categories.nodes.map((category: any) => {
        return {
            name: category.name,
            slug: category.slug,
            id: category.id,
            databaseId: category.databaseId,
            posts: category.posts?.nodes?.map((post: any) => {
                return {
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt.replace(/\[.*?\]/g, "..."),
                    date: post.date,
                    image: post?.featuredImage?.node ,
                    author: post.author.node,
                    categories: post?.categories?.nodes
                };
            }),
        };
    });
    return categoriesWithPosts;
    // const categorizedByName: Record<string, CategoryWithPosts> = categoriesData.categories.nodes.reduce(
    //     (acc, { name, slug, id, posts }: any) => {
    //       const parsedPosts = (posts?.nodes || []).map((post: any) => {
    //         const { title, slug, excerpt = '', date, featuredImage } = post;
    //         return {
    //           title,
    //           slug,
    //           excerpt: excerpt.replace(/<[^>]+>/g, ''),
    //           date,
    //           image: featuredImage?.node,
    //         };
    //       });

    //       acc[name] = {
    //         name,
    //         slug,
    //         id,
    //         posts: parsedPosts,
    //       };

    //       return acc;
    //     },
    //     {} as Record<string, CategoryWithPosts>
    // );


}