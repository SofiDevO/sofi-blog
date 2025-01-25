export function replaceIframes(html) {
    const iframeRegex = /<iframe([^>]+?)>/g;
    return html.replace(iframeRegex, (match, attributes) => {
      return `<fast-youtube ${attributes}></fast-youtube>`;
    });
}

export function dateFormated(date:string){

  const fecha = new Date(date);

  const formatt = fecha.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  return formatt

}