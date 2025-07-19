export const sanitizeHtml = (input: string) =>
  input.replace(/<script.*?>.*?<\/script>/gi, "").replace(/on\w+=".*?"/gi, "");
