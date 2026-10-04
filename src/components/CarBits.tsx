import type { Car, CarSpec } from "../data/cars";
import type { Route } from "../hooks/useHashRoute";
import { routeToHash } from "../hooks/useHashRoute";

export function SpecificationPanel({ specs }: { specs: CarSpec[] }) {
  return (
    <div className="border border-rule">
      <h4 className="kicker bg-ink text-paper px-3 py-2 m-0">Specification</h4>
      <dl className="m-0 divide-y divide-rule/30">
        {specs.map((s) => (
          <div key={s.label} className="px-3 py-2 grid grid-cols-[7rem_1fr] gap-2">
            <dt className="font-label uppercase tracking-[0.12em] text-[0.65rem] text-faded pt-0.5">
              {s.label}
            </dt>
            <dd className="m-0 font-text text-[0.95rem] leading-snug">
              {s.value}
              {s.note && (
                <span className="block text-faded text-[0.8rem] italic mt-0.5">
                  {s.note}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function CollectorsNote({ note }: { note: string }) {
  return (
    <aside className="border-l-4 border-burgundy pl-4 py-1 my-4" aria-label="Collector's note">
      <p className="kicker text-burgundy mb-1">Collector’s Note</p>
      <p className="font-text italic text-[0.95rem] leading-relaxed m-0">{note}</p>
    </aside>
  );
}

export function SourceCredits({
  sources,
  images,
}: {
  sources: Car["sources"];
  images: Car["images"];
}) {
  const credits = [...new Set(Object.values(images).map((i) => i.credit))];
  return (
    <section aria-label="Sources and credits" className="mt-8">
      <h3 className="kicker text-faded border-b border-rule pb-2 mb-3">
        Sources &amp; Credits
      </h3>
      <ul className="list-none m-0 p-0 space-y-1">
        {sources.map((s) => (
          <li key={s.url} className="font-text text-[0.9rem]">
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-burgundy underline decoration-burgundy/40 underline-offset-2 hover:decoration-burgundy"
            >
              {s.name}
            </a>
          </li>
        ))}
      </ul>
      <p className="caption text-[0.85rem] mt-2">
        Imagery: {credits.join("; ")}.
      </p>
    </section>
  );
}

export function CarByline({ car }: { car: Car }) {
  return (
    <p className="byline">
      {car.year} · {car.country} · {car.manufacturer}
    </p>
  );
}

export function ReadStoryLink({
  car,
  navigate,
  label = "Read the full story",
}: {
  car: Car;
  navigate: (r: Route) => void;
  label?: string;
}) {
  const route: Route = { name: "article", id: car.id };
  return (
    <a
      href={routeToHash(route)}
      onClick={(e) => {
        e.preventDefault();
        navigate(route);
      }}
      className="font-label uppercase tracking-[0.16em] text-[0.72rem] text-burgundy no-underline border-b border-burgundy/50 pb-0.5 hover:border-burgundy"
    >
      {label} →
    </a>
  );
}

/** Teaser card used in grids and lists. */
export function CarCard({
  car,
  navigate,
  imageFirst = false,
}: {
  car: Car;
  navigate: (r: Route) => void;
  imageFirst?: boolean;
}) {
  return (
    <article className="flex flex-col h-full">
      <div className={imageFirst ? "order-first" : ""}>
        <button
          onClick={() => navigate({ name: "article", id: car.id })}
          className="photo-frame block w-full cursor-pointer bg-transparent p-1.5 text-left"
          aria-label={`Read the full story: ${car.year} ${car.make} ${car.model}`}
        >
          <img
            src={car.images.front.src}
            alt={car.images.front.alt}
            loading="lazy"
            width={800}
            height={450}
          />
        </button>
        <p className="caption text-[0.8rem] mt-1.5">{car.images.front.caption}</p>
      </div>
      <CarByline car={car} />
      <h3 className="headline text-[1.65rem] mt-1 mb-2">
        <a
          href={routeToHash({ name: "article", id: car.id })}
          onClick={(e) => {
            e.preventDefault();
            navigate({ name: "article", id: car.id });
          }}
          className="text-ink no-underline hover:text-burgundy"
        >
          {car.headline}
        </a>
      </h3>
      <p className="font-text text-[0.95rem] leading-relaxed text-ink-soft m-0 mb-3">
        {car.intro}
      </p>
      <div className="mt-auto">
        <ReadStoryLink car={car} navigate={navigate} />
      </div>
    </article>
  );
}

/** Full editorial feature: image beside text on desktop, stacked on mobile. */
export function CarFeature({
  car,
  navigate,
  flip = false,
}: {
  car: Car;
  navigate: (r: Route) => void;
  flip?: boolean;
}) {
  return (
    <article className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">
      <div className={flip ? "md:order-2" : ""}>
        <button
          onClick={() => navigate({ name: "article", id: car.id })}
          className="photo-frame block w-full cursor-pointer bg-transparent p-1.5 text-left"
          aria-label={`Read the full story: ${car.year} ${car.make} ${car.model}`}
        >
          <img
            src={car.images.front.src}
            alt={car.images.front.alt}
            loading="lazy"
            width={800}
            height={450}
          />
        </button>
        <p className="caption text-[0.85rem] mt-2">{car.images.front.caption}</p>
      </div>
      <div className={flip ? "md:order-1" : ""}>
        <CarByline car={car} />
        <h3 className="headline text-[2rem] leading-[1.05] mt-1 mb-2">
          <a
            href={routeToHash({ name: "article", id: car.id })}
            onClick={(e) => {
              e.preventDefault();
              navigate({ name: "article", id: car.id });
            }}
            className="text-ink no-underline hover:text-burgundy"
          >
            {car.headline}
          </a>
        </h3>
        <p className="font-text text-[1rem] leading-relaxed text-ink-soft">
          {car.intro}
        </p>
        <p className="font-label uppercase tracking-[0.12em] text-[0.65rem] text-faded mt-3">
          {car.variant}
        </p>
        <div className="mt-4">
          <ReadStoryLink car={car} navigate={navigate} />
        </div>
      </div>
    </article>
  );
}
