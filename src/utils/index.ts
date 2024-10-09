export function replaceIframes(html) {
    const iframeRegex = /<iframe([^>]+?)>/g;
    return html.replace(iframeRegex, (match, attributes) => {
      return `<fast-youtube ${attributes}></fast-youtube>`;
    });
  }