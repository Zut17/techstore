import { useEffect } from "react";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} | TechStore`
      : "TechStore, informatique et électronique";
  }, [title]);
}
