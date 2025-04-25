export function formatedDate(date, locale = "es-ES"){
    const fecha = new Date(date);
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(fecha);
}


export function formatedDateShort( date){
    const formatDate = new Date(date);
    const day = formatDate.getDate();
    const before_month = formatDate
      .toLocaleString("default", { month: "long" })
      .slice(0, 3);
    const month = before_month.charAt(0).toUpperCase() + before_month.slice(1);
    const year = formatDate.getFullYear();
    const newDateFormat = `${day} / ${month} / ${year}`;
    return newDateFormat;
}
