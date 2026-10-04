/* The Motoring Gazette — editorial content: decade introductions, sidebar
   features, vocabulary, and the fictional motoring club advertisement. */

export interface DecadeIntro {
  decade: "1950s" | "1970s";
  kicker: string;
  title: string;
  standfirst: string;
  paragraphs: string[];
}

export const decadeIntros: DecadeIntro[] = [
  {
    decade: "1950s",
    kicker: "The Decade",
    title: "Chrome, Fins & Postwar Optimism",
    standfirst:
      "America dreamed in tailfins while Europe rebuilt itself in aluminum and steel — the decade the automobile became sculpture.",
    paragraphs: [
      "The 1950s opened with the world still clearing rubble and closed with tailfins at their tallest. In America, unprecedented prosperity turned the car into the era's defining art form: longer, lower, and more chromed each year, culminating in the 1959 Cadillac Eldorado — a vehicle less designed than declared. The Big Three sold not transportation but optimism, measured in inches of fin and pounds of chrome.",
      "Europe took a different road. With fuel expensive and streets narrow, its engineers pursued efficiency and ingenuity: Mercedes-Benz built the 300 SL around a racing spaceframe, Jaguar refined the XK into the civilized XK150, and a continent of small manufacturers proved that brilliance didn't require bulk. Britain, Germany, Italy, and France each developed a distinct automotive character that endures today.",
      "What unites the decade's great cars is confidence — the belief, on both sides of the Atlantic, that the automobile's best years lay ahead. They were right, though not in the way anyone expected.",
    ],
  },
  {
    decade: "1970s",
    kicker: "The Decade",
    title: "Muscle, Wedges & the Hot Hatch",
    standfirst:
      "The decade that began with the horsepower war at full cry and ended with the front-drive hatchback — variety no single era has matched.",
    paragraphs: [
      "No decade in automotive history contains more contradiction than the 1970s. It opened with the 1970 Dodge Challenger R/T — Detroit muscle at its absolute zenith, months before insurance surcharges and emissions rules began the long retreat. It closed with the Volkswagen Golf GTI, a humble family hatchback that invented the hot hatch and proved performance could be democratic, efficient, and front-wheel drive.",
      "Between those poles lay extraordinary variety. Porsche distilled the 911 to its essence with the Carrera RS 2.7, a homologation special that remains the template for every track-bred Porsche since. Lamborghini's Countach LP400, drawn by a 26-year-old Marcello Gandini, made the supercar a rolling manifesto of the future. Japan's rise, the oil crisis, and new safety and emissions regimes forced engineering ingenuity that reshaped the industry permanently.",
      "The 1970s matter because they contain the whole story: the end of one idea of the automobile and the beginning of another. The cars that survived the transition — the 911, the GTI, the wedge — define what we drive today.",
    ],
  },
];

export interface ArchiveStory {
  title: string;
  date: string;
  body: string;
}

export const archiveStories: ArchiveStory[] = [
  {
    title: "1955: The Gullwing Stuns New York",
    date: "From the Gazette archives",
    body: "When the 300 SL debuted at the New York Sports Car Show in February 1954, crowds reportedly ignored every other exhibit. American importer Max Hoffman had gambled that a barely-tamed racing car could sell in the land of tailfins — and took deposits on the spot. The gullwing doors, born of engineering necessity, became the most imitated detail of the decade.",
  },
  {
    title: "1973: The Oil Shock Rewrites the Rules",
    date: "From the Gazette archives",
    body: "The OPEC embargo of October 1973 quadrupled fuel prices almost overnight. Overnight, the big-block V8 became a liability and the small, efficient hatchback a virtue. The Golf GTI — launched into this new world in 1976 — was perfectly timed: all of the fun, little of the guilt.",
  },
];

export interface DesignDetail {
  title: string;
  subject: string;
  body: string[];
}

export const designDetails: DesignDetail[] = [
  {
    title: "Design Detail",
    subject: "The Tailfin, 1948–1965",
    body: [
      "The tailfin began as an aircraft homage — Harley Earl's designers, inspired by the Lockheed P-38 Lightning, grafted vestigial fins onto the 1948 Cadillac. By 1959, fins had grown from styling flourish to national monument, reaching their zenith on the Eldorado: 42 inches tall, tipped with twin bullets.",
      "Fins were never aerodynamic; they were symbolic. They promised speed, modernity, and jet-age glamour to buyers who would never leave the ground. Their decline was swift — by the mid-1960s, cleaner European-influenced lines had rendered them embarrassing, and they vanished almost as quickly as they'd arrived.",
    ],
  },
  {
    title: "Design Detail",
    subject: "The Wedge, 1968–1980",
    body: [
      "If the tailfin was America's signature, the wedge was Italy's answer. Marcello Gandini's 1968 Alfa Romeo Carabo concept introduced the single-line silhouette — nose low, tail high, one unbroken crease from headlamp to haunch. The 1974 Countach LP400 was the idea in production form.",
      "The wedge promised the future: mid engines, low drag, drama. It dominated supercar design for a decade before aerodynamics — and the realization that wedges generate lift — pushed designers toward softer, wind-tunnel-honed shapes in the 1980s.",
    ],
  },
];

export interface VocabEntry {
  term: string;
  definition: string;
}

export const vocabulary: VocabEntry[] = [
  {
    term: "SAE gross",
    definition:
      "The American horsepower standard used before 1972, measured with the engine bare — no accessories, no exhaust restrictions. Figures are generous; SAE net (from 1972) typically reads 20–25% lower for the same engine.",
  },
  {
    term: "DIN horsepower",
    definition:
      "The German standard (Deutsches Institut für Normung), measured with all accessories fitted — closer to what the driver actually gets. A DIN figure is the honest one.",
  },
  {
    term: "Homologation special",
    definition:
      "A road car built in limited numbers purely to qualify its racing sibling for competition — the 911 Carrera RS 2.7 being the archetype. Racing rules made road cars; enthusiasts reap the reward.",
  },
  {
    term: "Pony car",
    definition:
      "The American formula pioneered by the 1964 Ford Mustang: a compact, stylish, affordable coupe with a long hood and short deck. The Challenger was Chrysler's belated, brawniest answer.",
  },
  {
    term: "Hot hatch",
    definition:
      "A practical front-drive hatchback with genuine performance — invented by the 1976 Golf GTI. The recipe: take the sensible car, add power, stiffen everything, keep the price sane.",
  },
  {
    term: "Spaceframe",
    definition:
      "A chassis of triangulated steel tubes — light, immensely rigid, and the reason the 300 SL needed gullwing doors: the frame's high sills left no room for conventional ones.",
  },
];

export const clubAdvertisement = {
  title: "The Gazette Motoring Club",
  lines: [
    "For those who read the road like a first edition.",
    "Quarterly meets · Concours guidance · Marque registers",
    "Membership by application. Correspondence in writing, as it should be.",
  ],
  footnote: "Editorial illustration — a fictional advertisement. Not a functioning business.",
};

export const aboutContent = {
  title: "About The Motoring Gazette",
  paragraphs: [
    "The Motoring Gazette is an independent automotive journal in the form of a collectible newspaper, devoted to two decades that changed the road: the 1950s and the 1970s. It is set in the manner of the great motoring papers — aged cream stock, black ink, serif headlines — and illustrated throughout.",
    "Our method is simple: exact variants, verified specifications, and honest labelling. Power figures carry their measurement standard. Uncertain information is marked as uncertain, never invented. Where a subject cannot be documented, we say so.",
    "A note on the illustrations: the car images in this edition are detailed illustrations created for the Gazette, not historical photographs. They are captioned and credited as such throughout. We believe a publication should never present an illustration as a document.",
    "The Gazette has no advertisers, no sponsors, and no agenda beyond the cars themselves. Remarkable machines. Enduring stories.",
  ],
};

export const leadStory = {
  kicker: "The Front Page",
  headline: "Two Decades That Changed the Road",
  standfirst:
    "Chrome and tailfins gave way to wedges and hot hatches — but the thread connecting the 1950s to the 1970s is the automobile's endless reinvention of itself.",
  paragraphs: [
    "The 1950s believed the future would be chrome-plated. American designers, drunk on postwar prosperity, sculpted cars like tailfinned ocean liners — the 1957 Chevrolet Bel Air and the 1959 Cadillac Eldorado remain the high-water marks of an era when style was measured in inches of fin. Across the Atlantic, a different optimism prevailed: Mercedes-Benz built the 300 SL around a racing spaceframe and fuel injection, while Jaguar refined the XK into the civilized, disc-braked XK150. Europe proved that brilliance didn't require bulk.",
    "Twenty years later, the automobile had been reinvented twice over. The 1970s opened with Detroit's horsepower war at full cry — the Dodge Challenger R/T arrived just months before insurance, emissions, and the oil crisis ended the muscle era. But the decade's true story is variety: Porsche distilled the 911 into the Carrera RS 2.7, the template for every track-bred Porsche since; Lamborghini's Countach LP400 made the supercar a manifesto of the future; and Volkswagen's Golf GTI invented the hot hatch, democratizing performance for the masses.",
    "These were not American decades or European decades — they were regional stories unfolding in parallel. America chased power and presence; Germany chased engineering precision; Britain chased elegance; Italy chased drama. The Gazette's position is that no single region owned the automobile's golden age — the glory was in the contrast.",
  ],
};
