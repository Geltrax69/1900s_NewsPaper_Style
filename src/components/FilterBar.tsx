import { countries, manufacturers } from "../data/cars";

export interface FilterState {
  query: string;
  decade: "all" | "1950s" | "1970s";
  manufacturer: string;
  country: string;
}

export const EMPTY_FILTERS: FilterState = {
  query: "",
  decade: "all",
  manufacturer: "",
  country: "",
};

const inputClass =
  "font-text text-[0.95rem] bg-[#faf5e6] border border-rule px-2.5 py-1.5 text-ink w-full";
const labelClass =
  "font-label uppercase tracking-[0.14em] text-[0.65rem] text-faded block mb-1";

export function FilterBar({
  filters,
  onChange,
  resultCount,
  showDecade = true,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
  showDecade?: boolean;
}) {
  const set = (patch: Partial<FilterState>) => onChange({ ...filters, ...patch });
  const isDefault =
    filters.query === "" &&
    filters.decade === "all" &&
    filters.manufacturer === "" &&
    filters.country === "";

  return (
    <section aria-label="Search and filter cars" className="border-y border-rule py-4 my-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
        <div>
          <label htmlFor="car-search" className={labelClass}>
            Search
          </label>
          <input
            id="car-search"
            type="search"
            value={filters.query}
            onChange={(e) => set({ query: e.target.value })}
            placeholder="Model or manufacturer…"
            className={inputClass}
          />
        </div>
        {showDecade && (
          <div>
            <label htmlFor="decade-filter" className={labelClass}>
              Decade
            </label>
            <select
              id="decade-filter"
              value={filters.decade}
              onChange={(e) =>
                set({ decade: e.target.value as FilterState["decade"] })
              }
              className={inputClass}
            >
              <option value="all">All</option>
              <option value="1950s">1950s</option>
              <option value="1970s">1970s</option>
            </select>
          </div>
        )}
        <div>
          <label htmlFor="mfr-filter" className={labelClass}>
            Manufacturer
          </label>
          <select
            id="mfr-filter"
            value={filters.manufacturer}
            onChange={(e) => set({ manufacturer: e.target.value })}
            className={inputClass}
          >
            <option value="">All manufacturers</option>
            {manufacturers.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="country-filter" className={labelClass}>
            Country
          </label>
          <select
            id="country-filter"
            value={filters.country}
            onChange={(e) => set({ country: e.target.value })}
            className={inputClass}
          >
            <option value="">All countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-3">
          <p className="font-label text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft m-0 whitespace-nowrap tabular-nums" aria-live="polite">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </p>
          <button
            onClick={() => onChange({ ...EMPTY_FILTERS, decade: showDecade ? "all" : filters.decade })}
            disabled={isDefault}
            className="pressable font-label uppercase tracking-[0.14em] text-[0.7rem] text-burgundy bg-transparent border border-burgundy px-3 py-1.5 cursor-pointer hover:bg-burgundy hover:text-paper disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}

export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="border border-dashed border-faded px-6 py-12 text-center my-6">
      <p className="headline text-2xl mb-2">Nothing in the archive matches.</p>
      <p className="font-text text-ink-soft mb-4">
        No cars fit that combination of search and filters. Try broadening your
        terms.
      </p>
      <button
        onClick={onReset}
        className="pressable font-label uppercase tracking-[0.14em] text-[0.72rem] text-paper bg-burgundy border border-burgundy px-4 py-2 cursor-pointer hover:bg-transparent hover:text-burgundy"
      >
        Clear all filters
      </button>
    </div>
  );
}
