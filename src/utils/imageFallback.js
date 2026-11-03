export const PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export function showPlaceholder(event) {
  event.currentTarget.onerror = null;
  event.currentTarget.src = PLACEHOLDER_IMAGE;
}
