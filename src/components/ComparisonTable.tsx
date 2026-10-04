import type { Car } from "../data/cars";

const ROWS: { label: string; get: (c: Car) => string }[] = [
  { label: "Year", get: (c) => String(c.year) },
  { label: "Country", get: (c) => c.country },
  { label: "Manufacturer", get: (c) => c.manufacturer },
  { label: "Variant", get: (c) => c.variant },
  {
    label: "Engine",
    get: (c) => c.specs.find((s) => s.label === "Engine")?.value ?? "—",
  },
  {
    label: "Power",
    get: (c) => {
      const s = c.specs.find((s) => s.label === "Power");
      return s ? `${s.value}${s.note ? ` (${s.note})` : ""}` : "—";
    },
  },
  {
    label: "Transmission",
    get: (c) => c.specs.find((s) => s.label === "Transmission")?.value ?? "—",
  },
  {
    label: "Drivetrain",
    get: (c) => c.specs.find((s) => s.label === "Drivetrain")?.value ?? "—",
  },
  {
    label: "Body style",
    get: (c) => c.specs.find((s) => s.label === "Body style")?.value ?? "—",
  },
  { label: "Design character", get: (c) => c.designCharacter },
];

export function ComparisonTable({ a, b }: { a: Car; b: Car }) {
  return (
    <div className="overflow-x-auto border border-rule">
      <table className="w-full border-collapse min-w-[560px]">
        <caption className="caption text-left p-3 text-[0.9rem]">
          Verified specifications for the exact featured variants. Power figures
          carry their measurement standard.
        </caption>
        <thead>
          <tr className="bg-ink text-paper">
            <th scope="col" className="kicker text-left p-3 font-normal">
              <span className="sr-only">Attribute</span>
            </th>
            <th scope="col" className="text-left p-3">
              <span className="headline text-[1.15rem] font-normal block">
                {a.year} {a.make} {a.model}
              </span>
              <span className="byline text-paper/70!">{a.variant}</span>
            </th>
            <th scope="col" className="text-left p-3">
              <span className="headline text-[1.15rem] font-normal block">
                {b.year} {b.make} {b.model}
              </span>
              <span className="byline text-paper/70!">{b.variant}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => {
            const va = row.get(a);
            const vb = row.get(b);
            const differs = va !== vb;
            return (
              <tr key={row.label} className={i % 2 ? "bg-paper-deep/40" : ""}>
                <th
                  scope="row"
                  className="kicker text-left p-3 align-top font-normal text-faded whitespace-nowrap"
                >
                  {row.label}
                </th>
                <td
                  className={`p-3 font-text text-[0.95rem] align-top ${
                    differs ? "font-bold" : ""
                  }`}
                >
                  {va}
                </td>
                <td
                  className={`p-3 font-text text-[0.95rem] align-top ${
                    differs ? "font-bold" : ""
                  }`}
                >
                  {vb}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
