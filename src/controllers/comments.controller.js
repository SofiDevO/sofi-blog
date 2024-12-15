import Comment from "@src/components/molecules/comment/comment.astro"
export function commentsController() {
    const comments = document.querySelector('section#comments')
    console.log(Comment)
    document.addEventListener('click', async (e) => {

        if (e.target.tagName !== 'BUTTON') return
            const commentId = e.target.getAttribute('data-commentid')
            
            const host = window.location.host.includes('localhost') ? '' : `https://${window.location.host}`
            const replies = await fetch(`${host}/api/comments/replies?commentId=${commentId}`)
            const data = await replies.json()
            console.log(data)

    })   
}