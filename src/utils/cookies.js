
export function setCookie(name, value, days = 365, sameSite = 'Lax', secure = true) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }

    const cookieSettings = [
      `${name}=${encodeURIComponent(value)}`,
      expires,
      `path=/`,
      `SameSite=${sameSite}`,
      secure ? 'Secure' : ''
    ].join(';');

    document.cookie = cookieSettings;
  }

  export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }

  export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  }