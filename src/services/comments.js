import { wpquery } from "@src/data/wordpress";
export const getCommentsByPostSlug = async (slug) => {
    try {
        const data = await wpquery({
            query: `
                query getComments {
                    postBy(slug: "${slug}") {
                        comments {
                            nodes {
                                content
                                author {
                                    node {
                                        name
                                        avatar {
                                            url
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