export function replaceIframes(html: string): string {
    const iframeRegex = /<iframe([^>]+?)>/g;
    return html.replace(iframeRegex, (_, attributes) => {
        return `<fast-youtube ${attributes}></fast-youtube>`;
    });
}
