import type { Route } from "../hooks/useHashRoute";
import { routeToHash } from "../hooks/useHashRoute";

export function Masthead({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <header className="pt-8 pb-4 px-4 text-center">
      <p className="kicker text-faded mb-3">Est. MMXXVI · Price One Shilling</p>
      <button
        onClick={() => navigate({ name: "front" })}
        className="cursor-pointer bg-transparent border-0 p-0"
        aria-label="The Motoring Gazette — front page"
      >
        <h1 className="headline text-ink text-[clamp(2.6rem,8vw,5.5rem)] m-0">
          The Motoring Gazette
        </h1>
      </button>
      <p className="font-text italic text-ink-soft text-lg mt-2">
        “Remarkable Machines. Enduring Stories.”
      </p>
    </header>
  );
}

export function EditionStrip() {
  return (
    <div className="border-y border-rule">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
        <span className="byline">Collector’s Edition</span>
        <span className="byline">1950s &amp; 1970s</span>
        <span className="byline hidden sm:inline">An Independent Automotive Journal</span>
        <span className="byline sm:hidden">Independent Journal</span>
      </div>
    </div>
  );
}

const NAV_ITEMS: { label: string; route: Route }[] = [
  { label: "Front Page", route: { name: "front" } },
  { label: "The 1950s", route: { name: "decade", decade: "1950s" } },
  { label: "The 1970s", route: { name: "decade", decade: "1970s" } },
  { label: "Compare", route: { name: "compare" } },
  { label: "About", route: { name: "about" } },
];

export function Navigation({
  current,
  navigate,
}: {
  current: Route;
  navigate: (r: Route) => void;
}) {
  const isActive = (r: Route) =>
    r.name === current.name &&
    (r.name !== "decade" ||
      (current.name === "decade" && r.decade === current.decade));

  return (
    <nav aria-label="Sections" className="border-b border-rule">
      <ul className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-1 py-3 list-none m-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a
              href={routeToHash(item.route)}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.route);
              }}
              aria-current={isActive(item.route) ? "page" : undefined}
              className={`font-label uppercase tracking-[0.18em] text-[0.72rem] no-underline transition-colors ${
                isActive(item.route)
                  ? "text-burgundy font-bold"
                  : "text-ink hover:text-burgundy"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <footer className="mt-16 border-t border-rule">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="ornament mb-6" aria-hidden="true">
          <span />
        </div>
        <p className="headline text-2xl text-center mb-2">The Motoring Gazette</p>
        <p className="caption text-center text-sm max-w-xl mx-auto">
          An independent automotive journal. Specifications describe exact
          featured variants; uncertain figures are labelled as such. Car
          imagery is illustration created for this publication.
        </p>
        <p className="text-center mt-4">
          <a
            href="#/about"
            onClick={(e) => {
              e.preventDefault();
              navigate({ name: "about" });
            }}
            className="font-label uppercase tracking-[0.18em] text-[0.7rem] text-burgundy no-underline hover:underline"
          >
            About this journal
          </a>
        </p>
        <p className="byline text-center mt-4">Set by hand · Printed on pixels</p>
      </div>
    </footer>
  );
}
