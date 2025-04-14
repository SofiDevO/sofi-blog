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
                        posts {
                            nodes {
                                excerpt
                                author {
                                    node {
                                        avatar {
                                            url
                                        }
                                        name
                                    }
                                }
                                date
                                featuredImage {
                                    node {
                                        altText
                                        srcSet(size: THUMBNAIL)
                                        title
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
            posts: category.posts?.nodes?.map((post: any) => {
                return {
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt.replace(/<[^>]+>/g, ''),
                    date: post.date,
                    image: post.featuredImage.node,
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