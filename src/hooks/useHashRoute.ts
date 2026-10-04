import { useCallback, useEffect, useState } from "react";

export type Route =
  | { name: "front" }
  | { name: "decade"; decade: "1950s" | "1970s" }
  | { name: "article"; id: string }
  | { name: "compare" }
  | { name: "about" };

export function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, "");
  if (path === "" || path === "/") return { name: "front" };
  if (path === "1950s" || path === "1970s")
    return { name: "decade", decade: path };
  if (path === "compare") return { name: "compare" };
  if (path === "about") return { name: "about" };
  const m = path.match(/^car\/([\w-]+)$/);
  if (m) return { name: "article", id: m[1] };
  return { name: "front" };
}

export function routeToHash(route: Route): string {
  switch (route.name) {
    case "front":
      return "#/";
    case "decade":
      return `#/${route.decade}`;
    case "article":
      return `#/car/${route.id}`;
    case "compare":
      return "#/compare";
    case "about":
      return "#/about";
  }
}

export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(() =>
    parseHash(window.location.hash)
  );

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const navigate = useCallback((r: Route) => {
    const h = routeToHash(r);
    if (window.location.hash === h) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.location.hash = h;
    }
  }, []);

  return [route, navigate];
}
