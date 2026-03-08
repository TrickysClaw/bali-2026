"use client";
import { useState, useCallback, useMemo, useEffect, SyntheticEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";
import type { MapFilter } from "./components/TripMap";

const TripMap = dynamic(() => import("./components/TripMap"), { ssr: false, loading: () => <div className="w-full h-[500px] bg-white/[0.03] rounded-2xl animate-pulse" /> });

const FALLBACK_GRADIENT = "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)";

const typeGradients: Record<string, string> = {
  adventure: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)",
  food: "linear-gradient(135deg, #78350f 0%, #92400e 50%, #b45309 100%)",
  nightlife: "linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #7c3aed 100%)",
  chill: "linear-gradient(135deg, #164e63 0%, #155e75 50%, #0891b2 100%)",
  culture: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #059669 100%)",
  transport: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
};

function Countdown() {
  const target = new Date("2026-06-03T11:35:00+08:00").getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      {[
        { val: days, label: "days" },
        { val: hours, label: "hrs" },
        { val: minutes, label: "min" },
        { val: seconds, label: "sec" },
      ].map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-black tabular-nums text-cyan-400">{String(u.val).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-widest text-white/40">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

function FallbackIllustration({ type, size = "large" }: { type: string; size?: "large" | "small" }) {
  const gradient = typeGradients[type] || typeGradients.chill;
  const iconMap: Record<string, string> = {
    adventure: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    food: "M3 2l1.578 4.657A2 2 0 0 0 6.473 8H20M3 2l5 14h13l1-4H8.5M6 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z",
    nightlife: "M5.8 11.3 2 22l10.7-3.79M5.8 11.3l4.57-4.57M5.8 11.3l5.54 5.54M15 5l-4.8 4.8M15 5l4.95 4.95M15 5V2M22 22l-3.79-10.7M22 22l-5.54-5.54M22 22h-7",
    chill: "M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h5zm0 0h9m-9 0v14",
    culture: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3",
    transport: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2M7 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm8 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z",
  };
  if (size === "small") {
    return (
      <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: gradient }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
          <path d={iconMap[type] || iconMap.chill} />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative aspect-[21/9] w-full overflow-hidden flex items-center justify-center" style={{ background: gradient }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
        <path d={iconMap[type] || iconMap.chill} />
      </svg>
    </div>
  );
}

function handleImgError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  img.style.display = "none";
  const parent = img.parentElement;
  if (parent && !parent.querySelector(".img-fallback")) {
    const fallback = document.createElement("div");
    fallback.className = "img-fallback absolute inset-0 flex items-center justify-center";
    fallback.style.background = FALLBACK_GRADIENT;
    fallback.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>`;
    parent.appendChild(fallback);
  }
}
import {
  MapPin, Clock, ExternalLink, ArrowLeftRight, ChevronUp, ChevronDown,
  Flame, UtensilsCrossed, PartyPopper, Palmtree, Landmark, Car,
  DollarSign, CheckSquare, Square, Cloud, Sun, Droplets, Thermometer,
  Lightbulb, GripVertical, StickerIcon, MessageSquare, ThumbsUp, X, Plus, Trash2,
  Plane, Calendar, Users, Hotel, ChevronRight, Package, Map, Copy, Share, Timer
} from "lucide-react";
import {
  initialDays, initialIdeas, packingList, weatherData,
  typeConfig, Activity, DayData, IdeaItem, IdeaCategory
} from "./data/tripData";

const typeIcons: Record<string, React.ReactNode> = {
  adventure: <Flame className="w-3 h-3" />,
  food: <UtensilsCrossed className="w-3 h-3" />,
  nightlife: <PartyPopper className="w-3 h-3" />,
  chill: <Palmtree className="w-3 h-3" />,
  culture: <Landmark className="w-3 h-3" />,
  transport: <Car className="w-3 h-3" />,
};

type TabType = "itinerary" | "ideas" | "map" | "budget" | "packing" | "weather";

export default function Home() {
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("itinerary");
  const [days, setDays] = useState(initialDays);
  const [ideas, setIdeas] = useState(initialIdeas);
  const [swapSource, setSwapSource] = useState<{ dayIdx: number; actIdx: number } | null>(null);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [activityNotes, setActivityNotes] = useState<Record<string, string[]>>({});
  const [activityVotes, setActivityVotes] = useState<Record<string, number>>({});
  const [noteInput, setNoteInput] = useState<Record<string, string>>({});
  const [expandedNotes, setExpandedNotes] = useState<Set<string>>(new Set());
  const [mapShowAll, setMapShowAll] = useState(false);
  const [mapFilter, setMapFilter] = useState<MapFilter>("itinerary");

  // Budget calculation
  const dayBudgets = useMemo(() =>
    days.map(d => d.activities.reduce((sum, a) => sum + (a.cost || 0), 0)),
    [days]
  );
  const totalBudget = useMemo(() => dayBudgets.reduce((a, b) => a + b, 0), [dayBudgets]);

  const handleSwapFromItinerary = (dayIdx: number, actIdx: number) => {
    if (swapSource?.dayIdx === dayIdx && swapSource?.actIdx === actIdx) {
      setSwapSource(null);
      return;
    }
    setSwapSource({ dayIdx, actIdx });
    setActiveTab("ideas");
    toast("Pick an idea to swap with ↓", { icon: "🔄" });
  };

  const handleSwapWithIdea = (catIdx: number, itemIdx: number) => {
    if (!swapSource) return;
    const newDays = JSON.parse(JSON.stringify(days));
    const newIdeas = JSON.parse(JSON.stringify(ideas));
    const act = newDays[swapSource.dayIdx].activities[swapSource.actIdx];
    const idea = newIdeas[catIdx].items[itemIdx];

    newDays[swapSource.dayIdx].activities[swapSource.actIdx] = {
      id: idea.id, time: act.time, title: idea.name, desc: idea.note,
      type: idea.type, distance: idea.area, link: idea.link, photo: idea.photo,
      cost: idea.cost, lat: idea.lat, lng: idea.lng,
    };
    newIdeas[catIdx].items[itemIdx] = {
      id: act.id, name: act.title, area: act.distance || "Various",
      note: act.desc, type: act.type, link: act.link, photo: act.photo,
      cost: act.cost, lat: act.lat, lng: act.lng,
    };

    setDays(newDays);
    setIdeas(newIdeas);
    toast.success(`Swapped "${act.title}" ↔ "${idea.name}"`);
    setSwapSource(null);
  };

  const moveActivity = (dayIdx: number, actIdx: number, direction: "up" | "down") => {
    const newDays = [...days];
    const acts = [...newDays[dayIdx].activities];
    const newIdx = direction === "up" ? actIdx - 1 : actIdx + 1;
    if (newIdx < 0 || newIdx >= acts.length) return;
    [acts[actIdx], acts[newIdx]] = [acts[newIdx], acts[actIdx]];
    // Swap times too
    const tmpTime = acts[actIdx].time;
    acts[actIdx] = { ...acts[actIdx], time: acts[newIdx].time };
    acts[newIdx] = { ...acts[newIdx], time: tmpTime };
    newDays[dayIdx] = { ...newDays[dayIdx], activities: acts };
    setDays(newDays);
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addNote = (actId: string) => {
    const text = noteInput[actId]?.trim();
    if (!text) return;
    setActivityNotes(prev => ({
      ...prev,
      [actId]: [...(prev[actId] || []), text],
    }));
    setNoteInput(prev => ({ ...prev, [actId]: "" }));
    toast.success("Note added");
  };

  const removeNote = (actId: string, idx: number) => {
    setActivityNotes(prev => ({
      ...prev,
      [actId]: prev[actId].filter((_, i) => i !== idx),
    }));
  };

  const vote = (actId: string, delta: number) => {
    setActivityVotes(prev => ({
      ...prev,
      [actId]: Math.max(0, (prev[actId] || 0) + delta),
    }));
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: "itinerary", label: "Itinerary", icon: <Calendar className="w-4 h-4" /> },
    { id: "map", label: "Map", icon: <Map className="w-4 h-4" /> },
    { id: "ideas", label: "Ideas", icon: <Lightbulb className="w-4 h-4" /> },
    { id: "budget", label: "Budget", icon: <DollarSign className="w-4 h-4" /> },
    { id: "packing", label: "Packing", icon: <Package className="w-4 h-4" /> },
    { id: "weather", label: "Weather", icon: <Cloud className="w-4 h-4" /> },
  ];

  const packingProgress = useMemo(() => {
    const total = packingList.reduce((sum, cat) => sum + cat.items.length, 0);
    const checked = packingList.reduce((sum, cat) =>
      sum + cat.items.filter(item => checkedItems.has(`pack-${item}`)).length, 0);
    return { total, checked, pct: total > 0 ? Math.round((checked / total) * 100) : 0 };
  }, [checkedItems]);

  return (
    <main className="min-h-screen bg-[#070b14] text-white selection:bg-cyan-500/30">
      <Toaster position="top-center" toastOptions={{
        style: { background: "#1e293b", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" },
      }} />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600')", backgroundColor: "#0f172a" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#070b14]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <p className="text-cyan-400 tracking-[0.3em] uppercase text-sm mb-4 font-medium">June 3–9, 2026</p>
          <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tight">BALI</h1>
          <p className="text-2xl md:text-3xl font-light text-white/80 mb-2">The Boys Trip</p>
          <p className="text-lg text-white/50 mb-8">4 legends · 7 days · AYANA Resort, Jimbaran</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              { icon: <Hotel className="w-3.5 h-3.5" />, label: "AYANA Resort" },
              { icon: <Plane className="w-3.5 h-3.5" />, label: "Arrive 11:35am" },
              { icon: <Plane className="w-3.5 h-3.5 rotate-90" />, label: "Depart 10:15pm" },
              { icon: <Users className="w-3.5 h-3.5" />, label: "Squad of 4" },
            ].map((t) => (
              <span key={t.label} className="px-4 py-2 bg-white/5 backdrop-blur border border-white/10 rounded-full inline-flex items-center gap-2">
                {t.icon} {t.label}
              </span>
            ))}
          </div>
          <Countdown />
        </motion.div>
      </section>

      {/* Main Tabs */}
      <section className="sticky top-0 z-50 bg-[#070b14]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id !== "ideas") setSwapSource(null); }}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all inline-flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white border border-white/10"
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon} {tab.label}
                {tab.id === "packing" && packingProgress.checked > 0 && (
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-1.5 rounded-full">{packingProgress.pct}%</span>
                )}
              </button>
            ))}
          </div>

          {/* Day sub-tabs for itinerary */}
          {activeTab === "itinerary" && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3">
              {days.map((day, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeDay === i
                      ? `bg-gradient-to-r ${day.gradient} text-white shadow-lg`
                      : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {day.emoji} Day {i + 1}
                </button>
              ))}
              <span className="text-xs text-slate-600 ml-2">
                ~${dayBudgets[activeDay]}/person today
              </span>
            </div>
          )}
        </div>

        {/* Swap banner */}
        <AnimatePresence>
          {swapSource && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="max-w-6xl mx-auto px-4 pb-2">
                <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Swapping: &quot;{days[swapSource.dayIdx].activities[swapSource.actIdx].title}&quot; from Day {swapSource.dayIdx + 1}</span>
                  <button onClick={() => setSwapSource(null)} className="ml-auto text-amber-300 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* === ITINERARY TAB === */}
      {activeTab === "itinerary" && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl">{days[activeDay].emoji}</span>
                <div>
                  <p className="text-sm text-slate-500">{days[activeDay].date}</p>
                  <h2 className="text-2xl sm:text-3xl font-bold">{days[activeDay].title}</h2>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-16 text-sm">
                <span className="text-slate-400 inline-flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {days[activeDay].theme}</span>
                <span className="text-slate-600">~${dayBudgets[activeDay]} AUD/person</span>
              </div>
            </div>

            {/* Daily Summary Card */}
            <div className="mb-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4 sm:p-5">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-black text-white">{days[activeDay].activities.length}</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Activities</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-green-400">${dayBudgets[activeDay]}</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Per Person</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-400">
                    {(() => {
                      const types = days[activeDay].activities.map(a => a.type);
                      const counts = types.reduce((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc; }, {} as Record<string, number>);
                      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
                      return top ? typeConfig[top[0] as keyof typeof typeConfig]?.label || top[0] : "—";
                    })()}
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-500">Main Vibe</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/5 flex-wrap">
                <span className="text-xs text-slate-500">Highlights:</span>
                {days[activeDay].activities.filter(a => a.type !== "transport").slice(0, 3).map(a => (
                  <span key={a.id} className={`text-[10px] px-2 py-0.5 rounded-full ${typeConfig[a.type].bg} ${typeConfig[a.type].text}`}>{a.title}</span>
                ))}
              </div>
            </div>

            {/* Photo Gallery - horizontal scroll */}
            {days[activeDay].activities.filter(a => a.photo).length > 0 && (
              <div className="mb-6 -mx-4 sm:-mx-6">
                <div className="flex gap-2 overflow-x-auto px-4 sm:px-6 pb-2 scrollbar-hide">
                  {days[activeDay].activities.filter(a => a.photo).map(a => (
                    <div key={a.id} className="flex-shrink-0 w-40 h-24 rounded-xl overflow-hidden relative group/thumb">
                      <img src={a.photo} alt={a.title} className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition flex items-end p-2">
                        <span className="text-[10px] text-white font-medium truncate">{a.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {days[activeDay].activities.map((act, i) => {
                  const tc = typeConfig[act.type];
                  const voteCount = activityVotes[act.id] || 0;
                  const notes = activityNotes[act.id] || [];
                  const notesExpanded = expandedNotes.has(act.id);

                  return (
                    <motion.div
                      key={act.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: i * 0.03 }}
                      className="group"
                    >
                      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 shadow-lg shadow-black/20">
                        {/* Photo Banner or Fallback */}
                        {act.photo ? (
                          <div className="relative aspect-[21/9] w-full overflow-hidden">
                            <img src={act.photo} alt={act.title} onError={handleImgError} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span className="text-xs font-mono bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white font-bold inline-flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {act.time}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${tc.bg} ${tc.text} border ${tc.border} uppercase tracking-wider font-bold backdrop-blur-sm inline-flex items-center gap-1`}>
                                {typeIcons[act.type]} {tc.label}
                              </span>
                              {act.distance && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 text-white/70 backdrop-blur-sm inline-flex items-center gap-1">
                                  <MapPin className="w-2.5 h-2.5" /> {act.distance}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="relative">
                            <FallbackIllustration type={act.type} />
                            <div className="absolute top-3 left-3 flex items-center gap-2">
                              <span className="text-xs font-mono bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg text-white font-bold inline-flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {act.time}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3 flex items-center gap-1.5">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${tc.bg} ${tc.text} border ${tc.border} uppercase tracking-wider font-bold backdrop-blur-sm inline-flex items-center gap-1`}>
                                {typeIcons[act.type]} {tc.label}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="p-4 sm:p-5">

                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-base sm:text-lg mb-1">{act.title}</h3>
                              <p className="text-slate-400 text-sm leading-relaxed">{act.desc}</p>
                              {act.cost !== undefined && act.cost > 0 && (
                                <p className="text-xs text-slate-500 mt-1 inline-flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" /> ~${act.cost} AUD/person
                                </p>
                              )}
                            </div>

                            {/* Vote buttons */}
                            <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                              <button onClick={() => vote(act.id, 1)} className="p-1 text-slate-500 hover:text-cyan-400 transition">
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                              <span className={`text-xs font-bold ${voteCount > 0 ? "text-cyan-400" : "text-slate-600"}`}>{voteCount}</span>
                              <button onClick={() => vote(act.id, -1)} className="p-1 text-slate-500 hover:text-red-400 transition rotate-180">
                                <ThumbsUp className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 mt-3 flex-wrap">
                            {act.link && (
                              <a href={act.link} target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg hover:bg-cyan-500/20 transition inline-flex items-center gap-1">
                                <ExternalLink className="w-3 h-3" /> View
                              </a>
                            )}
                            <button
                              onClick={() => handleSwapFromItinerary(activeDay, i)}
                              className={`text-xs px-3 py-1.5 rounded-lg transition inline-flex items-center gap-1 ${
                                swapSource?.dayIdx === activeDay && swapSource?.actIdx === i
                                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                  : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                              }`}
                            >
                              <ArrowLeftRight className="w-3 h-3" /> Swap
                            </button>
                            <button
                              onClick={() => setExpandedNotes(prev => {
                                const next = new Set(prev);
                                next.has(act.id) ? next.delete(act.id) : next.add(act.id);
                                return next;
                              })}
                              className="text-xs px-3 py-1.5 bg-white/5 text-slate-400 border border-white/10 rounded-lg hover:bg-white/10 transition inline-flex items-center gap-1"
                            >
                              <MessageSquare className="w-3 h-3" /> Notes {notes.length > 0 && `(${notes.length})`}
                            </button>
                            <div className="flex items-center gap-0.5 ml-auto">
                              <button onClick={() => moveActivity(activeDay, i, "up")} disabled={i === 0} className="p-1.5 text-slate-600 hover:text-white disabled:opacity-20 transition">
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button onClick={() => moveActivity(activeDay, i, "down")} disabled={i === days[activeDay].activities.length - 1} className="p-1.5 text-slate-600 hover:text-white disabled:opacity-20 transition">
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Notes section */}
                          <AnimatePresence>
                            {notesExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-3 pt-3 border-t border-white/5">
                                  {notes.map((note, ni) => (
                                    <div key={ni} className="flex items-start gap-2 mb-2 text-sm text-slate-300">
                                      <span className="text-slate-500 mt-0.5">•</span>
                                      <span className="flex-1">{note}</span>
                                      <button onClick={() => removeNote(act.id, ni)} className="text-slate-600 hover:text-red-400 transition flex-shrink-0">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ))}
                                  <div className="flex items-center gap-2 mt-2">
                                    <input
                                      type="text"
                                      value={noteInput[act.id] || ""}
                                      onChange={e => setNoteInput(prev => ({ ...prev, [act.id]: e.target.value }))}
                                      onKeyDown={e => e.key === "Enter" && addNote(act.id)}
                                      placeholder="Add a note..."
                                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500/30 placeholder:text-slate-600"
                                    />
                                    <button onClick={() => addNote(act.id)} className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-lg text-xs hover:bg-cyan-500/20 transition">
                                      <Plus className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>
      )}

      {/* === MAP TAB === */}
      {activeTab === "map" && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold inline-flex items-center gap-2"><Map className="w-7 h-7 text-cyan-400" /> Trip Map</h2>
                <p className="text-slate-500 mt-1">All your activities pinned — colour-coded by type</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10">
                  {(["itinerary", "ideas", "both"] as MapFilter[]).map(f => (
                    <button
                      key={f}
                      onClick={() => setMapFilter(f)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                        mapFilter === f ? "bg-white/10 text-white" : "text-slate-500 hover:text-white"
                      }`}
                    >
                      {f === "both" ? "Both" : f === "ideas" ? "💡 Ideas" : "📍 Itinerary"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {mapFilter !== "ideas" && (
            <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() => setMapShowAll(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${!mapShowAll ? "bg-white/10 text-white border border-white/10" : "text-slate-500 hover:text-white hover:bg-white/5"}`}
                >
                  {days[activeDay].emoji} Day {activeDay + 1}
                </button>
                <button
                  onClick={() => setMapShowAll(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${mapShowAll ? "bg-white/10 text-white border border-white/10" : "text-slate-500 hover:text-white hover:bg-white/5"}`}
                >
                  🗺️ All Days
                </button>
            </div>
            )}
            {!mapShowAll && mapFilter !== "ideas" && (
              <div className="flex items-center gap-1.5 overflow-x-auto mb-4">
                {days.map((day, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveDay(i)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      activeDay === i
                        ? `bg-gradient-to-r ${day.gradient} text-white shadow-lg`
                        : "bg-white/5 text-slate-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {day.emoji} Day {i + 1}
                  </button>
                ))}
              </div>
            )}
            <div className="h-[550px] sm:h-[650px]">
              <TripMap days={days} activeDay={activeDay} showAllDays={mapShowAll} ideas={ideas} mapFilter={mapFilter} />
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {Object.entries(typeConfig).map(([key, tc]) => (
                <span key={key} className={`text-[10px] px-2 py-1 rounded-full ${tc.bg} ${tc.text} uppercase tracking-wider font-bold`}>
                  {tc.label}
                </span>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* === IDEAS TAB === */}
      {activeTab === "ideas" && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold mb-2 inline-flex items-center gap-2"><Lightbulb className="w-7 h-7 text-amber-400" /> Activity Ideas</h2>
            <p className="text-slate-500 mb-8">
              {swapSource ? "Click any idea to swap it into your itinerary" : "Click Swap on any activity first, then pick a replacement here"}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {ideas.map((cat, catIdx) => (
                <motion.div
                  key={cat.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIdx * 0.05 }}
                  className="bg-white/[0.02] border border-white/5 rounded-2xl p-5"
                >
                  <h3 className="text-lg font-bold mb-4">{cat.emoji} {cat.category}</h3>
                  <div className="space-y-2">
                    {cat.items.map((item, itemIdx) => {
                      const tc = typeConfig[item.type];
                      return (
                        <div
                          key={item.id}
                          className={`flex items-start gap-3 p-3 rounded-xl transition border ${
                            swapSource
                              ? "cursor-pointer hover:bg-cyan-500/5 border-transparent hover:border-cyan-500/30"
                              : "border-transparent"
                          }`}
                          onClick={() => swapSource && handleSwapWithIdea(catIdx, itemIdx)}
                        >
                          {item.photo ? (
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                              <img src={item.photo} alt={item.name} onError={handleImgError} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                            </div>
                          ) : (
                            <FallbackIllustration type={item.type} size="small" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <p className="font-medium text-sm">{item.name}</p>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${tc.bg} ${tc.text} uppercase tracking-wider font-bold inline-flex items-center gap-0.5`}>
                                {typeIcons[item.type]} {tc.label}
                              </span>
                              {item.cost !== undefined && (
                                <span className="text-[9px] text-slate-500">${item.cost}</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500">{item.area} — {item.note}</p>
                            <div className="flex items-center gap-2 mt-1">
                              {item.link && (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="text-[10px] text-cyan-400 hover:underline inline-flex items-center gap-0.5">
                                  <ExternalLink className="w-2.5 h-2.5" /> View
                                </a>
                              )}
                              {swapSource && (
                                <span className="text-[10px] text-amber-400 inline-flex items-center gap-0.5">
                                  <ArrowLeftRight className="w-2.5 h-2.5" /> Click to swap
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* === BUDGET TAB === */}
      {activeTab === "budget" && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold mb-2 inline-flex items-center gap-2"><DollarSign className="w-7 h-7 text-green-400" /> Budget Estimate</h2>
            <p className="text-slate-500 mb-8">Per person, excluding accommodation & flights</p>

            {/* Total */}
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-6 mb-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total Trip Estimate</p>
                  <p className="text-5xl font-black text-green-400">${totalBudget}</p>
                  <p className="text-sm text-slate-500 mt-1">AUD per person · 7 days</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-400">Daily Average</p>
                  <p className="text-2xl font-bold text-white">${Math.round(totalBudget / 7)}/day</p>
                </div>
              </div>
            </div>

            {/* Per day breakdown */}
            <div className="space-y-4">
              {days.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/[0.03] border border-white/5 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{day.emoji}</span>
                      <div>
                        <p className="font-semibold text-sm">{day.title}</p>
                        <p className="text-xs text-slate-500">{day.date}</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-green-400">${dayBudgets[i]}</span>
                  </div>
                  {/* Cost bars */}
                  <div className="space-y-1">
                    {day.activities.filter(a => a.cost && a.cost > 0).map(act => {
                      const tc = typeConfig[act.type];
                      const pct = dayBudgets[i] > 0 ? (act.cost! / dayBudgets[i]) * 100 : 0;
                      return (
                        <div key={act.id} className="flex items-center gap-2 text-xs">
                          <span className="w-32 sm:w-48 text-slate-400 truncate">{act.title}</span>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full bg-gradient-to-r ${day.gradient}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-slate-500 w-10 text-right">${act.cost}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* === PACKING TAB === */}
      {activeTab === "packing" && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold mb-2 inline-flex items-center gap-2"><Package className="w-7 h-7 text-blue-400" /> Packing List</h2>
            <p className="text-slate-500 mb-8">Don&apos;t forget anything — tick off as you pack</p>

            {/* Progress bar */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Progress</span>
                <span className="text-sm font-bold text-cyan-400">{packingProgress.checked}/{packingProgress.total} items ({packingProgress.pct}%)</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${packingProgress.pct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {packingList.map(cat => (
                <div key={cat.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5">
                  <h3 className="font-bold mb-3">{cat.category}</h3>
                  <div className="space-y-2">
                    {cat.items.map(item => {
                      const checked = checkedItems.has(`pack-${item}`);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleCheck(`pack-${item}`)}
                          className="flex items-center gap-3 w-full text-left py-1 group"
                        >
                          {checked ? (
                            <CheckSquare className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0" />
                          )}
                          <span className={`text-sm transition ${checked ? "text-slate-500 line-through" : "text-slate-300"}`}>
                            {item}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* === WEATHER TAB === */}
      {activeTab === "weather" && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-3xl font-bold mb-2 inline-flex items-center gap-2"><Sun className="w-7 h-7 text-amber-400" /> June Weather</h2>
            <p className="text-slate-500 mb-8">Bali, Indonesia — {weatherData.season}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: <Thermometer className="w-6 h-6 text-red-400" />, label: "Avg Temperature", value: `${weatherData.avgTemp}°C`, sub: `${weatherData.avgLow}° – ${weatherData.avgHigh}°` },
                { icon: <Droplets className="w-6 h-6 text-blue-400" />, label: "Rainfall", value: weatherData.rainfall, sub: `${weatherData.rainyDays} rainy days` },
                { icon: <Sun className="w-6 h-6 text-amber-400" />, label: "UV Index", value: weatherData.uvIndex, sub: "Wear SPF50+" },
                { icon: <Cloud className="w-6 h-6 text-cyan-400" />, label: "Water Temp", value: `${weatherData.waterTemp}°C`, sub: "Perfect for swimming" },
              ].map(stat => (
                <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-center">
                  <div className="flex justify-center mb-3">{stat.icon}</div>
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                  <p className="text-xs text-slate-600 mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
                <h3 className="font-bold mb-3 inline-flex items-center gap-2"><Sun className="w-4 h-4 text-amber-400" /> Daylight</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-400">Sunrise</span><span>{weatherData.sunrise}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Sunset</span><span>{weatherData.sunset}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Humidity</span><span>{weatherData.humidity}</span></div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5">
                <h3 className="font-bold mb-3">☀️ What This Means</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  June is peak dry season — the best time to visit Bali. Expect mostly sunny days with 
                  occasional brief afternoon showers. Humidity is comfortable. Perfect for beach days, 
                  temple visits, and outdoor adventures. Sunscreen is non-negotiable with UV that high.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Share Button */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <button
          onClick={() => {
            const summary = days.map((d, i) => {
              const acts = d.activities.map(a => `  ${a.time} — ${a.title}${a.cost ? ` ($${a.cost})` : ""}`).join("\n");
              return `📅 Day ${i + 1}: ${d.title} (${d.date})\n${d.theme}\n${acts}`;
            }).join("\n\n");
            const text = `🌴 BALI 2026 — THE BOYS TRIP 🌴\nJune 3–9 · AYANA Resort, Jimbaran\n4 legends · 7 days · ~$${totalBudget} AUD/person\n\n${summary}\n\nBuilt with 🪷 by Claw`;
            navigator.clipboard.writeText(text).then(() => toast.success("Trip summary copied! Send it to the boys 🤙"));
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 font-semibold hover:from-cyan-500/20 hover:to-blue-500/20 transition-all inline-flex items-center justify-center gap-2"
        >
          <Share className="w-4 h-4" /> Share with the boys
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm">
        Built with 🪷 by Claw · AYANA Resort, Jimbaran, Bali
      </footer>
    </main>
  );
}
