export function generateSlug(text: string): string {
  return text
    .toLowerCase() // convert to lowercase
    .trim() // remove leading/trailing spaces
    .normalize("NFD") // handle accented characters
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars except spaces and hyphens
    .replace(/[\s-]+/g, "-") // replace spaces and multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // remove leading/trailing hyphens
}
