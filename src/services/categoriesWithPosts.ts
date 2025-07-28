import { wpquery } from "@src/data/wordpress";
import type { CategoryWithPosts } from "@src/types/category.type";
import type { Post } from "@src/types/post.type";

export const getCategoriesWithPosts = async () => {
    const categories: { categories?: { nodes?: any[] } } = await wpquery({
        query : `
            query getCategoriesWithPosts {

                categories(last: 100) {
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
    const categoriesWithPosts: CategoryWithPosts[] = categories.
        categories?.nodes?.map((category: any):CategoryWithPosts => {
            return {
                name: category.name,
                slug: category.slug,
                id: category.id,
                databaseId: category.databaseId,
                posts: category.posts?.nodes?.map((post: any):Post => {
                    return {
                        title: post.title,
                        slug: post.slug,
                        excerpt: post.excerpt.replace(/\[.*?\]/g, "..."),
                        date: post.date,
                        image: post?.featuredImage?.node,
                        author: post.author?.node,
                        categories: post?.categories?.nodes,
                    };
                }) || [],
            };
    });
    const categoriesGroupByID = Object.groupBy(categoriesWithPosts,({ slug }) => slug);
    return categoriesGroupByID;
}