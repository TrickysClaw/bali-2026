export type ActivityType = "adventure" | "food" | "nightlife" | "chill" | "culture" | "transport";

export type Activity = {
  id: string;
  time: string;
  title: string;
  desc: string;
  type: ActivityType;
  distance?: string;
  link?: string;
  photo?: string;
  cost?: number; // AUD per person
  lat?: number;
  lng?: number;
  notes?: string[];
  votes?: number;
};

export type DayData = {
  date: string;
  title: string;
  theme: string;
  emoji: string;
  gradient: string;
  activities: Activity[];
};

export type IdeaItem = {
  id: string;
  name: string;
  area: string;
  note: string;
  type: ActivityType;
  link?: string;
  photo?: string;
  cost?: number;
  lat?: number;
  lng?: number;
};

export type IdeaCategory = {
  category: string;
  emoji: string;
  items: IdeaItem[];
};

export const typeConfig: Record<ActivityType, { bg: string; text: string; border: string; label: string; icon: string }> = {
  adventure: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", label: "Adventure", icon: "Flame" },
  food: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", label: "Food", icon: "UtensilsCrossed" },
  nightlife: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20", label: "Nightlife", icon: "PartyPopper" },
  chill: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/20", label: "Chill", icon: "Palmtree" },
  culture: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", label: "Culture", icon: "Landmark" },
  transport: { bg: "bg-slate-500/10", text: "text-slate-400", border: "border-slate-500/20", label: "Transport", icon: "Car" },
};

export const initialDays: DayData[] = [
  {
    date: "June 3 (Tue)",
    title: "Arrive & Settle In",
    theme: "Jimbaran / Ayana",
    emoji: "✈️",
    gradient: "from-sky-500 to-blue-600",
    activities: [
      { id: "d1a1", time: "11:35", title: "Land at Ngurah Rai Airport", desc: "Touchdown Bali! Grab your bags and meet the pre-arranged hotel transfer — it's a scenic 25-minute drive along the coast to Ayana. Pro tip: get IDR from the ATM outside arrivals, not inside.", type: "transport", distance: "12km", link: "https://www.baliairport.com/", photo: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200", cost: 0, lat: -8.7480, lng: 115.1672 },
      { id: "d1a2", time: "13:00", title: "Check into AYANA Resort", desc: "Welcome to paradise — 90 hectares of infinity pools, private beaches, lush gardens, and cliffside paths overlooking the Indian Ocean. Your home base for the week.", type: "chill", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort", photo: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200", cost: 0, lat: -8.7862, lng: 115.1558 },
      { id: "d1a3", time: "14:30", title: "Lunch at Padi Restaurant", desc: "Kick off with authentic Indonesian classics — fragrant nasi goreng, tender chicken satay with peanut sauce, and fresh tropical juices. The open-air bamboo setting overlooks the resort gardens.", type: "food", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort/dining", photo: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=1200", cost: 25, lat: -8.7862, lng: 115.1558 },
      { id: "d1a4", time: "16:00", title: "Explore resort pools & beach", desc: "Ayana has 12 swimming pools — find your favourite infinity edge and post up. Or take the inclinator down to the secluded Kubu Beach for a dip in the turquoise water.", type: "chill", distance: "On-site", photo: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200", cost: 0, lat: -8.7870, lng: 115.1550 },
      { id: "d1a5", time: "17:30", title: "Rock Bar Bali", desc: "Built directly into the ocean cliffs 14 metres above the Indian Ocean — this is one of the world's most iconic bars. Sip cocktails as the sky turns pink and orange. Get there early for the best spots.", type: "nightlife", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort/dining/rock-bar", photo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200", cost: 30, lat: -8.7885, lng: 115.1545 },
      { id: "d1a6", time: "19:30", title: "Dinner at Kisik Bar & Grill", desc: "Toes-in-the-sand dining at its finest. Feast on grilled lobster, king prawns, and fresh-caught fish while waves crash metres away. The torchlit beach setting is pure romance.", type: "food", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort/dining", photo: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=1200", cost: 50, lat: -8.7878, lng: 115.1540 },
    ],
  },
  {
    date: "June 4 (Wed)",
    title: "South Bali Explorer",
    theme: "Uluwatu / Padang Padang",
    emoji: "🏄",
    gradient: "from-orange-500 to-red-500",
    activities: [
      { id: "d2a1", time: "08:00", title: "Breakfast at Resort", desc: "Massive international buffet with everything from eggs benedict to Balinese porridge. Load up — it's going to be a big day exploring the Bukit Peninsula.", type: "food", distance: "On-site", photo: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200", cost: 0, lat: -8.7862, lng: 115.1558 },
      { id: "d2a2", time: "09:30", title: "Padang Padang Beach", desc: "The famous Eat Pray Love beach — squeeze through a narrow rock crevice to reach this hidden cove of crystal-clear turquoise water. Surreal limestone cliffs tower above the small sandy stretch.", type: "chill", distance: "6km", link: "https://maps.google.com/?q=Padang+Padang+Beach+Bali", photo: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=1200", cost: 2, lat: -8.8113, lng: 115.1001 },
      { id: "d2a3", time: "11:30", title: "Surf Lesson", desc: "Gentle reef breaks make Padang Padang perfect for beginners. Local instructors will have you standing within the first hour. 2-hour lesson includes board, rashie, and plenty of wipeout laughs.", type: "adventure", distance: "6km", link: "https://maps.google.com/?q=Padang+Padang+Beach+Bali", photo: "https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=1200", cost: 25, lat: -8.8113, lng: 115.1001 },
      { id: "d2a4", time: "13:30", title: "Lunch at Single Fin", desc: "Legendary cliff-top bar perched above Uluwatu's best surf breaks. Cold Bintangs, massive burgers, and a panoramic view of surfers carving waves 50 metres below. Saturday sessions are famous but Wednesday is more chill.", type: "food", distance: "8km", link: "https://www.singlefinbali.com/", photo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200", cost: 20, lat: -8.8152, lng: 115.0889 },
      { id: "d2a5", time: "15:30", title: "Uluwatu Temple", desc: "A 1,000-year-old sea temple perched on dramatic 70-metre cliffs. The views are insane, but watch your sunnies — the resident macaques are expert thieves and will snatch anything shiny.", type: "culture", distance: "10km", link: "https://maps.google.com/?q=Uluwatu+Temple+Bali", photo: "https://images.unsplash.com/photo-1604922824961-87cefb2e4b07?w=1200", cost: 5, lat: -8.8291, lng: 115.0849 },
      { id: "d2a6", time: "18:00", title: "Kecak Fire Dance", desc: "Over 50 bare-chested performers chanting 'cak-cak-cak' in rhythmic unison around a blazing fire, performing scenes from the Ramayana as the sun drops into the ocean behind the temple. Absolutely electric.", type: "culture", distance: "10km", link: "https://maps.google.com/?q=Uluwatu+Temple+Bali", photo: "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=1200", cost: 15, lat: -8.8291, lng: 115.0849 },
      { id: "d2a7", time: "20:00", title: "Jimbaran Bay Seafood", desc: "Tables literally on the sand with candles and lanterns. Pick your fish, lobster, or prawns from the display and they grill it over coconut husks right in front of you. A Bali rite of passage.", type: "food", distance: "5km", link: "https://maps.google.com/?q=Jimbaran+Bay+Seafood+Bali", photo: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200", cost: 25, lat: -8.7700, lng: 115.1616 },
      { id: "d2a8", time: "22:00", title: "Savaya (Omnia) Cliff Club", desc: "End the Uluwatu day at Bali's most iconic mega-club — a jewel-shaped deck jutting over the ocean cliffs with international DJs, world-class production, and bottle-service energy. Only 15 minutes from Jimbaran. Dress sharp.", type: "nightlife", distance: "8km", link: "https://www.savayabali.com/", photo: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200", cost: 50, lat: -8.8120, lng: 115.0960 },
    ],
  },
  {
    date: "June 5 (Thu)",
    title: "Adrenaline Day",
    theme: "Kuta / Seminyak",
    emoji: "🏎️",
    gradient: "from-emerald-500 to-teal-600",
    activities: [
      { id: "d3a1", time: "09:00", title: "Bali Go-Kart", desc: "Outdoor track with proper 270cc karts that hit 70km/h — this is no kids' ride. Race your mates through tight corners and long straights. Loser buys dinner, no exceptions.", type: "adventure", distance: "15km", link: "https://maps.google.com/?q=Bali+Go+Kart+Kuta", photo: "https://images.unsplash.com/photo-1621252179027-94459d278660?w=1200", cost: 35, lat: -8.7230, lng: 115.1739 },
      { id: "d3a2", time: "11:00", title: "Tanjung Benoa Water Sports", desc: "Bali's water sports hub — only 15 mins from AYANA. Jet skis ($25/15min), parasailing ($35), banana boats ($15), flyboarding ($50). Bargain hard — listed prices are always inflated. The boys can race jet skis and try the flyboard (water-powered jetpack).", type: "adventure", distance: "10km", link: "https://maps.google.com/?q=Tanjung+Benoa+Water+Sports+Bali", photo: "https://images.unsplash.com/photo-1626163015551-18a0e9287ec2?w=1200", cost: 50, lat: -8.7730, lng: 115.2320 },
      { id: "d3a2b", time: "13:00", title: "Waterbom Bali", desc: "Asia's #1 waterpark with 22 slides including the near-vertical Climax drop, a lazy river, and a swim-up bar. The Lazy River and Boomerang are perfect for a group. Lockers available.", type: "adventure", distance: "14km", link: "https://waterbom-bali.com/", photo: "https://images.unsplash.com/photo-1590159983013-d4ff5fc71c1d?w=1200", cost: 40, lat: -8.7240, lng: 115.1690 },
      { id: "d3a3", time: "14:00", title: "Late Lunch at Sea Circus", desc: "Seminyak institution with killer tacos, halloumi burgers, and colourful cocktails. The quirky retro decor and chill beats make this a perfect refuel spot between activities.", type: "food", distance: "18km", link: "https://maps.google.com/?q=Sea+Circus+Seminyak+Bali", photo: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1200", cost: 20, lat: -8.6870, lng: 115.1560 },
      { id: "d3a4", time: "16:00", title: "Seminyak Beach", desc: "Bali's most cosmopolitan beach — golden sand, beach vendors selling cold Bintangs for $2, and a constant parade of people. Rent a beanbag and watch the kite surfers.", type: "chill", distance: "20km", link: "https://maps.google.com/?q=Seminyak+Beach+Bali", photo: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200", cost: 10, lat: -8.6900, lng: 115.1530 },
      { id: "d3a5", time: "18:00", title: "Sunset at Potato Head", desc: "THE sunset destination in Bali. Infinity pool, world-class DJs, artisan cocktails in the iconic colander-wall building. Smart casual dress code — no singlets. Book a daybed if you want to go premium.", type: "nightlife", distance: "20km", link: "https://www.pfrgroup.com/potato-head-beach-club-bali/", photo: "https://images.unsplash.com/photo-1574126154517-d1e0d89ef734?w=1200", cost: 35, lat: -8.6875, lng: 115.1520 },
      { id: "d3a6", time: "21:00", title: "Dinner at Motel Mexicola", desc: "Loud, colourful Mexican-Bali fusion madness. Frozen margaritas by the jug, loaded nachos, and tacos al pastor. The neon lights and fiesta energy make this the best pre-game dinner in Seminyak.", type: "food", distance: "19km", link: "https://www.motelmexicola.com/", photo: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200", cost: 25, lat: -8.6860, lng: 115.1570 },
      { id: "d3a7", time: "23:00", title: "La Favela", desc: "Seminyak's wildest club — a labyrinth of rooms, antique furniture, and a hidden jungle garden bar. Multiple levels with different music on each floor, from deep house to hip hop. Goes until 4am.", type: "nightlife", distance: "19km", link: "https://www.lafavelabali.com/", photo: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=1200", cost: 30, lat: -8.6855, lng: 115.1575 },
    ],
  },
  {
    date: "June 6 (Fri)",
    title: "Ubud & Culture",
    theme: "Ubud / Central Bali",
    emoji: "🌿",
    gradient: "from-green-500 to-emerald-500",
    activities: [
      { id: "d4a1", time: "08:00", title: "Drive to Ubud", desc: "1.5-hour drive through villages, temples, and lush green valleys. Private driver for the day — split 4 ways it's only $13 each. Grab a Balinese coffee on the way.", type: "transport", distance: "55km", photo: "https://images.unsplash.com/photo-1558005137-d9619a5c539f?w=1200", cost: 13, lat: -8.5069, lng: 115.2625 },
      { id: "d4a2", time: "10:00", title: "Tegallalang Rice Terraces", desc: "The iconic cascading rice paddies you've seen on every Bali Instagram. Walk through the ancient subak irrigation system and feel the cool mist. Best light is morning — go early to beat the crowds.", type: "culture", distance: "60km", link: "https://maps.google.com/?q=Tegallalang+Rice+Terrace", photo: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200", cost: 5, lat: -8.4312, lng: 115.2787 },
      { id: "d4a3", time: "12:00", title: "Bali Swing", desc: "Giant swings launching you over a lush jungle valley — some are 78 metres above the ground. Equal parts terrifying and exhilarating. The photos are absolutely insane. Multiple swing heights available.", type: "adventure", distance: "58km", link: "https://www.baliswing.com/", photo: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200", cost: 35, lat: -8.4280, lng: 115.2800 },
      { id: "d4a4", time: "13:30", title: "Lunch at Locavore", desc: "One of Asia's top 50 restaurants, serving hyper-local modern Indonesian cuisine. Every ingredient is sourced from within 100km. Book well in advance — this is a culinary experience, not just a meal.", type: "food", distance: "55km", link: "https://www.locavore.co.id/", photo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200", cost: 40, lat: -8.5069, lng: 115.2625 },
      { id: "d4a5", time: "15:00", title: "Sacred Monkey Forest", desc: "A mystical moss-covered temple complex home to 1,200 long-tailed macaques. Ancient banyan trees tower above stone-carved pathways. Keep everything zipped — the monkeys are bold, clever, and FAST.", type: "culture", distance: "55km", link: "https://www.monkeyforestubud.com/", photo: "https://images.unsplash.com/photo-1540202404-a2f29016b523?w=1200", cost: 8, lat: -8.5185, lng: 115.2588 },
      { id: "d4a6", time: "17:00", title: "Tegenungan Waterfall", desc: "A thundering 25-metre waterfall surrounded by dense jungle. Swim in the pool at the base for a refreshing cool-down after a day of exploring. The steps down are steep but worth every one.", type: "adventure", distance: "40km", link: "https://maps.google.com/?q=Tegenungan+Waterfall", photo: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=1200", cost: 3, lat: -8.5725, lng: 115.2888 },
      { id: "d4a7", time: "19:30", title: "Dinner at Dava (Ayana)", desc: "Back at the resort for a premium steak dinner. DAVA sits on the cliff edge with panoramic ocean views, a top-shelf wine list, and dry-aged cuts cooked to perfection. Dress smart — you've earned it.", type: "food", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort/dining", photo: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200", cost: 55, lat: -8.7862, lng: 115.1558 },
      { id: "d4a8", time: "21:30", title: "Rock Bar — Cocktail Nightcap", desc: "Wind down the culture-heavy day with premium cocktails at Rock Bar. The cliff-side setting hits different at night — ocean mist, stars overhead, and the waves crashing 14m below. DJ sets every evening from 9pm.", type: "nightlife", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort/dining/rock-bar", photo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200", cost: 30, lat: -8.7885, lng: 115.1545 },
    ],
  },
  {
    date: "June 7 (Sat)",
    title: "Island Hopper",
    theme: "Nusa Penida",
    emoji: "🏝️",
    gradient: "from-cyan-500 to-blue-500",
    activities: [
      { id: "d5a1", time: "06:30", title: "Fast boat to Nusa Penida", desc: "Early wake-up for the 45-minute fast boat from Sanur Harbour. Book return tickets in advance (~$30). Sit at the back if you get seasick — it can get choppy.", type: "transport", distance: "40km + boat", link: "https://maps.google.com/?q=Sanur+Harbour+Bali", photo: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=1200", cost: 30, lat: -8.6783, lng: 115.2631 },
      { id: "d5a2", time: "08:30", title: "Kelingking Beach (T-Rex Cliff)", desc: "THE most iconic viewpoint in Bali — a cliff formation that looks exactly like a T-Rex head, plunging into impossibly turquoise water. The hike down is sketchy but the beach at the bottom is pristine and rarely crowded.", type: "adventure", distance: "Nusa Penida", link: "https://maps.google.com/?q=Kelingking+Beach+Nusa+Penida", photo: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200", cost: 0, lat: -8.7438, lng: 115.4419 },
      { id: "d5a3", time: "10:30", title: "Angel's Billabong & Broken Beach", desc: "A natural infinity pool carved into the cliff edge where you can swim above the crashing ocean, right next to a dramatic sea arch (Broken Beach). They're side by side — two jaw-dropping geological formations.", type: "chill", distance: "Nusa Penida", link: "https://maps.google.com/?q=Angels+Billabong+Nusa+Penida", photo: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200", cost: 0, lat: -8.7310, lng: 115.4520 },
      { id: "d5a4", time: "12:00", title: "Lunch at Penida Colada", desc: "Chill beach bar with swings, hammocks, and views over the turquoise waters. The nasi goreng is surprisingly good for an island spot, and the fresh coconuts are perfect for rehydrating.", type: "food", distance: "Nusa Penida", link: "https://maps.google.com/?q=Penida+Colada+Nusa+Penida", photo: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200", cost: 15, lat: -8.7280, lng: 115.4500 },
      { id: "d5a5", time: "13:30", title: "Snorkelling at Manta Point", desc: "Crystal-clear water with 5–8 metre manta rays gliding beneath you — genuinely one of the most magical wildlife encounters on earth. Bring an underwater camera. The mantas are gentle and incredibly graceful.", type: "adventure", distance: "Nusa Penida", link: "https://maps.google.com/?q=Manta+Point+Nusa+Penida", photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200", cost: 25, lat: -8.7650, lng: 115.4250 },
      { id: "d5a6", time: "16:00", title: "Diamond Beach", desc: "Powder-white sand, electric turquoise water, and dramatic limestone cliffs. Recently had proper stairs built down, making it accessible. One of the most photogenic beaches in all of Southeast Asia.", type: "chill", distance: "Nusa Penida", link: "https://maps.google.com/?q=Diamond+Beach+Nusa+Penida", photo: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200", cost: 0, lat: -8.7560, lng: 115.5870 },
      { id: "d5a7", time: "17:30", title: "Fast boat back to Bali", desc: "Back to Sanur with a private driver waiting (1hr to Ayana). Try to catch the sunset from the boat — it's spectacular over Mount Agung.", type: "transport", photo: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1200", cost: 0, lat: -8.6783, lng: 115.2631 },
      { id: "d5a8", time: "20:00", title: "Chill dinner + Rock Bar", desc: "Keep it easy tonight — grab dinner at the resort and wind down at Rock Bar under the stars. You'll be absolutely wrecked from the island hopping. Cold Bintangs and ocean breeze.", type: "chill", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort/dining/rock-bar", photo: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=1200", cost: 35, lat: -8.7885, lng: 115.1545 },
      { id: "d5a9", time: "22:00", title: "Ulu Cliffhouse Night Session", desc: "If you've still got gas in the tank after Nusa Penida, Ulu Cliffhouse is only 15 min from Ayana. Multi-tier cliff club with cocktails, a pool, and quality DJs spinning into the early hours. Fridays go off.", type: "nightlife", distance: "6km", link: "https://www.ulucliffhouse.com/", photo: "https://images.unsplash.com/photo-1528150230181-99bbf7b22162?w=1200", cost: 30, lat: -8.8100, lng: 115.0950 },
    ],
  },
  {
    date: "June 8 (Sun)",
    title: "Canggu Vibes & Party Night",
    theme: "Canggu / Nightlife",
    emoji: "🌊",
    gradient: "from-purple-500 to-pink-500",
    activities: [
      { id: "d6a1", time: "09:00", title: "Sleep in & resort morning", desc: "After yesterday's Nusa Penida adventure, take it easy. Hit the spa, float in the infinity pool, or grab a late breakfast. No rush today — the party starts later.", type: "chill", distance: "On-site", photo: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200", cost: 0, lat: -8.7862, lng: 115.1558 },
      { id: "d6a2", time: "11:30", title: "Drive to Canggu", desc: "45-minute drive north to Bali's surfer and digital nomad capital. Think Brooklyn meets the tropics — street art, specialty coffee, and good vibes everywhere.", type: "transport", distance: "25km", photo: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=1200", cost: 5, lat: -8.6478, lng: 115.1385 },
      { id: "d6a3", time: "12:00", title: "Brunch at Crate Café", desc: "The brunch spot of Canggu — thick acai bowls, perfectly poached eggs benny, single-origin coffee, and a hip industrial interior. Always packed but worth the short wait.", type: "food", distance: "25km", link: "https://maps.google.com/?q=Crate+Cafe+Canggu+Bali", photo: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200", cost: 18, lat: -8.6490, lng: 115.1380 },
      { id: "d6a4", time: "14:00", title: "FINNS Beach Club", desc: "The ultimate Sunday session — massive pool, beach access, international DJs, and rented daybeds. The vibe builds through the afternoon into an epic sunset party. Order the sharing cocktail towers.", type: "nightlife", distance: "25km", link: "https://www.finnsbeachclub.com/", photo: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200", cost: 30, lat: -8.6530, lng: 115.1340 },
      { id: "d6a5", time: "17:00", title: "Sunset at Echo Beach", desc: "Walk along the black volcanic sand as the sky turns gold. Street vendors sell cold coconuts and corn on the cob. Fire spinners come out at dusk. Classic Canggu magic.", type: "chill", distance: "26km", link: "https://maps.google.com/?q=Echo+Beach+Canggu+Bali", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200", cost: 5, lat: -8.6510, lng: 115.1290 },
      { id: "d6a6", time: "19:00", title: "Dinner at Old Man's", desc: "Cheap Bintangs, live music, pool tables, and a rowdy backpacker crowd. The burgers are solid, the vibe is infectious, and it's the perfect warm-up for the night ahead.", type: "food", distance: "25km", link: "https://www.oldmansbali.com/", photo: "https://images.unsplash.com/photo-1546554137-f86b9593a222?w=1200", cost: 15, lat: -8.6520, lng: 115.1360 },
      { id: "d6a7", time: "21:30", title: "Deus Ex Machina → Gimme Shelter", desc: "Start at Deus — a custom motorcycle workshop turned bar with killer cocktails and vinyl DJ sets. Then roll to Gimme Shelter when it heats up around midnight for the main event.", type: "nightlife", distance: "25km", link: "https://www.deuscustoms.com/pages/bali", photo: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1200", cost: 25, lat: -8.6480, lng: 115.1370 },
      { id: "d6a8", time: "23:30", title: "Vault Bali / Sand Bar", desc: "The final boss of Canggu nightlife. Underground club vibes at Vault, or open-air madness at Sand Bar. Big Sunday energy with international DJs. Goes hard until 3-4am.", type: "nightlife", distance: "25km", link: "https://maps.google.com/?q=Vault+Bali+Canggu", photo: "https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=1200", cost: 30, lat: -8.6460, lng: 115.1390 },
    ],
  },
  {
    date: "June 9 (Mon)",
    title: "Last Day & Departure",
    theme: "Ayana / Jimbaran",
    emoji: "🌅",
    gradient: "from-amber-500 to-orange-500",
    activities: [
      { id: "d7a1", time: "08:00", title: "Sunrise cliff walk", desc: "Ayana's clifftop walking path at golden hour — the light filtering through frangipani trees is otherworldly. A peaceful way to soak in the last morning. Bring your phone, the photos will be incredible.", type: "chill", distance: "On-site", photo: "https://images.unsplash.com/photo-1476673160081-cf065607f449?w=1200", cost: 0, lat: -8.7870, lng: 115.1550 },
      { id: "d7a2", time: "09:30", title: "Resort spa session", desc: "Traditional Balinese massage to send you off right — warm oils, flower-petal baths, and total bliss. The spa overlooks the ocean from glass-floored treatment rooms. Book the 90-minute package.", type: "chill", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort/spa", photo: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200", cost: 50, lat: -8.7862, lng: 115.1558 },
      { id: "d7a3", time: "11:00", title: "Last swim & pool time", desc: "One final session at the infinity pools with the Indian Ocean stretching to the horizon. Take it all in. This is the memory you'll replay on the flight home.", type: "chill", distance: "On-site", photo: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200", cost: 0, lat: -8.7862, lng: 115.1558 },
      { id: "d7a4", time: "12:30", title: "Lunch at Padi", desc: "Check out first, bags with concierge. One last nasi goreng and a toast to the trip. Keep it light — airport food is expensive and sad in comparison.", type: "food", distance: "On-site", link: "https://www.ayana.com/bali/ayana-resort/dining", photo: "https://images.unsplash.com/photo-1583309219338-a582f1f9ca6b?w=1200", cost: 25, lat: -8.7862, lng: 115.1558 },
      { id: "d7a5", time: "14:00", title: "Jenggala Keramik — souvenirs", desc: "Famous artisan ceramics factory just 5 minutes from Ayana. Hand-painted plates, bowls, and vases make unique gifts that aren't the usual tourist tat. Factory seconds at great prices.", type: "culture", distance: "3km", link: "https://www.jenggala.com/", photo: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200", cost: 20, lat: -8.7820, lng: 115.1600 },
      { id: "d7a6", time: "15:30", title: "Dreamland Beach — last swim", desc: "Just 10 minutes from Ayana, this stunning white-sand beach with rolling waves is the perfect farewell dip. The surrounding cliffs make it feel like your own private cove.", type: "chill", distance: "5km", link: "https://maps.google.com/?q=Dreamland+Beach+Bali", photo: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200", cost: 2, lat: -8.8030, lng: 115.1120 },
      { id: "d7a7", time: "17:30", title: "Sunset at El Kabron", desc: "Spanish-Mediterranean cliff club just 10 minutes from Ayana. Sangria, tapas, and your very last Bali sunset. The infinity pool overlooks a 180° ocean panorama — go out with a bang.", type: "nightlife", distance: "4km", link: "https://www.elkabron.com/", photo: "https://images.unsplash.com/photo-1530538095376-a4936b35b5f0?w=1200", cost: 35, lat: -8.7950, lng: 115.1200 },
      { id: "d7a8", time: "19:30", title: "Final dinner — Jimbaran Bay", desc: "One more legendary seafood feast on the sand — grilled snapper, garlic prawns, sweet corn, and sambal. The fishing boats bob on the water and the candles flicker. Perfect farewell to Bali.", type: "food", distance: "5km", link: "https://maps.google.com/?q=Jimbaran+Bay+Seafood+Bali", photo: "https://images.unsplash.com/photo-1567636788276-40a47795ba4d?w=1200", cost: 30, lat: -8.7700, lng: 115.1616 },
      { id: "d7a9", time: "20:30", title: "Transfer to Airport", desc: "25-minute ride to Ngurah Rai. Flight at 22:15. Safe travels legends 🤙 Start planning Bali 2027 on the plane.", type: "transport", distance: "12km", link: "https://www.baliairport.com/", photo: "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=1200", cost: 0, lat: -8.7480, lng: 115.1672 },
    ],
  },
];

export const initialIdeas: IdeaCategory[] = [
  {
    category: "Adventure & Thrills",
    emoji: "🏎️",
    items: [
      { id: "i1", name: "ATV Quad Biking", area: "Ubud", note: "Rip through rice paddies, river crossings, and dense jungle on powerful quads. 2-hour guided tour with GoPro mount included.", type: "adventure", link: "https://maps.google.com/?q=Bali+ATV+Ride+Ubud", photo: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200", cost: 35, lat: -8.5100, lng: 115.2650 },
      { id: "i2", name: "White Water Rafting", area: "Ayung River", note: "Class II-III rapids through a stunning 10km gorge with ancient stone carvings on the cliff walls. No experience needed.", type: "adventure", link: "https://maps.google.com/?q=Ayung+River+Rafting+Bali", photo: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=1200", cost: 40, lat: -8.4500, lng: 115.2700 },
      { id: "i3", name: "Parasailing", area: "Tanjung Benoa", note: "Soar 100m above Benoa Bay with panoramic views of Bali's coastline. 15 minutes from Ayana, tandem flights available.", type: "adventure", link: "https://maps.google.com/?q=Tanjung+Benoa+Watersports", photo: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200", cost: 25, lat: -8.7580, lng: 115.2230 },
      { id: "i4", name: "Jet Ski", area: "Tanjung Benoa", note: "Blast across the flat waters of Benoa Bay at 80km/h. Tanjung Benoa is Bali's watersports hub — combo deals available.", type: "adventure", link: "https://maps.google.com/?q=Tanjung+Benoa+Watersports", photo: "https://images.unsplash.com/photo-1505533542167-8c89838bb19e?w=1200", cost: 30, lat: -8.7580, lng: 115.2230 },
      { id: "i5", name: "Flyboarding", area: "Tanjung Benoa", note: "Iron Man vibes — water jets on your feet launch you 10m above the ocean. Takes about 5 minutes to get the hang of it, then it's pure adrenaline.", type: "adventure", link: "https://maps.google.com/?q=Tanjung+Benoa+Watersports", photo: "https://images.unsplash.com/photo-1496737018672-b1a6be2e949c?w=1200", cost: 40, lat: -8.7580, lng: 115.2230 },
      { id: "i6", name: "Cliff Jumping — Blue Lagoon", area: "Nusa Ceningan", note: "The famous 5-15m cliff jumps into crystal-clear blue water. Day trip from Nusa Penida or separate boat trip.", type: "adventure", link: "https://maps.google.com/?q=Blue+Lagoon+Nusa+Ceningan", photo: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200", cost: 0, lat: -8.7050, lng: 115.4480 },
      { id: "i7", name: "Mt Batur Sunrise Hike", area: "Kintamani", note: "2am pickup, 2-hour hike to the summit of an active volcano. Watch the sunrise over the caldera lake with breakfast cooked in volcanic steam.", type: "adventure", link: "https://maps.google.com/?q=Mount+Batur+Bali", photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200", cost: 45, lat: -8.2421, lng: 115.3756 },
      { id: "i8", name: "Canyoning", area: "Gitgit", note: "Rappel down waterfalls, leap into natural pools, and slide down natural rock chutes. Full-day adventure through Gitgit's stunning gorges.", type: "adventure", link: "https://maps.google.com/?q=Gitgit+Waterfall+Bali", photo: "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=1200", cost: 60, lat: -8.3333, lng: 115.3667 },
    ],
  },
  {
    category: "Beaches & Chill",
    emoji: "🏖️",
    items: [
      { id: "i9", name: "Bingin Beach", area: "Uluwatu", note: "Hidden gem down a steep cliff path — rustic bamboo bars perched on rocks, world-class surf, and a boho backpacker vibe.", type: "chill", link: "https://maps.google.com/?q=Bingin+Beach+Bali", photo: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200", cost: 0, lat: -8.8070, lng: 115.1040 },
      { id: "i10", name: "Karma Beach", area: "Ungasan", note: "Private beach club 10 min from Ayana. Reach it via a dramatic inclinator through the cliffs. White sand, clear water, full bar service.", type: "chill", link: "https://www.karmagroup.com/find-destination/karma-beach-bali/", photo: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200", cost: 30, lat: -8.8050, lng: 115.1250 },
      { id: "i11", name: "Melasti Beach", area: "Ungasan", note: "Drive through a dramatic cliff-carved road to reach this stunning turquoise cove. Recently developed but still feels remote and wild.", type: "chill", link: "https://maps.google.com/?q=Melasti+Beach+Ungasan+Bali", photo: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1200", cost: 2, lat: -8.8350, lng: 115.1350 },
      { id: "i12", name: "Suluban Beach", area: "Uluwatu", note: "Enter through a cave and emerge onto a hidden surfer beach beneath towering limestone cliffs. Feels like a movie set.", type: "chill", link: "https://maps.google.com/?q=Suluban+Beach+Bali", photo: "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=1200", cost: 0, lat: -8.8150, lng: 115.0870 },
      { id: "i13", name: "Nyang Nyang Beach", area: "Uluwatu", note: "Bali's most secluded beach — a 500-step trek down to empty white sand. An abandoned shipwreck sits rusting on the shore. Bring supplies.", type: "chill", link: "https://maps.google.com/?q=Nyang+Nyang+Beach+Bali", photo: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1200", cost: 0, lat: -8.8270, lng: 115.0930 },
    ],
  },
  {
    category: "Sunset Spots",
    emoji: "🌅",
    items: [
      { id: "i14", name: "Ulu Cliffhouse", area: "Uluwatu", note: "Multi-tier cliff club with an infinity pool, cocktail bar, and resident DJs. Less hectic than Savaya, more intimate vibes.", type: "nightlife", link: "https://www.ulucliffhouse.com/", photo: "https://images.unsplash.com/photo-1528150230181-99bbf7b22162?w=1200", cost: 30, lat: -8.8100, lng: 115.0950 },
      { id: "i15", name: "The Lawn", area: "Canggu", note: "Giant beanbags on manicured grass right on the beach. Cold beers, ocean views, and zero pretension. Best value sunset in Canggu.", type: "chill", link: "https://maps.google.com/?q=The+Lawn+Canggu+Bali", photo: "https://images.unsplash.com/photo-1468413253725-0d5181091126?w=1200", cost: 15, lat: -8.6530, lng: 115.1340 },
      { id: "i16", name: "Tanah Lot Temple", area: "Tabanan", note: "Ancient Hindu temple perched on a rock formation in the sea, silhouetted against the sunset. One of Bali's most photographed landmarks.", type: "culture", link: "https://maps.google.com/?q=Tanah+Lot+Temple+Bali", photo: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200", cost: 5, lat: -8.6210, lng: 115.0868 },
      { id: "i17", name: "Savaya (Omnia)", area: "Uluwatu", note: "Ultra-premium cliff club with international DJs, a jewel-shaped deck jutting over the ocean, and bottle-service energy. 15 min from Ayana.", type: "nightlife", link: "https://www.savayabali.com/", photo: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200", cost: 50, lat: -8.8120, lng: 115.0960 },
    ],
  },
  {
    category: "Nightlife & Clubs",
    emoji: "🪩",
    items: [
      { id: "i18", name: "Jenja", area: "Seminyak", note: "Upscale underground club with quality house and techno DJs. The sound system is insane — proper club experience.", type: "nightlife", link: "https://maps.google.com/?q=Jenja+Bali", photo: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200", cost: 25, lat: -8.6850, lng: 115.1560 },
      { id: "i19", name: "Mirror Lounge", area: "Seminyak", note: "Bougie cocktail lounge to start the night. Think craft mixology, plush seating, and an Instagram-worthy interior.", type: "nightlife", link: "https://maps.google.com/?q=Mirror+Lounge+Seminyak", photo: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200", cost: 20, lat: -8.6840, lng: 115.1550 },
      { id: "i20", name: "Sky Garden", area: "Kuta", note: "Multi-floor rooftop club with a different vibe on every level. Free entry, cheap drinks, absolutely wild energy. Not classy but legendary.", type: "nightlife", link: "https://skygardenbali.com/", photo: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1200", cost: 20, lat: -8.7180, lng: 115.1700 },
      { id: "i30", name: "Shi Shi", area: "Seminyak", note: "Upscale Japanese-inspired nightclub with hip hop, R&B, and trap. Bottle service, VIP booths, and a crowd that dresses to impress. Bali's answer to a big-city club.", type: "nightlife", link: "https://maps.google.com/?q=Shi+Shi+Seminyak+Bali", photo: "https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=1200", cost: 30, lat: -8.6830, lng: 115.1565 },
      { id: "i31", name: "Mexicola Late Night", area: "Seminyak", note: "After dinner service ends, Motel Mexicola transforms into a full-on party with DJs, dancing on tables, and margarita towers. Peak chaos — peak fun.", type: "nightlife", link: "https://www.motelmexicola.com/", photo: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=1200", cost: 20, lat: -8.6860, lng: 115.1570 },
      { id: "i32", name: "Red Ruby", area: "Seminyak", note: "Hidden speakeasy-style cocktail bar. Ring the doorbell to get in. Craft cocktails in a moody, intimate setting — perfect for a classy start to the night.", type: "nightlife", link: "https://maps.google.com/?q=Red+Ruby+Seminyak+Bali", photo: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1200", cost: 25, lat: -8.6845, lng: 115.1555 },
      { id: "i33", name: "Tropical Temptation", area: "Kuta", note: "No-frills Aussie party bar. Cheap drinks, loud music, rowdy crowd. Think Schoolies energy every night of the week. Fun if you embrace the chaos.", type: "nightlife", link: "https://maps.google.com/?q=Tropical+Temptation+Kuta", photo: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200", cost: 15, lat: -8.7190, lng: 115.1695 },
      { id: "i34", name: "Mari Beach Club", area: "Uluwatu", note: "Newer addition to the Uluwatu cliff club scene. Multi-level venue with infinity pools, daybeds, fire pits, and DJs. Less crowded than Savaya but same calibre views.", type: "nightlife", link: "https://maps.google.com/?q=Mari+Beach+Club+Uluwatu", photo: "https://images.unsplash.com/photo-1528150230181-99bbf7b22162?w=1200", cost: 35, lat: -8.8090, lng: 115.0980 },
    ],
  },
  {
    category: "Food & Drink",
    emoji: "🍜",
    items: [
      { id: "i21", name: "Naughty Nuri's", area: "Seminyak/Ubud", note: "Famous fall-off-the-bone pork ribs and dangerously strong dirty martinis. A Bali institution since 1995.", type: "food", link: "https://maps.google.com/?q=Naughty+Nuris+Bali", photo: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1200", cost: 25, lat: -8.5090, lng: 115.2630 },
      { id: "i22", name: "Warung Babi Guling Ibu Oka", area: "Ubud", note: "Legendary roast suckling pig — crispy skin, tender meat, spicy sambal. Anthony Bourdain called it the best pig he'd ever eaten.", type: "food", link: "https://maps.google.com/?q=Ibu+Oka+Ubud", photo: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200", cost: 8, lat: -8.5023, lng: 115.2627 },
      { id: "i23", name: "Barbacoa", area: "Petitenget", note: "Argentinian-style wood-fired grill with premium steaks, smoky ribs, and a dark moody atmosphere. The wagyu tomahawk is unreal.", type: "food", link: "https://maps.google.com/?q=Barbacoa+Bali", photo: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=1200", cost: 40, lat: -8.6800, lng: 115.1590 },
      { id: "i24", name: "Fishbone Local", area: "Canggu", note: "Fresh-caught fish BBQ on a budget. Pick your fish, pick your sauce, they grill it on charcoal. Simple and incredible.", type: "food", link: "https://maps.google.com/?q=Fishbone+Local+Canggu", photo: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=1200", cost: 12, lat: -8.6480, lng: 115.1380 },
      { id: "i25", name: "Night Market", area: "Various", note: "Street food paradise — satay skewers, nasi goreng, bakso soup, martabak pancakes. Full meal for $2-3. Hit the Gianyar or Sanur night markets.", type: "food", link: "https://maps.google.com/?q=Pasar+Malam+Bali", photo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200", cost: 5, lat: -8.6550, lng: 115.2170 },
    ],
  },
  {
    category: "Culture & Nature",
    emoji: "🛕",
    items: [
      { id: "i26", name: "Tirta Empul Temple", area: "Tampaksiring", note: "Sacred spring temple where Balinese Hindus perform purification rituals. You can participate — walk through the holy spring fountains yourself.", type: "culture", link: "https://maps.google.com/?q=Tirta+Empul+Temple", photo: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200", cost: 5, lat: -8.4153, lng: 115.3153 },
      { id: "i27", name: "Tibumana Waterfall", area: "Ubud", note: "Hidden gem waterfall with far fewer tourists than Tegenungan. Lush jungle setting, crystal-clear swimming hole, and a peaceful bamboo bridge.", type: "culture", link: "https://maps.google.com/?q=Tibumana+Waterfall+Bali", photo: "https://images.unsplash.com/photo-1549144511-f099e773c147?w=1200", cost: 2, lat: -8.4850, lng: 115.3520 },
      { id: "i28", name: "Handara Gate", area: "Bedugul", note: "The famous ornate Balinese split gate surrounded by misty mountains. Quick photo stop — expect a small queue but the shot is iconic.", type: "culture", link: "https://maps.google.com/?q=Handara+Gate+Bali", photo: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=1200", cost: 5, lat: -8.2840, lng: 115.2070 },
      { id: "i29", name: "Lempuyang (Gates of Heaven)", area: "East Bali", note: "Mount Agung framed perfectly through an ancient temple gate — one of the most photographed spots in Indonesia. 2-hour drive but absolutely worth it.", type: "culture", link: "https://maps.google.com/?q=Lempuyang+Temple+Bali", photo: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=1200", cost: 5, lat: -8.3917, lng: 115.6308 },
    ],
  },
  {
    category: "Shopping & Tailoring",
    emoji: "🧵",
    items: [
      { id: "i30", name: "Custom Suits — Bali Tailor", area: "Seminyak", note: "Bali is like Vietnam for suits! Get custom-made suits, shirts, and pants for a fraction of Aussie prices. Full suit from ~$100-200 AUD. 24-48hr turnaround with fittings.", type: "culture", link: "https://www.balitailor.net/", photo: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200", cost: 150, lat: -8.6890, lng: 115.1680 },
      { id: "i31", name: "Micall's Tailor", area: "Seminyak", note: "20+ year family-owned tailor shop. Great for suits, blazers, and dress shirts. Bring a reference pic of what you want — they'll nail it. Book early in the trip so you have time for alterations.", type: "culture", link: "https://micallstailor.com/", photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200", cost: 180, lat: -8.6900, lng: 115.1650 },
      { id: "i32", name: "Anika Tailor", area: "Kuta/Legian", note: "Another top-rated Bali tailor. Wide fabric selection including imported Italian wool. A couple of suits + extra shirts will run under $900 AUD — a steal compared to back home.", type: "culture", link: "https://anikatailor.com/", photo: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1200", cost: 200, lat: -8.7220, lng: 115.1700 },
    ],
  },
  {
    category: "Boats & Water Sports",
    emoji: "🚤",
    items: [
      { id: "i33", name: "Jet Ski Rental — Tanjung Benoa", area: "Tanjung Benoa", note: "The water sports capital of Bali. Jet ski rentals from ~$25 AUD/15 mins. Rip around Benoa harbour — they'll guide you on a route. Bargain hard, listed prices are always inflated.", type: "adventure", link: "https://www.tripadvisor.com/Attractions-g294226-Activities-c61-t187-Bali.html", photo: "https://images.unsplash.com/photo-1626163015551-18a0e9287ec2?w=1200", cost: 35, lat: -8.7730, lng: 115.2320 },
      { id: "i34", name: "Private Speedboat Charter", area: "Nusa Dua / Sanur", note: "Charter a private speedboat for the boys — island hop to Nusa Penida/Lembongan or just cruise the coast. Half-day from ~$350-500 AUD split 4 ways. GetMyBoat or Bali Boat Charters.", type: "adventure", link: "https://www.bali-boat-charters.com/", photo: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200", cost: 100, lat: -8.7500, lng: 115.2230 },
      { id: "i35", name: "Parasailing & Flyboard", area: "Tanjung Benoa", note: "Get launched 70m in the air parasailing or try a flyboard (water-powered jetpack). Tanjung Benoa has every water sport imaginable. ~$25-40 AUD per activity.", type: "adventure", link: "https://www.getmyboat.com/boat-rental/Bali--Indonesia/", photo: "https://images.unsplash.com/photo-1530870110042-98b2cb110834?w=1200", cost: 35, lat: -8.7710, lng: 115.2310 },
      { id: "i36", name: "Sunset Catamaran Cruise", area: "Benoa Harbour", note: "Chill option — sunset cruise on a catamaran with drinks and dinner. Aristocat or Bali Hai cruises are popular. ~$80-120 AUD pp. Great vibes watching the sun go down on the water.", type: "chill", link: "https://www.bali-boat-charters.com/", photo: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=1200", cost: 100, lat: -8.7450, lng: 115.2100 },
    ],
  },
];

export const packingList = [
  { id: "p1", category: "Essentials", items: ["Passport", "Travel insurance docs", "Hotel booking confirmation", "Flight tickets (printed)", "Cash (IDR + AUD)", "Debit/credit card", "Phone charger + power bank", "Grab app installed"] },
  { id: "p2", category: "Clothes", items: ["Boardshorts x3", "T-shirts x5", "One nice outfit (clubs)", "Thongs/sandals", "Sneakers (for hikes)", "Sunnies", "Hat/cap", "Light rain jacket"] },
  { id: "p3", category: "Beach & Adventure", items: ["Sunscreen SPF50+", "Rashie/swim shirt", "Waterproof phone case", "Underwater camera/GoPro", "Reef-safe sunscreen", "Dry bag"] },
  { id: "p4", category: "Health", items: ["Insect repellent", "Imodium (trust me)", "Panadol/Nurofen", "Band-aids", "Hand sanitiser", "Rehydration sachets"] },
];

export const weatherData = {
  month: "June",
  avgTemp: 27,
  avgHigh: 30,
  avgLow: 24,
  humidity: "70%",
  rainfall: "53mm",
  rainyDays: 4,
  sunrise: "6:25 AM",
  sunset: "5:55 PM",
  uvIndex: "High (8-10)",
  waterTemp: 28,
  season: "Dry Season ☀️",
};
