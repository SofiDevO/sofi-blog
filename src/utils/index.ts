export function replaceIframes(html: string | null | undefined): string {
    if (!html || typeof html !== "string") {
        return "";
    }
    const iframeRegex = /<iframe([^>]+?)>(?:[\s\S]*?<\/iframe>)?/g;
    return html.replace(iframeRegex, (_, attributes) => {
        const cleanAttr = attributes.endsWith('/') ? attributes.slice(0, -1) : attributes;
        return `<fast-youtube ${cleanAttr}></fast-youtube>`;
    });
}
