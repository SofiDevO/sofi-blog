export function replaceIframes(html: string | null | undefined): string {
    if (html === null || html === undefined || typeof html !== "string" || html.trim() === "") {
        return "";
    }
    const iframeRegex = /<iframe([^>]+?)>(?:[\s\S]*?<\/iframe>)?/g;
    return html.replace(iframeRegex, (_, attributes) => {
        const cleanAttr = attributes.endsWith('/') ? attributes.slice(0, -1) : attributes;
        return `<fast-youtube ${cleanAttr}></fast-youtube>`;
    });
}
