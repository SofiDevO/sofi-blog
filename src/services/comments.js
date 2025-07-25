import { wpquery } from "@src/data/wordpress";
const { SECRET_USER, SECRET_PASSWORD   } = import.meta.env

export const getCommentsByPostSlug = async (slug) => {

    const headers = {
        'Authorization': 'Basic ' + btoa(SECRET_USER + ':' + SECRET_PASSWORD)
    }
    try {
        const data = await wpquery({
            query: `
                query getComments {
                    postBy(slug: "${slug}") {
                        comments(last: 100) {
                            nodes {
                                content
                                author {
                                    node {
                                        name
                                        avatar {
                                            url
                                        }
                                        ... on User {
                                          roles {
                                            nodes {
                                                name
                                            }
                                          }
                                        } 
                                    }
                                }
                                id
                                date
                                parentId
                            }
                        }
                    }
                }
            `,
          headers: headers
        });

        if (data.postBy === null) {
            throw new Error("Post not found");
        }
        const filterReplies = (comment) => {
            return comment.parentId === null
        }

        const comments = data.postBy.comments.nodes.filter(filterReplies)

        return comments
    }
    catch (error) {
        return []
    }

}

export const getRepliesByCommentId = async (id) => {
    try {
        const data = await wpquery({
            query: `
                query getRepliesByCommentId {
                    comment(id: "${id}") {
                        replies(where: {orderby: COMMENT_DATE}) {
                            nodes {
                                content
                                author {
                                    node {
                                        avatar {
                                            url
                                        }
                                        email
                                        name
                                    }
                                }
                                id
                                date
                                parentId
                            }
                        }
                    }
                }
            `,
        });
        return data.comment.replies.nodes
    }
    catch (error) {
        return []
    }
}
