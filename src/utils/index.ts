export function replaceIframes(html: string): string {
    const iframeRegex = /<iframe([^>]+?)>(?:[\s\S]*?<\/iframe>)?/g;
    return html.replace(iframeRegex, (_, attributes) => {
        const cleanAttr = attributes.endsWith('/') ? attributes.slice(0, -1) : attributes;
        return `<fast-youtube ${cleanAttr}></fast-youtube>`;
    });
}
