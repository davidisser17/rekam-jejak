/**
 * Generate a URL-friendly slug from a name string.
 * "Sri Mulyani Indrawati" → "sri-mulyani-indrawati"
 */
export function toSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')   // remove non-alphanumeric except spaces/hyphens
    .replace(/\s+/g, '-')            // replace spaces with hyphens
    .replace(/-+/g, '-');            // collapse multiple hyphens
}

/**
 * Build the full URL param: "sri-mulyani-indrawati--HBRrOAeOpq5TR6o6d12G"
 */
export function toOfficialParam(name, id) {
  return `${toSlug(name)}--${id}`;
}

/**
 * Extract the Firebase document ID from a URL param.
 * "sri-mulyani-indrawati--HBRrOAeOpq5TR6o6d12G" → "HBRrOAeOpq5TR6o6d12G"
 */
export function extractIdFromParam(param) {
  const parts = param.split('--');
  return parts[parts.length - 1];
}
