/**
 * Converts text to a URL-safe slug, preserving Unicode letters and numbers.
 * English names: "Dr. Mahmood Heydari" -> "dr-mahmood-heydari"
 */
export function slugify(text: string): string {
  return text
    .normalize("NFC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
}
