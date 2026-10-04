import {
  archiveStories,
  clubAdvertisement,
  designDetails,
  vocabulary,
} from "../data/editorial";

/** Narrow supporting columns in the spirit of the reference's ad blocks. */
export function ArchiveSidebar() {
  return (
    <aside aria-label="From the archives and reference" className="space-y-8">
      <section aria-labelledby="archives-h">
        <h3 id="archives-h" className="kicker text-ink border-b-2 border-rule pb-2 mb-3">
          From the Archives
        </h3>
        {archiveStories.map((s) => (
          <article key={s.title} className="mb-5">
            <p className="byline mb-1">{s.date}</p>
            <h4 className="headline text-[1.3rem] mb-1">{s.title}</h4>
            <p className="font-text text-[0.92rem] leading-relaxed text-ink-soft m-0">
              {s.body}
            </p>
          </article>
        ))}
      </section>

      <div className="ornament" aria-hidden="true">
        <span />
      </div>

      <section aria-labelledby="design-h">
        <h3 id="design-h" className="kicker text-ink border-b-2 border-rule pb-2 mb-3">
          {designDetails[0].title}
        </h3>
        {designDetails.map((d) => (
          <article key={d.subject} className="mb-5">
            <h4 className="font-text font-bold text-[1.05rem] italic mb-2">{d.subject}</h4>
            {d.body.map((p, i) => (
              <p
                key={i}
                className="font-text text-[0.92rem] leading-relaxed text-ink-soft mt-0 mb-2"
              >
                {p}
              </p>
            ))}
          </article>
        ))}
      </section>

      <div className="ornament" aria-hidden="true">
        <span />
      </div>

      <section aria-labelledby="vocab-h">
        <h3 id="vocab-h" className="kicker text-ink border-b-2 border-rule pb-2 mb-3">
          Collector’s Vocabulary
        </h3>
        <dl className="m-0">
          {vocabulary.map((v) => (
            <div key={v.term} className="mb-3">
              <dt className="font-label text-[0.72rem] uppercase tracking-[0.12em] text-burgundy">
                {v.term}
              </dt>
              <dd className="m-0 font-text text-[0.9rem] leading-relaxed text-ink-soft mt-0.5">
                {v.definition}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="ornament" aria-hidden="true">
        <span />
      </div>

      <section aria-label="Advertisement" className="ad-box bg-[#faf5e6] p-5 text-center">
        <p className="kicker text-faded mb-2">Advertisement</p>
        <h3 className="script text-[2.1rem] leading-tight mb-3 text-ink">
          {clubAdvertisement.title}
        </h3>
        {clubAdvertisement.lines.map((l) => (
          <p key={l} className="font-text italic text-[0.95rem] text-ink-soft my-1.5">
            {l}
          </p>
        ))}
        <div className="ornament my-4" aria-hidden="true">
          <span />
        </div>
        <p className="caption text-[0.75rem] m-0">{clubAdvertisement.footnote}</p>
      </section>
    </aside>
  );
}
