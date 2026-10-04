import { allCars, getCar } from "../data/cars";
import { aboutContent } from "../data/editorial";
import type { Route } from "../hooks/useHashRoute";
import { routeToHash } from "../hooks/useHashRoute";
import {
  CarByline,
  CollectorsNote,
  ReadStoryLink,
  SourceCredits,
  SpecificationPanel,
} from "../components/CarBits";
import { ImageGallery } from "../components/Lightbox";

type Nav = (r: Route) => void;

export function ArticlePage({ id, navigate }: { id: string; navigate: Nav }) {
  const car = getCar(id);

  if (!car) {
    return (
      <div className="border border-dashed border-faded px-6 py-12 text-center my-6">
        <p className="headline text-2xl mb-2">Article not found.</p>
        <p className="font-text text-ink-soft mb-4">
          The archive has no record of this car. It may have been moved or
          misfiled.
        </p>
        <button
          onClick={() => navigate({ name: "front" })}
          className="font-label uppercase tracking-[0.14em] text-[0.72rem] text-paper bg-burgundy border border-burgundy px-4 py-2 cursor-pointer hover:bg-transparent hover:text-burgundy"
        >
          Return to the front page
        </button>
      </div>
    );
  }

  const galleryImages = [
    car.images.front,
    car.images.side,
    car.images.rear,
    car.images.interior,
  ];
  const related = allCars
    .filter((c) => c.id !== car.id && c.decade === car.decade)
    .slice(0, 3);

  return (
    <article>
      <p className="kicker text-burgundy">The Full Story</p>
      <h2 className="headline text-[clamp(2.2rem,5vw,3.8rem)] mt-2 mb-2">
        {car.headline}
      </h2>
      <p className="font-text italic text-[1.15rem] text-ink-soft leading-relaxed max-w-3xl mb-3">
        {car.year} {car.make} {car.model} — {car.intro}
      </p>
      <CarByline car={car} />
      <p className="byline mt-1">Illustrations · Not historical photographs</p>

      <figure className="my-8">
        <div className="photo-frame">
          <img
            src={car.images.front.src}
            alt={car.images.front.alt}
            width={1200}
            height={675}
            fetchPriority="high"
          />
        </div>
        <figcaption className="caption text-[0.9rem] mt-2">
          {car.images.front.caption}{" "}
          <span className="not-italic font-label text-[0.65rem] uppercase tracking-[0.12em]">
            · {car.images.front.credit}
          </span>
        </figcaption>
      </figure>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">
        <div className="font-text text-[1.02rem] leading-[1.8] text-ink-soft">
          {car.body.map((p, i) => (
            <p key={i} className={i === 0 ? "drop-cap mt-0 mb-5" : "mt-0 mb-5"}>
              {p}
            </p>
          ))}
          <CollectorsNote note={car.collectorsNote} />

          <h3 className="headline text-[1.6rem] text-ink mt-8 mb-4">Gallery</h3>
          <ImageGallery images={galleryImages} />
          <p className="caption text-[0.85rem] mt-2">
            All illustrations created for The Motoring Gazette — detailed
            studies, not historical photographs.
          </p>

          <SourceCredits sources={car.sources} images={car.images} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6">
          <SpecificationPanel specs={car.specs} />
          <section aria-label="Related cars" className="border border-rule p-4">
            <h3 className="kicker text-faded mb-3">Related cars</h3>
            <ul className="list-none m-0 p-0 space-y-3">
              {related.map((r) => (
                <li key={r.id}>
                  <a
                    href={routeToHash({ name: "article", id: r.id })}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate({ name: "article", id: r.id });
                    }}
                    className="no-underline group"
                  >
                    <span className="byline">
                      {r.year} · {r.country}
                    </span>
                    <span className="headline text-[1.15rem] block text-ink group-hover:text-burgundy">
                      {r.headline}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <div className="rule-double my-10" aria-hidden="true" />
      <p>
        <button
          onClick={() => {
            if (window.history.length > 1) window.history.back();
            else navigate({ name: "decade", decade: car.decade });
          }}
          className="font-label uppercase tracking-[0.16em] text-[0.72rem] text-burgundy bg-transparent border-0 border-b border-burgundy/50 pb-0.5 cursor-pointer hover:border-burgundy p-0"
        >
          ← Return
        </button>
        <span className="font-text text-faded text-[0.9rem] ml-4">
          or continue to the{" "}
          <a
            href={routeToHash({ name: "decade", decade: car.decade })}
            onClick={(e) => {
              e.preventDefault();
              navigate({ name: "decade", decade: car.decade });
            }}
            className="text-burgundy underline decoration-burgundy/40 underline-offset-2"
          >
            {car.decade} section
          </a>
        </span>
      </p>
      <div className="mt-4">
        <ReadStoryLink car={car} navigate={navigate} label="Permalink to this article" />
      </div>
    </article>
  );
}

export function AboutPage() {
  return (
    <article className="max-w-3xl">
      <p className="kicker text-burgundy">Colophon</p>
      <h2 className="headline text-[clamp(2.2rem,5vw,3.6rem)] mt-2 mb-6">
        {aboutContent.title}
      </h2>
      <div className="font-text text-[1.02rem] leading-[1.8] text-ink-soft space-y-5">
        {aboutContent.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "drop-cap m-0" : "m-0"}>
            {p}
          </p>
        ))}
      </div>
      <div className="ornament my-8" aria-hidden="true">
        <span />
      </div>
      <section aria-label="Image credits">
        <h3 className="kicker text-faded mb-3">Image credits</h3>
        <p className="font-text text-[0.95rem] text-ink-soft leading-relaxed">
          Every car illustration in this edition was created for The Motoring
          Gazette. They are detailed studies of the featured variants — not
          historical photographs — and are credited as illustrations wherever
          they appear.
        </p>
      </section>
      <section aria-label="Type credits" className="mt-6">
        <h3 className="kicker text-faded mb-3">Type credits</h3>
        <p className="font-text text-[0.95rem] text-ink-soft leading-relaxed">
          Masthead and headlines in ZT Bros Oskon 90s; articles in Source Serif
          4; specifications and labels in Space Mono.
        </p>
      </section>
    </article>
  );
}
