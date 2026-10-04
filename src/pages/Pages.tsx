import { useMemo, useState } from "react";
import { allCars, cars, cars1970s, type Car } from "../data/cars";
import { decadeIntros, leadStory } from "../data/editorial";
import type { Route } from "../hooks/useHashRoute";
import { routeToHash } from "../hooks/useHashRoute";
import { ArchiveSidebar } from "../components/ArchiveSidebar";
import { CarCard, CarFeature, ReadStoryLink } from "../components/CarBits";
import { ComparisonTable } from "../components/ComparisonTable";
import { EmptyState, FilterBar, EMPTY_FILTERS, type FilterState } from "../components/FilterBar";

type Nav = (r: Route) => void;

function applyFilters(list: Car[], f: FilterState): Car[] {
  const q = f.query.trim().toLowerCase();
  return list.filter((c) => {
    if (f.decade !== "all" && c.decade !== f.decade) return false;
    if (f.manufacturer && c.manufacturer !== f.manufacturer) return false;
    if (f.country && c.country !== f.country) return false;
    if (q) {
      const hay = `${c.year} ${c.make} ${c.model} ${c.variant} ${c.manufacturer} ${c.country}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

/* ------------------------------- Front page ------------------------------- */

export function FrontPage({ navigate }: { navigate: Nav }) {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);
  const results = useMemo(() => applyFilters(allCars, filters), [filters]);

  return (
    <>
      <LeadStory navigate={navigate} />

      <div className="rule-double my-8" aria-hidden="true" />

      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        <div>
          <section aria-labelledby="collection-h">
            <p className="kicker text-faded">The Collection</p>
            <h2 id="collection-h" className="headline text-[2.2rem] mt-1 mb-1">
              Eight Machines, Two Decades
            </h2>
            <p className="font-text italic text-ink-soft">
              Search the archive, or filter by decade, manufacturer, and country.
            </p>
            <FilterBar filters={filters} onChange={setFilters} resultCount={results.length} />
            {results.length === 0 ? (
              <EmptyState onReset={() => setFilters(EMPTY_FILTERS)} />
            ) : (
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10 mt-2">
                {results.map((car) => (
                  <CarCard key={car.id} car={car} navigate={navigate} />
                ))}
              </div>
            )}
          </section>

          <div className="ornament my-10" aria-hidden="true">
            <span />
          </div>

          {(["1950s", "1970s"] as const).map((decade) => {
            const intro = decadeIntros.find((d) => d.decade === decade)!;
            const list = decade === "1950s" ? cars : cars1970s;
            const route: Route = { name: "decade", decade };
            return (
              <section key={decade} aria-labelledby={`${decade}-h`} className="mb-12">
                <p className="kicker text-faded">{intro.kicker}</p>
                <h2 id={`${decade}-h`} className="headline text-[2.2rem] mt-1">
                  <a
                    href={routeToHash(route)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(route);
                    }}
                    className="text-ink no-underline hover:text-burgundy"
                  >
                    {intro.title}
                  </a>
                </h2>
                <p className="font-text text-[1.02rem] leading-relaxed text-ink-soft max-w-2xl">
                  {intro.standfirst}
                </p>
                <div className="mt-6 space-y-10">
                  {list.slice(0, 2).map((car, i) => (
                    <CarFeature key={car.id} car={car} navigate={navigate} flip={i % 2 === 1} />
                  ))}
                </div>
                <p className="mt-6">
                  <a
                    href={routeToHash(route)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(route);
                    }}
                    className="font-label uppercase tracking-[0.16em] text-[0.72rem] text-burgundy no-underline border-b border-burgundy/50 pb-0.5 hover:border-burgundy"
                  >
                    Enter the {decade} section →
                  </a>
                </p>
              </section>
            );
          })}
        </div>

        <ArchiveSidebar />
      </div>
    </>
  );
}

function LeadStory({ navigate }: { navigate: Nav }) {
  const hero = cars.find((c) => c.id === "1959-cadillac-eldorado")!;
  return (
    <section aria-labelledby="lead-h" className="grid lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-3">
        <button
          onClick={() => navigate({ name: "article", id: hero.id })}
          className="photo-frame block w-full cursor-pointer bg-transparent p-1.5 text-left"
          aria-label={`Read the full story: ${hero.year} ${hero.make} ${hero.model}`}
        >
          <img
            src={hero.images.front.src}
            alt={hero.images.front.alt}
            width={1200}
            height={675}
            fetchPriority="high"
          />
        </button>
        <p className="caption text-[0.85rem] mt-2">
          {hero.images.front.caption}{" "}
          <span className="not-italic font-label text-[0.65rem] uppercase tracking-[0.12em]">
            · Illustration
          </span>
        </p>
      </div>
      <div className="lg:col-span-2">
        <p className="kicker text-burgundy">{leadStory.kicker}</p>
        <h2 id="lead-h" className="headline text-[clamp(2rem,4vw,3rem)] mt-2 mb-3">
          {leadStory.headline}
        </h2>
        <p className="font-text italic text-[1.05rem] text-ink-soft leading-relaxed mb-4">
          {leadStory.standfirst}
        </p>
        <div className="font-text text-[0.98rem] leading-[1.75] text-ink-soft space-y-4">
          <p className="drop-cap m-0">{leadStory.paragraphs[0]}</p>
          <p className="m-0">{leadStory.paragraphs[1]}</p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6 pt-4 border-t border-rule">
          <a
            href="#/1950s"
            onClick={(e) => {
              e.preventDefault();
              navigate({ name: "decade", decade: "1950s" });
            }}
            className="font-label uppercase tracking-[0.16em] text-[0.72rem] text-burgundy no-underline border-b border-burgundy/50 pb-0.5 hover:border-burgundy"
          >
            Explore the 1950s →
          </a>
          <a
            href="#/1970s"
            onClick={(e) => {
              e.preventDefault();
              navigate({ name: "decade", decade: "1970s" });
            }}
            className="font-label uppercase tracking-[0.16em] text-[0.72rem] text-burgundy no-underline border-b border-burgundy/50 pb-0.5 hover:border-burgundy"
          >
            Explore the 1970s →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Decade page ------------------------------ */

export function DecadePage({
  decade,
  navigate,
}: {
  decade: "1950s" | "1970s";
  navigate: Nav;
}) {
  const intro = decadeIntros.find((d) => d.decade === decade)!;
  const list = decade === "1950s" ? cars : cars1970s;
  const [filters, setFilters] = useState<FilterState>({ ...EMPTY_FILTERS, decade });
  const results = useMemo(
    () => applyFilters(list, { ...filters, decade }),
    [filters, list, decade]
  );

  return (
    <>
      <p className="kicker text-burgundy">{intro.kicker}</p>
      <h2 className="headline text-[clamp(2.2rem,5vw,3.6rem)] mt-2 mb-3">{intro.title}</h2>
      <p className="font-text italic text-[1.1rem] text-ink-soft max-w-3xl leading-relaxed">
        {intro.standfirst}
      </p>
      <div className="grid md:grid-cols-3 gap-6 mt-6 font-text text-[0.98rem] leading-[1.75] text-ink-soft">
        {intro.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "drop-cap m-0" : "m-0"}>
            {p}
          </p>
        ))}
      </div>

      <div className="rule-double my-8" aria-hidden="true" />

      <FilterBar
        filters={filters}
        onChange={setFilters}
        resultCount={results.length}
        showDecade={false}
      />
      {results.length === 0 ? (
        <EmptyState onReset={() => setFilters({ ...EMPTY_FILTERS, decade })} />
      ) : (
        <div className="space-y-12 mt-4">
          {results.map((car, i) => (
            <div key={car.id}>
              <CarFeature car={car} navigate={navigate} flip={i % 2 === 1} />
              {i < results.length - 1 && (
                <div className="ornament mt-12" aria-hidden="true">
                  <span />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ------------------------------- Compare page ------------------------------ */

export function ComparePage({ navigate }: { navigate: Nav }) {
  const [aId, setAId] = useState(allCars[2].id);
  const [bId, setBId] = useState(allCars[6].id);
  const a = allCars.find((c) => c.id === aId)!;
  const b = allCars.find((c) => c.id === bId)!;

  const selectClass =
    "font-text text-[0.95rem] bg-[#faf5e6] border border-rule px-2.5 py-2 text-ink w-full";

  return (
    <>
      <p className="kicker text-burgundy">The Comparison Desk</p>
      <h2 className="headline text-[clamp(2rem,4.5vw,3.2rem)] mt-2 mb-3">
        Two Cars, Side by Side
      </h2>
      <p className="font-text italic text-ink-soft max-w-2xl mb-6">
        Choose any two featured cars to compare their verified specifications.
        Differing figures are set in bold for easy scanning.
      </p>
      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mb-8">
        <div>
          <label htmlFor="compare-a" className="font-label uppercase tracking-[0.14em] text-[0.65rem] text-faded block mb-1">
            First car
          </label>
          <select id="compare-a" value={aId} onChange={(e) => setAId(e.target.value)} className={selectClass}>
            {allCars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.year} {c.make} {c.model}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="compare-b" className="font-label uppercase tracking-[0.14em] text-[0.65rem] text-faded block mb-1">
            Second car
          </label>
          <select id="compare-b" value={bId} onChange={(e) => setBId(e.target.value)} className={selectClass}>
            {allCars.map((c) => (
              <option key={c.id} value={c.id}>
                {c.year} {c.make} {c.model}
              </option>
            ))}
          </select>
        </div>
      </div>
      {a.id === b.id ? (
        <p className="font-text italic text-ink-soft border border-dashed border-faded p-6 text-center">
          Select two different cars to compare them.
        </p>
      ) : (
        <>
          <ComparisonTable a={a} b={b} />
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-6">
            <ReadStoryLink car={a} navigate={navigate} label={`Full story: ${a.make} ${a.model}`} />
            <ReadStoryLink car={b} navigate={navigate} label={`Full story: ${b.make} ${b.model}`} />
          </div>
        </>
      )}
    </>
  );
}
