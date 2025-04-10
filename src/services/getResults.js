import { wpquery } from "@src/data/wordpress";
export const getResults = async (search) =>{
 try{
  const data = await wpquery({
    query: `
       query getResults {
        posts(where: {search: "${search}"}) {
            nodes {
            excerpt
            date
            slug
            title(format: RENDERED)
            featuredImage {
                node {
                altText
                mediaItemUrl
                sizes(size: MEDIUM)
                srcSet(size: MEDIUM)
                }
            }
            categories {
                nodes {
                slug
                name
                }
            }
            author {
                node {
                avatar {
                    url
                    default
                }
                firstName
                lastName
                name
                }
            }
            }
        }
        }
    `
})
    console.log(data)
  return data;
 } catch (error) {
  console.log(error)
 }
}


export const searchPosts = async (search) =>{
    try{
        const data = await wpquery({
            query: `
       query getResults {
        posts(where: {search: "${search}"}) {
            nodes {
            excerpt
            date
            slug
            title(format: RENDERED)
            featuredImage {
                node {
                altText
                mediaItemUrl
                sizes(size: MEDIUM)
                srcSet(size: MEDIUM)
                }
            }
            categories {
                nodes {
                slug
                name
                }
            }
            author {
                node {
                avatar {
                    url
                    default
                }
                firstName
                lastName
                name
                }
            }
            }
        }
        }
    `
        })
        const results = data?.posts?.nodes ? data.posts.nodes.map((post) => {
            const { featuredImage, categories, author, ...rest } = post;
            return {
                image: featuredImage?.node?.mediaItemUrl || "",
                srcSet: featuredImage?.node?.srcSet || "",
                sizes: featuredImage?.node?.sizes || "",
                altdesc: featuredImage?.node?.altText || "",
                categories: categories?.nodes || [],
                author: author?.node?.name || "",
                authorImage: author?.node?.avatar?.url || "",
                authorFirstName: author?.node?.firstName || "",
                authorLastName: author?.node?.lastName || "",
                ...rest,
            };
        }) : [];
        return results
    } catch (error) {
        console.log(error)
    }
}