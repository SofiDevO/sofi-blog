import sanitizeHtmlLib from "sanitize-html";

export const sanitizeHtml = (input: string | null): string | null => {
  if (input === null) {
    return null;
  }
  return sanitizeHtmlLib(input);
};
