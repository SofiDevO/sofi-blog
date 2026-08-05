export function normalizePinterestUrl(href) {
  try {
    const urlObj = new URL(href);

    if (!urlObj.hostname.includes('pinterest')) {
      return href;
    }

    const targetUrl = urlObj.searchParams.get('url');
    if (!targetUrl) {
      return href;
    }

    let parsedTarget;
    try {
      parsedTarget = new URL(targetUrl);
    } catch {
      return href;
    }

    const canonicalHost = 'sofidev.blog';
    const isSameSite = ['sofidev.blog', 'www.sofidev.blog', 'sofiblog.sofidev.top', 'www.sofidev.top', 'sofidev.top'].includes(parsedTarget.hostname);

    if (!isSameSite) {
      return href;
    }

    parsedTarget.protocol = 'https:';
    parsedTarget.hostname = canonicalHost;
    parsedTarget.port = '';
    parsedTarget.hash = '';
    urlObj.searchParams.set('url', parsedTarget.toString());

    return urlObj.toString();
  } catch {
    return href;
  }
}
