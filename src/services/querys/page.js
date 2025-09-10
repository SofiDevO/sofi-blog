export const queryPage = (id)=> `
    query NewQuery {
        pages(where: {id: ${id}}) {
            nodes {
            title
            blocks(postTemplate: true)
            }
        }
    }
`;
