const host = window.location.host.includes('localhost') ? '' : `https://${window.location.host}`

export function commentsController() {
    const comments = document.querySelector('section#comments')
    document.addEventListener('click', async (e) => {

        if (e.target.tagName !== 'BUTTON') return
            const commentId = e.target.getAttribute('data-commentid')

            const replies = await fetch(`${host}/api/comments/replies?commentId=${commentId}`)
            const data = await replies.json()
            console.log(data)

    })
}
