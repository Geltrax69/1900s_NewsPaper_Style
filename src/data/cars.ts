/* The Motoring Gazette — structured car data.
   All specifications describe the exact featured variant. Power figures are
   given with their measurement standard (SAE gross was the American norm
   before 1972; DIN PS the German norm; bhp the British norm). Uncertain or
   unavailable figures are labelled as such — never invented.
   Imagery is illustration created for this publication, credited accordingly. */

export interface CarImage {
  src: string;
  alt: string;
  caption: string;
  credit: string;
}

export interface CarSpec {
  label: string;
  value: string;
  note?: string;
}

export interface CarSource {
  name: string;
  url: string;
}

export interface Car {
  id: string;
  decade: "1950s" | "1970s";
  year: number;
  make: string;
  model: string;
  variant: string;
  country: string;
  manufacturer: string;
  headline: string;
  intro: string;
  body: string[];
  specs: CarSpec[];
  collectorsNote: string;
  designCharacter: string;
  images: {
    front: CarImage;
    side: CarImage;
    rear: CarImage;
    interior: CarImage;
  };
  sources: CarSource[];
}

const ILLUSTRATION_CREDIT = "Illustration created for The Motoring Gazette";

export const cars: Car[] = [
  {
    id: "1957-chevrolet-bel-air",
    decade: "1950s",
    year: 1957,
    make: "Chevrolet",
    model: "Bel Air",
    variant: "Bel Air Sport Coupe with 283 cu in Super Turbo-Fire V8 (fuel-injected)",
    country: "United States",
    manufacturer: "Chevrolet (General Motors)",
    headline: "The Tri-Five Crown Jewel",
    intro:
      "The final and most coveted year of Chevrolet's legendary Tri-Five generation — the car that taught America that ordinary families could drive something extraordinary.",
    body: [
      "The 1957 Chevrolet Bel Air arrived at the absolute zenith of postwar American optimism. Longer, lower, and more lavishly chromed than its 1955 and 1956 siblings, it wore its tailfins with unapologetic pride and offered something no rival could match: a small-block V8 with Rochester Ramjet mechanical fuel injection, delivering a headline-grabbing 283 horsepower from 283 cubic inches — the fabled one horsepower per cubic inch. For 1957, the Bel Air sat at the top of Chevrolet's range, distinguished by its gold anodized side trim, full wheel covers, and an interior trimmed to a standard its cheaper stablemates could only envy.",
      "Under the glamour lay serious engineering. The 283 small-block, introduced in 1957 with a enlarged bore, was light, compact, and endlessly tunable — the foundation of a performance dynasty that would power everything from Corvettes to stock cars for decades. Buyers could choose anything from a thrifty 235-cubic-inch Blue Flame six to the fuel-injected 283, paired with a two-speed Powerglide automatic or a three-speed manual. The chassis was conventional — coil springs up front, leaf springs at the rear — but it was honest, durable, and easy to maintain, which is precisely why so many survived.",
      "Today the '57 Bel Air, particularly the two-door hardtop Sport Coupe and the convertible, is among the most collected American cars ever built. It matters not because it was the fastest or the most advanced car of 1957, but because it perfectly distilled an era: chrome as sculpture, color as celebration, and the democratic promise that style was not reserved for the wealthy. Values for fuel-injected examples have long led the Tri-Five market, and the model's parts and knowledge base remain unmatched in the hobby.",
    ],
    specs: [
      { label: "Engine", value: "283 cu in (4.6 L) OHV small-block V8, Rochester Ramjet fuel injection" },
      { label: "Displacement", value: "4,638 cc" },
      { label: "Power", value: "283 hp", note: "SAE gross; the famous 1 hp per cu in. Lesser 283 versions: 185–270 hp" },
      { label: "Transmission", value: "2-speed Powerglide automatic or 3-speed manual" },
      { label: "Drivetrain", value: "Front-engine, rear-wheel drive" },
      { label: "Body style", value: "2-door hardtop coupe (Sport Coupe)" },
    ],
    collectorsNote:
      "Fuel-injected 1957 Bel Airs are the blue chips of the Tri-Five world — verify the injection unit's originality, as many cars were converted back to carburetors when the complex Ramjet proved troublesome in period.",
    designCharacter: "Exuberant chrome-laden optimism; tailfins as sculpture.",
    images: {
      front: {
        src: "images/cars/bel-air-1957/front.jpg",
        alt: "Front three-quarter view of a two-tone red and white 1957 Chevrolet Bel Air Sport Coupe",
        caption: "The '57 Bel Air Sport Coupe in two-tone Matador Red and white — chrome as sculpture.",
        credit: ILLUSTRATION_CREDIT,
      },
      side: {
        src: "images/cars/bel-air-1957/side.jpg",
        alt: "Side profile of a 1957 Chevrolet Bel Air Sport Coupe showing its full chrome side trim",
        caption: "Full-length chrome spears and gold anodized trim mark the top-of-range Bel Air.",
        credit: ILLUSTRATION_CREDIT,
      },
      rear: {
        src: "images/cars/bel-air-1957/rear.jpg",
        alt: "Rear three-quarter view of a 1957 Chevrolet Bel Air showing its tailfins",
        caption: "Restrained by later standards, the '57's fins were a revolution in 1957.",
        credit: ILLUSTRATION_CREDIT,
      },
      interior: {
        src: "images/cars/bel-air-1957/interior.jpg",
        alt: "Red and white two-tone interior of a 1957 Chevrolet Bel Air with chrome dashboard details",
        caption: "Two-tone vinyl and a chrome-laden dashboard — the American dream, upholstered.",
        credit: ILLUSTRATION_CREDIT,
      },
    },
    sources: [
      { name: "Chevrolet Bel Air — Wikipedia", url: "https://en.wikipedia.org/wiki/Chevrolet_Bel_Air" },
      { name: "GM Heritage Center", url: "https://www.gmheritagecenter.com/" },
    ],
  },
  {
    id: "1959-cadillac-eldorado",
    decade: "1950s",
    year: 1959,
    make: "Cadillac",
    model: "Eldorado",
    variant: "Eldorado Biarritz convertible",
    country: "United States",
    manufacturer: "Cadillac (General Motors)",
    headline: "The Tallest Fins Ever Worn",
    intro:
      "No car embodies the American tailfin era more completely than the 1959 Eldorado — Harley Earl's parting thunderclap, with fins taller than any car before or since.",
    body: [
      "If the 1957 Bel Air was optimism, the 1959 Cadillac Eldorado was optimism with the volume turned past reason. Its tailfins — rising a full 42 inches from the ground at their tips and capped with dual bullet taillights — remain the tallest ever fitted to a production car. Conceived under design chief Harley Earl and finished under his successor Bill Mitchell, the '59 Cadillac was a deliberate statement of American industrial supremacy, launched just as the compact-car tide was beginning to turn against such excess.",
      "Beneath the theatre sat genuine substance. The Eldorado-exclusive 390-cubic-inch V8, fed by three two-barrel carburetors, produced 345 horsepower (SAE gross) — the most powerful engine in any American production car that year. A four-speed Hydra-Matic automatic, power steering, power brakes, power windows, power seats, and air suspension were all standard on the Eldorado, which rode on its own 130-inch wheelbase chassis. The Biarritz convertible, with its power top and pillarless elegance, was the flagship of flagships.",
      "The Eldorado matters because it marks both the peak and the end of an era. Within a few years, fins would shrink, compacts would rise, and the industry's center of gravity would shift toward efficiency. Today the '59 Eldorado Biarritz is a seven-figure car at its best — not merely a collector's trophy but a rolling monument to the moment American car design dared to be outrageous, and got away with it.",
    ],
    specs: [
      { label: "Engine", value: "390 cu in (6.4 L) OHV V8, triple 2-barrel carburetors" },
      { label: "Displacement", value: "6,391 cc" },
      { label: "Power", value: "345 hp", note: "SAE gross; Eldorado-exclusive tune" },
      { label: "Transmission", value: "4-speed Hydra-Matic automatic" },
      { label: "Drivetrain", value: "Front-engine, rear-wheel drive" },
      { label: "Body style", value: "2-door convertible (Biarritz)" },
    ],
    collectorsNote:
      "Air suspension was troublesome when new and most cars were converted to coil springs decades ago — an original, working air-ride car commands a significant premium. Check fin tips and lower quarters for rust with particular care.",
    designCharacter: "Maximum American baroque; fins as national monument.",
    images: {
      front: {
        src: "images/cars/eldorado-1959/front.jpg",
        alt: "Front three-quarter view of a white 1959 Cadillac Eldorado Biarritz convertible",
        caption: "The '59 Eldorado Biarritz — a prow of chrome a full eighteen feet long.",
        credit: ILLUSTRATION_CREDIT,
      },
      side: {
        src: "images/cars/eldorado-1959/side.jpg",
        alt: "Side profile of a 1959 Cadillac Eldorado Biarritz showing its enormous tailfins",
        caption: "Forty-two inches of fin — the tallest ever fitted to a production car.",
        credit: ILLUSTRATION_CREDIT,
      },
      rear: {
        src: "images/cars/eldorado-1959/rear.jpg",
        alt: "Rear view of a 1959 Cadillac Eldorado showing dual bullet taillights",
        caption: "Twin bullet taillights crowning the fins — the era's signature after dark.",
        credit: ILLUSTRATION_CREDIT,
      },
      interior: {
        src: "images/cars/eldorado-1959/interior.jpg",
        alt: "White leather interior of a 1959 Cadillac Eldorado with chrome dashboard",
        caption: "An interior trimmed like a first-class lounge, with every power assist standard.",
        credit: ILLUSTRATION_CREDIT,
      },
    },
    sources: [
      { name: "Cadillac Eldorado — Wikipedia", url: "https://en.wikipedia.org/wiki/Cadillac_Eldorado" },
      { name: "Cadillac", url: "https://www.cadillac.com/" },
    ],
  },
  {
    id: "1955-mercedes-benz-300-sl",
    decade: "1950s",
    year: 1955,
    make: "Mercedes-Benz",
    model: "300 SL",
    variant: "300 SL Gullwing coupe (W198)",
    country: "Germany",
    manufacturer: "Mercedes-Benz",
    headline: "The Silver Arrow for the Road",
    intro:
      "A racing car barely tamed for the street — the 300 SL paired a tubular spaceframe and direct fuel injection with the most dramatic doors ever fitted to a production car.",
    body: [
      "The 300 SL began not as a road car but as the W194 racer that swept the 1952 Mille Miglia and Le Mans. Its spaceframe chassis — a lattice of thin steel tubes weighing barely 50 kilograms — was so rigid and so high-sided that conventional doors were impossible. Engineer Rudolf Uhlenhaut's solution was to hinge the doors at the roof: the gullwing was born of necessity, and became an icon by accident. When American importer Max Hoffman convinced Stuttgart to build a road version, the 1955 300 SL became the fastest production car in the world.",
      "Its 3.0-liter inline-six, canted at 45 degrees to clear the low bonnet, was the first production engine with direct mechanical fuel injection — a Bosch system derived from aircraft practice that delivered 215 DIN horsepower and a top speed of around 260 km/h. In 1955, nothing else on sale could touch it. The handling, with its swing-axle rear suspension, demanded respect — lift off mid-corner and the tail would remind you of its racing parentage — but for the skilled driver it was revelatory.",
      "The Gullwing matters because it proved Germany's postwar engineering renaissance was complete. It established the SL lineage that continues today, pioneered fuel injection for the industry, and remains — in silver with its doors raised — the single most recognizable silhouette in automotive history. Genuine cars now trade deep into eight figures.",
    ],
    specs: [
      { label: "Engine", value: "3.0 L M198 SOHC inline-6, Bosch mechanical direct fuel injection" },
      { label: "Displacement", value: "2,996 cc" },
      { label: "Power", value: "215 hp", note: "DIN, at 5,800 rpm" },
      { label: "Transmission", value: "4-speed manual" },
      { label: "Drivetrain", value: "Front-engine, rear-wheel drive" },
      { label: "Body style", value: "2-door coupe with gullwing doors" },
    ],
    collectorsNote:
      "Matching-numbers cars with documented history are essential at this level — the market is unforgiving of stories. Original belly pans, tool kits, and fitted luggage add meaningfully to value.",
    designCharacter: "Silver, scientific, and impossibly elegant; form following racing function.",
    images: {
      front: {
        src: "images/cars/300sl-1955/front.jpg",
        alt: "Front three-quarter view of a silver 1955 Mercedes-Benz 300 SL Gullwing",
        caption: "Silver, low, and purposeful — the fastest production car in the world in 1955.",
        credit: ILLUSTRATION_CREDIT,
      },
      side: {
        src: "images/cars/300sl-1955/side.jpg",
        alt: "Side profile of a silver 1955 Mercedes-Benz 300 SL Gullwing with doors closed",
        caption: "The spaceframe's high sills made conventional doors impossible — hence the gullwings.",
        credit: ILLUSTRATION_CREDIT,
      },
      rear: {
        src: "images/cars/300sl-1955/rear.jpg",
        alt: "Rear three-quarter view of a silver 1955 Mercedes-Benz 300 SL Gullwing",
        caption: "Teardrop tail and side exhaust — every line serves aerodynamics.",
        credit: ILLUSTRATION_CREDIT,
      },
      interior: {
        src: "images/cars/300sl-1955/interior.jpg",
        alt: "Red leather interior of a 1955 Mercedes-Benz 300 SL with classic gauges",
        caption: "Red leather over a body-color dash — spartan, purposeful, beautiful.",
        credit: ILLUSTRATION_CREDIT,
      },
    },
    sources: [
      { name: "Mercedes-Benz 300 SL — Wikipedia", url: "https://en.wikipedia.org/wiki/Mercedes-Benz_300_SL" },
      { name: "Mercedes-Benz Classic", url: "https://www.mercedes-benz.com/en/classic/" },
    ],
  },
  {
    id: "1959-jaguar-xk150",
    decade: "1950s",
    year: 1959,
    make: "Jaguar",
    model: "XK150",
    variant: "XK150 Roadster (Open Two Seater) with 3.4-litre XK engine",
    country: "United Kingdom",
    manufacturer: "Jaguar",
    headline: "Britain's Gentleman Express",
    intro:
      "The last and most refined of Jaguar's XK sports cars — a 120-mph grand tourer that brought disc brakes and civilized manners to the breed.",
    body: [
      "By 1959 the XK line was twelve years old, yet the XK150 remained thoroughly competitive — a testament to how right William Lyons and his engineers had got the formula in 1948. The XK150 was the first of the breed designed from the outset as a comfortable grand tourer rather than a stripped racer: a higher scuttle line, a proper wraparound windscreen, and an interior trimmed with a new level of Jaguar opulence. Under the bonnet, the legendary twin-cam XK straight-six — in 3.4-litre form producing 190 bhp — gave effortless, turbine-smooth performance.",
      "What truly set the XK150 apart was its chassis technology. It was among the first production cars in the world with disc brakes on all four wheels as standard — Dunlop units that gave the Jaguar stopping power its drum-braked rivals simply could not match. Combined with rack-and-pinion steering and a supple torsion-bar front suspension, the XK150 was a genuinely refined high-speed carriage, capable of whisking two people and their luggage across continents at speeds that humbled most contemporary machinery.",
      "The XK150 matters as the bridge between Jaguar's heroic 1950s sports racers and the E-type that would stun the world in 1961. The Roadster — the purest, lightest form — is today the connoisseur's XK: rarer than the fixed-head coupe, more elemental than the drophead, and a reminder that Britain once built the world's most desirable sports cars as a matter of routine.",
    ],
    specs: [
      { label: "Engine", value: "3.4 L XK DOHC inline-6, twin SU carburetors" },
      { label: "Displacement", value: "3,442 cc" },
      { label: "Power", value: "190 bhp", note: "Gross; SE version 210 bhp; 3.8 L option (220/265 bhp) arrived late 1959" },
      { label: "Transmission", value: "4-speed manual (overdrive optional)" },
      { label: "Drivetrain", value: "Front-engine, rear-wheel drive" },
      { label: "Body style", value: "2-door roadster (Open Two Seater)" },
    ],
    collectorsNote:
      "Rust in the sills, bulkhead, and boot floor is the great XK enemy — buy on body condition first. The desirable SE engine and overdrive gearbox add real value; verify both by serial numbers.",
    designCharacter: "Understated British elegance; speed without shouting.",
    images: {
      front: {
        src: "images/cars/xk150-1959/front.jpg",
        alt: "Front three-quarter view of a British Racing Green 1959 Jaguar XK150 Roadster",
        caption: "The XK150 Roadster in British Racing Green — Britain's gentleman express.",
        credit: ILLUSTRATION_CREDIT,
      },
      side: {
        src: "images/cars/xk150-1959/side.jpg",
        alt: "Side profile of a 1959 Jaguar XK150 Roadster with wire wheels",
        caption: "Long bonnet, short tail, wire wheels — the classic sports-car proportion.",
        credit: ILLUSTRATION_CREDIT,
      },
      rear: {
        src: "images/cars/xk150-1959/rear.jpg",
        alt: "Rear three-quarter view of a 1959 Jaguar XK150 Roadster",
        caption: "A higher tail than its predecessors, but the XK bloodline is unmistakable.",
        credit: ILLUSTRATION_CREDIT,
      },
      interior: {
        src: "images/cars/xk150-1959/interior.jpg",
        alt: "Tan leather interior of a 1959 Jaguar XK150 with wood-rim steering wheel",
        caption: "Tan leather, wood-rim wheel, Smiths gauges — the civilized cockpit.",
        credit: ILLUSTRATION_CREDIT,
      },
    },
    sources: [
      { name: "Jaguar XK150 — Wikipedia", url: "https://en.wikipedia.org/wiki/Jaguar_XK150" },
      { name: "Jaguar Heritage", url: "https://www.jaguarheritage.com/" },
    ],
  },
];

export const cars1970s: Car[] = [
  {
    id: "1970-dodge-challenger-rt",
    decade: "1970s",
    year: 1970,
    make: "Dodge",
    model: "Challenger R/T",
    variant: "Challenger R/T hardtop with 383 cu in Magnum V8",
    country: "United States",
    manufacturer: "Dodge (Chrysler)",
    headline: "The Last Thunder of the Muscle Era",
    intro:
      "Chrysler arrived late to the pony-car party — and brought the biggest hammer. The 1970 Challenger R/T was Detroit muscle at its absolute peak, months before the tide turned.",
    body: [
      "When the Challenger debuted in autumn 1969 as a 1970 model, the muscle-car era was already burning at its brightest — and the Challenger was engineered to outgun everything. Built on Chrysler's E-body platform, shared with the Plymouth Barracuda, it was longer, wider, and more luxuriously appointed than the Mustang and Camaro it hunted. The R/T (Road/Track) performance package made the 383-cubic-inch Magnum V8 standard equipment, good for 335 SAE gross horsepower, with the 440 Magnum and the legendary 426 Street Hemi available for those brave enough.",
      "The Challenger's genius was its breadth. Where rivals offered a narrow performance ladder, Dodge offered everything from a slant-six commuter to a Hemi drag weapon in the same handsome body. The R/T added a performance hood with scoop, heavy-duty suspension and brakes, and the unforgettable bumblebee tail stripe. Inside, high-back bucket seats and the Rallye instrument cluster — with its 150-mph speedometer — made no secret of the car's intentions.",
      "The Challenger matters because it was the end of the line. Within two years, insurance surcharges, emissions regulations, and the 1973 oil crisis would gut the muscle car; the Challenger itself would limp on with ever-weaker engines until 1974. The 1970 R/T — especially in High Impact colors like Plum Crazy — is now the definitive artifact of Detroit's horsepower war, and Hemi cars rank among the most valuable American muscle cars ever sold.",
    ],
    specs: [
      { label: "Engine", value: "383 cu in (6.3 L) Magnum OHV V8, 4-barrel carburetor" },
      { label: "Displacement", value: "6,276 cc" },
      { label: "Power", value: "335 hp", note: "SAE gross; 440 Magnum (375 hp) and 426 Hemi (425 hp) optional" },
      { label: "Transmission", value: "3-speed TorqueFlite automatic or 4-speed manual" },
      { label: "Drivetrain", value: "Front-engine, rear-wheel drive" },
      { label: "Body style", value: "2-door hardtop coupe" },
    ],
    collectorsNote:
      "1970 is the year to have — first-year cars carry the premium. Broadcast sheets and fender tags proving the R/T package and original engine are critical; restamped Hemi blocks are a notorious minefield.",
    designCharacter: "Menacing American muscle; long hood, attitude included.",
    images: {
      front: {
        src: "images/cars/challenger-1970/front.jpg",
        alt: "Front three-quarter view of a Plum Crazy purple 1970 Dodge Challenger R/T",
        caption: "Plum Crazy and proud — the 1970 Challenger R/T in full war paint.",
        credit: ILLUSTRATION_CREDIT,
      },
      side: {
        src: "images/cars/challenger-1970/side.jpg",
        alt: "Side profile of a 1970 Dodge Challenger R/T showing its long hood",
        caption: "The long-hood, short-deck pony-car proportion, stretched to E-body scale.",
        credit: ILLUSTRATION_CREDIT,
      },
      rear: {
        src: "images/cars/challenger-1970/rear.jpg",
        alt: "Rear three-quarter view of a 1970 Dodge Challenger R/T with bumblebee stripe",
        caption: "The bumblebee tail stripe — Detroit's loudest signature.",
        credit: ILLUSTRATION_CREDIT,
      },
      interior: {
        src: "images/cars/challenger-1970/interior.jpg",
        alt: "Black interior of a 1970 Dodge Challenger R/T with Rallye instrument cluster",
        caption: "High-back buckets and the 150-mph Rallye cluster — all business.",
        credit: ILLUSTRATION_CREDIT,
      },
    },
    sources: [
      { name: "Dodge Challenger — Wikipedia", url: "https://en.wikipedia.org/wiki/Dodge_Challenger" },
      { name: "Dodge", url: "https://www.dodge.com/" },
    ],
  },
  {
    id: "1973-porsche-911-carrera-rs-27",
    decade: "1970s",
    year: 1973,
    make: "Porsche",
    model: "911 Carrera RS 2.7",
    variant: "911 Carrera RS 2.7 Touring",
    country: "Germany",
    manufacturer: "Porsche",
    headline: "The Ducktail That Started It All",
    intro:
      "Built to go racing, adored on the road — the Carrera RS 2.7 is the 911 against which every 911 since has been measured.",
    body: [
      "In 1972 Porsche needed to homologate a racing 911 for Group 4, which meant building 500 road cars. Nobody expected what happened next: the resulting Carrera RS 2.7 — with its enlarged 2.7-liter flat-six, widened rear arches, and that cheeky ducktail spoiler — sold out instantly, forcing Porsche to build 1,580 examples. It was the fastest German production car of its day and, many argue, the greatest 911 ever made.",
      "The engineering was pure Porsche pragmatism. The 2,687-cc flat-six, breathing through mechanical fuel injection, produced 210 DIN horsepower in a car weighing barely 1,075 kilograms in Touring trim (the stripped Sport version dipped to 960). The ducktail wasn't styling — wind-tunnel work showed it genuinely reduced lift — and the wider Fuchs wheels and uprated suspension gave the RS a poise its standard siblings couldn't match. Nought to 100 km/h took 5.7 seconds; top speed was 245 km/h.",
      "The RS matters because it invented the template: take the 911, add power, subtract weight, and let the motorsport department sign the bodywork. Every GT3, every RS since, follows the script written in 1973. Touring examples — the civilized ones, with full trim and comfortable seats — are now among the most valuable Porsches in existence, and the ducktail remains the most imitated spoiler in history.",
    ],
    specs: [
      { label: "Engine", value: "2.7 L air-cooled flat-6, Bosch mechanical fuel injection" },
      { label: "Displacement", value: "2,687 cc" },
      { label: "Power", value: "210 PS", note: "DIN, at 6,300 rpm" },
      { label: "Transmission", value: "5-speed manual (Type 915)" },
      { label: "Drivetrain", value: "Rear-engine, rear-wheel drive" },
      { label: "Body style", value: "2-door coupe" },
    ],
    collectorsNote:
      "Touring vs. Sport (lightweight) specification dramatically affects value — verify the M471/M472 option codes. Original ducktails, Fuchs wheels, and the Carrera side script must be correct; the market punishes deviations.",
    designCharacter: "Functional beauty; every flare and the ducktail earn their keep.",
    images: {
      front: {
        src: "images/cars/carrera-rs-1973/front.jpg",
        alt: "Front three-quarter view of a white 1973 Porsche 911 Carrera RS 2.7 with red script",
        caption: "Grand Prix White with red Carrera script — the definitive RS livery.",
        credit: ILLUSTRATION_CREDIT,
      },
      side: {
        src: "images/cars/carrera-rs-1973/side.jpg",
        alt: "Side profile of a 1973 Porsche 911 Carrera RS 2.7 showing ducktail spoiler",
        caption: "Widened arches, Fuchs wheels, and the ducktail that started it all.",
        credit: ILLUSTRATION_CREDIT,
      },
      rear: {
        src: "images/cars/carrera-rs-1973/rear.jpg",
        alt: "Rear three-quarter view of a 1973 Porsche 911 Carrera RS 2.7",
        caption: "The ducktail wasn't decoration — it genuinely tamed rear lift.",
        credit: ILLUSTRATION_CREDIT,
      },
      interior: {
        src: "images/cars/carrera-rs-1973/interior.jpg",
        alt: "Interior of a 1973 Porsche 911 Carrera RS 2.7 with five-gauge dashboard",
        caption: "Five gauges, sports seats, nothing wasted — the Touring kept its manners.",
        credit: ILLUSTRATION_CREDIT,
      },
    },
    sources: [
      { name: "Porsche 911 Carrera RS — Wikipedia", url: "https://en.wikipedia.org/wiki/Porsche_911_Carrera_RS" },
      { name: "Porsche Museum", url: "https://www.porsche.com/" },
    ],
  },
  {
    id: "1974-lamborghini-countach-lp400",
    decade: "1970s",
    year: 1974,
    make: "Lamborghini",
    model: "Countach LP400",
    variant: "Countach LP400 (first series, periscope roof)",
    country: "Italy",
    manufacturer: "Lamborghini",
    headline: "The Wedge That Bent the Future",
    intro:
      "Marcello Gandini's impossible wedge made every other supercar look instantly obsolete — and the LP400 remains the purest expression of the Countach idea.",
    body: [
      "When the Countach LP500 prototype appeared at Geneva in 1971, it didn't look like a car so much as a rumor from the future. By the time the production LP400 arrived in 1974, the 5.0-liter engine had given way to a 3.9-liter V12 — hence LP400, for 4.0 liters — but the shock remained intact. At barely 107 centimeters tall, with scissor doors and a cabin you entered like a racing car, the Countach redefined what a supercar could look like. Every wedge that followed, from the Lotus Esprit to the DeLorean, lived in its shadow.",
      "The engineering was as radical as the styling. A mid-mounted 60-degree V12 with six Weber carburetors produced 375 DIN horsepower at a screaming 8,000 rpm, driving the rear wheels through a five-speed gearbox mounted ahead of the engine for balance. The tubular spaceframe chassis and all-independent suspension were state of the art; the driving experience — heavy controls, minimal visibility, theatrical noise — was not for the timid. Lamborghini claimed a top speed near 290 km/h.",
      "The LP400 matters because it is the Countach before the wings, flares, and excess of later versions — the clean Gandini original, built in tiny numbers (around 150 cars). It is the purest statement of 1970s automotive futurism, and values have come to reflect its status as the definitive bedroom-poster supercar.",
    ],
    specs: [
      { label: "Engine", value: "3.9 L 60° V12, six Weber carburetors" },
      { label: "Displacement", value: "3,929 cc" },
      { label: "Power", value: "375 hp", note: "DIN, at 8,000 rpm" },
      { label: "Transmission", value: "5-speed manual" },
      { label: "Drivetrain", value: "Mid-engine, rear-wheel drive" },
      { label: "Body style", value: "2-door coupe" },
    ],
    collectorsNote:
      "LP400s are vanishingly rare — around 150 built. Beware later cars modified to look like LP400s; verify chassis numbers against factory records. Originality of the unadorned bodywork is everything.",
    designCharacter: "Pure Gandini wedge; the future, circa 1974.",
    images: {
      front: {
        src: "images/cars/countach-1974/front.jpg",
        alt: "Front three-quarter view of a yellow 1974 Lamborghini Countach LP400",
        caption: "Giallo Fly over the purest wedge ever drawn — the LP400 before the wings.",
        credit: ILLUSTRATION_CREDIT,
      },
      side: {
        src: "images/cars/countach-1974/side.jpg",
        alt: "Side profile of a 1974 Lamborghini Countach LP400 showing its wedge shape",
        caption: "One hundred and seven centimeters of Gandini's impossible line.",
        credit: ILLUSTRATION_CREDIT,
      },
      rear: {
        src: "images/cars/countach-1974/rear.jpg",
        alt: "Rear three-quarter view of a 1974 Lamborghini Countach LP400",
        caption: "Clean and wingless — later Countaches would never look this pure again.",
        credit: ILLUSTRATION_CREDIT,
      },
      interior: {
        src: "images/cars/countach-1974/interior.jpg",
        alt: "Black leather interior of a 1974 Lamborghini Countach LP400",
        caption: "A cabin entered like a racing car — theatre before comfort.",
        credit: ILLUSTRATION_CREDIT,
      },
    },
    sources: [
      { name: "Lamborghini Countach — Wikipedia", url: "https://en.wikipedia.org/wiki/Lamborghini_Countach" },
      { name: "Lamborghini", url: "https://www.lamborghini.com/" },
    ],
  },
  {
    id: "1976-volkswagen-golf-gti",
    decade: "1970s",
    year: 1976,
    make: "Volkswagen",
    model: "Golf GTI",
    variant: "Golf GTI Mk1 with 1.6-litre fuel-injected engine",
    country: "Germany",
    manufacturer: "Volkswagen",
    headline: "The Hot Hatch Is Born",
    intro:
      "One hundred and ten horsepower, 810 kilograms, and a golf-ball gear knob — the original GTI invented a genre and democratized driving fun forever.",
    body: [
      "The Golf GTI began as a skunkworks project: a handful of Volkswagen engineers, working unofficially, took the sensible new front-drive Golf and asked a subversive question — what if it were fast? They fitted the 1.6-liter engine from the Audi 80 GTE with Bosch K-Jetronic fuel injection, lowered and stiffened the suspension, added a front spoiler and black arch trim, and finished it with tartan seats and a golf-ball gear knob. Management expected to sell 5,000. They sold hundreds of thousands.",
      "The formula was deceptively simple. With 110 DIN horsepower pulling just 810 kilograms through the front wheels, the GTI reached 100 km/h in about 9 seconds and topped 180 km/h — but the numbers missed the point. The GTI's genius was its duality: a practical family hatchback on Monday, a back-road scalpel on Sunday. Its crisp handling, eager engine, and honest feedback made performance accessible to anyone, not just those who could afford a sports car.",
      "The GTI matters because it created the hot hatch — arguably the most influential performance-car genre of the last fifty years. Every fast hatchback since, from the Peugeot 205 GTI to today's Golf R, descends directly from the 1976 original. Early small-bumper, Mars Red cars are now genuinely collectible, and the tartan-and-golf-ball recipe remains in production half a century later.",
    ],
    specs: [
      { label: "Engine", value: "1.6 L inline-4, Bosch K-Jetronic fuel injection" },
      { label: "Displacement", value: "1,588 cc" },
      { label: "Power", value: "110 PS", note: "DIN, at 6,100 rpm" },
      { label: "Transmission", value: "4-speed manual" },
      { label: "Drivetrain", value: "Front-engine, front-wheel drive" },
      { label: "Body style", value: "3-door hatchback" },
    ],
    collectorsNote:
      "Early 1976–78 cars with small metal bumpers and the original tartan trim are the ones to have. Rust is endemic — check inner wings, sills, and the fuel filler area. Originality of the GTI-specific trim is increasingly prized.",
    designCharacter: "Understated menace; a family hatch with a secret.",
    images: {
      front: {
        src: "images/cars/golf-gti-1976/front.jpg",
        alt: "Front three-quarter view of a red 1976 Volkswagen Golf GTI Mk1",
        caption: "Mars Red over black arch trim — the original hot hatch keeps a low profile.",
        credit: ILLUSTRATION_CREDIT,
      },
      side: {
        src: "images/cars/golf-gti-1976/side.jpg",
        alt: "Side profile of a 1976 Volkswagen Golf GTI Mk1",
        caption: "Giugiaro's crisp lines, GTI-ified: spoiler, stripes, and stance.",
        credit: ILLUSTRATION_CREDIT,
      },
      rear: {
        src: "images/cars/golf-gti-1976/rear.jpg",
        alt: "Rear three-quarter view of a 1976 Volkswagen Golf GTI Mk1",
        caption: "Small bumpers, big reputation — the back of a genre-definer.",
        credit: ILLUSTRATION_CREDIT,
      },
      interior: {
        src: "images/cars/golf-gti-1976/interior.jpg",
        alt: "Tartan interior of a 1976 Volkswagen Golf GTI with golf-ball gear knob",
        caption: "Tartan seats and the famous golf-ball gear knob — GTI signatures since day one.",
        credit: ILLUSTRATION_CREDIT,
      },
    },
    sources: [
      { name: "Volkswagen Golf Mk1 — Wikipedia", url: "https://en.wikipedia.org/wiki/Volkswagen_Golf_Mk1" },
      { name: "Volkswagen", url: "https://www.volkswagen.com/" },
    ],
  },
];

export const allCars: Car[] = [...cars, ...cars1970s];

export function getCar(id: string): Car | undefined {
  return allCars.find((c) => c.id === id);
}

export const manufacturers = [...new Set(allCars.map((c) => c.manufacturer))].sort();
export const countries = [...new Set(allCars.map((c) => c.country))].sort();
