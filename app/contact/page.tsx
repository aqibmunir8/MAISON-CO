"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Car,
  Train,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  ShieldCheck,
  Wine,
  Utensils,
  Coffee,
  Moon,
  Info,
  Compass,
  ChevronRight,
  HeartHandshake,
  Users,
  Briefcase,
  Megaphone,
  Dog,
  Baby,
  Shirt,
  TimerReset,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useStore } from "@/context/StoreContext";
import { cn } from "@/lib/utils";

// Service Hours Configuration
interface ServicePeriod {
  id: string;
  name: string;
  category: string;
  schedule: string;
  hoursDetail: string;
  icon: React.ElementType;
  description: string;
  isActiveNow: (day: number, hour: number, minute: number) => boolean;
}

const SERVICE_PERIODS: ServicePeriod[] = [
  {
    id: "bakery-coffee",
    name: "Morning Bakery & Specialty Coffee",
    category: "Viennoiserie & Espresso",
    schedule: "Mon – Sun: 7:00 AM – 3:30 PM",
    hoursDetail: "Fresh stone-milled sourdough, laminated pastries & single-origin espresso bar",
    icon: Coffee,
    description: "Walk-ins warmly welcomed for takeaway pastry boxes and café counter seating.",
    isActiveNow: (day, hour, min) => {
      const time = hour + min / 60;
      return time >= 7.0 && time < 15.5;
    },
  },
  {
    id: "brunch-lunch",
    name: "All-Day Brunch & Lunch",
    category: "Market Kitchen & Savory",
    schedule: "Mon–Fri: 11:00 AM – 3:30 PM | Sat–Sun: 9:00 AM – 3:30 PM",
    hoursDetail: "Seasonal salads, wood-fired hearth flatbreads, and natural wines by the glass",
    icon: Utensils,
    description: "Reservations advised for indoor dining room; terrace garden accepts walk-ins.",
    isActiveNow: (day, hour, min) => {
      const time = hour + min / 60;
      const isWeekend = day === 0 || day === 6;
      const start = isWeekend ? 9.0 : 11.0;
      return time >= start && time < 15.5;
    },
  },
  {
    id: "evening-hearth",
    name: "Evening Brasserie & Hearth",
    category: "Wood-Fired Dining & Cellar",
    schedule: "Tue – Sun: 5:00 PM – 10:00 PM",
    hoursDetail: "Oak-fired heritage meats, whole roasted turbot, and seasonal tasting narratives",
    icon: Wine,
    description: "Closed Monday evenings for deep kitchen maintenance & farm dispatch.",
    isActiveNow: (day, hour, min) => {
      const time = hour + min / 60;
      const isMonday = day === 1;
      if (isMonday) return false;
      return time >= 17.0 && time < 22.0;
    },
  },
  {
    id: "late-night-wine",
    name: "Late-Night Natural Wine Bar",
    category: "Cave à Manger & Aperitifs",
    schedule: "Thu – Sat: 10:00 PM – Midnight",
    hoursDetail: "Low-intervention grower pours, artisanal raw milk cheeses & charcuterie cuts",
    icon: Moon,
    description: "Atmospheric evening soundtrack, standing bar & intimate mezzanine high-tops.",
    isActiveNow: (day, hour, min) => {
      const time = hour + min / 60;
      const isLateNightDay = day === 4 || day === 5 || day === 6; // Thu, Fri, Sat
      return isLateNightDay && time >= 22.0 && time < 24.0;
    },
  },
];

// Department Inquiries
const DEPARTMENT_INQUIRIES = [
  {
    id: "reservations",
    department: "Table Reservations & Dining Concierge",
    contactPerson: "Margot Laurent",
    role: "Maitre d' & Guest Experience Lead",
    email: "reservations@maisonandco.com",
    phone: "+1 (212) 555-0192",
    purpose: "Same-day tables, dietary accommodations, dining room seat preferences & bespoke table requests.",
    badge: "Immediate Response",
    icon: Calendar,
  },
  {
    id: "events",
    department: "Private Dining & Large Gatherings",
    contactPerson: "Alexandre Vance",
    role: "Director of Private Events",
    email: "events@maisonandco.com",
    phone: "+1 (212) 555-0193",
    purpose: "Full restaurant buyouts, Garden Orangery banquets, corporate hearth feasts & custom sommelier packages.",
    badge: "Bespoke Menus",
    icon: Users,
  },
  {
    id: "press",
    department: "Press, Media & Brand Partnerships",
    contactPerson: "Camille Desrosiers",
    role: "Communications & Editorial Director",
    email: "press@maisonandco.com",
    phone: "+1 (212) 555-0194",
    purpose: "Editorial features, high-resolution visual assets, brand collaborations & chef interview requests.",
    badge: "Media Inquiries",
    icon: Megaphone,
  },
  {
    id: "careers",
    department: "Careers & Culinary Apprenticeships",
    contactPerson: "Chef Julien Moreau",
    role: "Culinary Operations & Talent",
    email: "talent@maisonandco.com",
    phone: "+1 (212) 555-0195",
    purpose: "Hearth line cooks, artisan viennoiserie bakers, pastry stagiaires & certified floor sommeliers.",
    badge: "We're Hiring",
    icon: Briefcase,
  },
];

// Guest Guidelines
const GUEST_GUIDELINES = [
  {
    id: "dress-code",
    title: "Smart Casual Dress Code",
    icon: Shirt,
    shortNote: "Refined neighborhood elegance",
    detail: "We celebrate relaxed sophistication. Tailored denim, collared shirts, and stylish casual attire are warmly welcomed. We kindly discourage beachwear, gym athletic wear, and baseball caps in the main dining room during evening service.",
  },
  {
    id: "grace-period",
    title: "Reservation Grace Period",
    icon: TimerReset,
    shortNote: "15-minute table hold",
    detail: "To ensure flow for all guests, reserved tables are held for 15 minutes past scheduled booking time before being released to our walk-in waitlist. If you are delayed in transit, please call our dining concierge to preserve your seating.",
  },
  {
    id: "corkage",
    title: "Cellar Corkage Policy",
    icon: Wine,
    shortNote: "$45 per 750ml bottle (max 3)",
    detail: "Guests are welcome to bring rare or commemorative vintages from their personal cellars not currently featured on our wine list. A corkage fee of $45 per 750ml bottle applies, with a maximum of three bottles per party.",
  },
  {
    id: "families-pets",
    title: "Children & Dog-Friendly Patio",
    icon: Dog,
    shortNote: "Terrace welcome & highchairs",
    detail: "Well-behaved four-legged companions are warmly welcomed on our heated garden terrace. For young gourmands, handcrafted wooden highchairs and booster seats are readily available upon request.",
  },
];

export default function ContactPage() {
  const { openBookingModal } = useStore();

  // Client-side time tracking
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 30000); // update every 30s
    return () => clearInterval(timer);
  }, []);

  // Compute active status
  const currentStatus = useMemo(() => {
    if (!currentDate) return { isOpen: true, activeService: "Morning Bakery & Specialty Coffee", nextOpenText: "Open Today" };

    const day = currentDate.getDay(); // 0 = Sun, 1 = Mon, ...
    const hour = currentDate.getHours();
    const minute = currentDate.getMinutes();

    const activePeriod = SERVICE_PERIODS.find((p) => p.isActiveNow(day, hour, minute));

    if (activePeriod) {
      return {
        isOpen: true,
        activeService: activePeriod.name,
        category: activePeriod.category,
        nextOpenText: "Currently Open for Service",
      };
    }

    // Determine when it opens next
    const isMonday = day === 1;
    let nextText = "Reopening at 7:00 AM Tomorrow";
    if (hour < 7) {
      nextText = "Opening at 7:00 AM for Morning Bakery";
    } else if (hour >= 15 && hour < 17) {
      if (isMonday) {
        nextText = "Reopening Tuesday at 7:00 AM (Monday evening closed)";
      } else {
        nextText = "Reopening at 5:00 PM for Evening Hearth";
      }
    } else if (hour >= 22) {
      nextText = "Reopening Tomorrow at 7:00 AM for Bakery";
    }

    return {
      isOpen: false,
      activeService: null,
      category: null,
      nextOpenText: nextText,
    };
  }, [currentDate]);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const appleMapsUrl = "https://maps.apple.com/?q=482+Saint-Germain+Avenue+Suite+100";
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=482+Saint-Germain+Avenue+Suite+100";

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAFAF8] text-[#121316]">
      {/* 1. HERO HEADER */}
      <section className="relative w-full pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 bg-[#121316] text-[#FAFAF8] overflow-hidden">
        {/* Ambient Gradient Glow */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(180,70,27,0.18),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(30,107,82,0.15),transparent_60%)] pointer-events-none"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C58F4C] text-xs font-mono font-medium border border-white/15 backdrop-blur-sm"
            >
              <Compass className="w-3.5 h-3.5 text-[#C58F4C]" />
              <span>Historic Saint-Germain Corridor • 482 Saint-Germain Ave</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-white leading-[1.1]"
            >
              Visit Maison &amp; Co.<span className="text-[#B4461B]"> —</span> In the Heart of Saint-Germain<span className="text-[#B4461B]">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-white/80 leading-relaxed font-sans font-normal max-w-2xl"
            >
              Housed within a restored 19th-century limestone apothecary, Maison &amp; Co. blends an artisan morning bakery, lively all-day brasserie, and intimate hearth cellar beneath antique glass skylights.
            </motion.p>

            {/* Live Operational Quick Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-3 flex flex-wrap items-center gap-3"
            >
              <div
                className={cn(
                  "inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-medium border backdrop-blur-md transition-all",
                  currentStatus.isOpen
                    ? "bg-[#1E6B52]/20 border-[#1E6B52]/40 text-[#A3E5C9]"
                    : "bg-[#B4461B]/20 border-[#B4461B]/40 text-[#F5C2B0]"
                )}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      currentStatus.isOpen ? "bg-[#1E6B52]" : "bg-[#B4461B]"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-2.5 w-2.5",
                      currentStatus.isOpen ? "bg-[#28A745]" : "bg-[#D9534F]"
                    )}
                  />
                </span>
                <span className="font-semibold">
                  {currentStatus.isOpen ? "Open Now" : "Currently Closed"}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-white/90 text-xs sm:text-sm">
                  {currentStatus.isOpen
                    ? `Serving ${currentStatus.activeService}`
                    : currentStatus.nextOpenText}
                </span>
              </div>

              <button
                onClick={openBookingModal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B4461B] hover:bg-[#9B3C17] text-white text-sm font-semibold transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: LOCATION & ARRIVAL MATRIX */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-[#E8E8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left: Location Details & Arrival Cards (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F3EE] text-[#1E6B52] text-xs font-mono font-medium border border-[#C2E2D3] mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Saint-Germain Historic Quarter</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#121316] tracking-tight">
                  Arrival &amp; Transportation
                </h2>
                <p className="mt-2 text-base text-[#525866] leading-relaxed">
                  Located on the tree-lined Saint-Germain corridor between 4th and 5th Avenues, our cobblestone courtyard offers effortless accessibility whether arriving by valet, private car, or transit.
                </p>
              </div>

              {/* Physical Address Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E8E2] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF6F0] border border-[#E8DFC9] flex items-center justify-center shrink-0 text-[#B4461B]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase font-mono tracking-wider font-semibold text-[#848C9E]">
                      Physical Address
                    </span>
                    <h3 className="text-lg font-bold text-[#121316] font-display">
                      482 Saint-Germain Avenue, Suite 100
                    </h3>
                    <p className="text-sm text-[#525866]">
                      Saint-Germain Cultural District • Main Courtyard Entrance
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:self-center shrink-0">
                  <a
                    href={appleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF6F0] hover:bg-[#F2ECE1] text-[#121316] text-xs font-semibold border border-[#E8DFC9] transition-colors"
                  >
                    <span>Apple Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#848C9E]" />
                  </a>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FAF6F0] hover:bg-[#F2ECE1] text-[#121316] text-xs font-semibold border border-[#E8DFC9] transition-colors"
                  >
                    <span>Google Maps</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#848C9E]" />
                  </a>
                </div>
              </div>

              {/* Arrival Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Valet & Parking Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E8E2] shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F3EE] text-[#1E6B52] flex items-center justify-center shrink-0">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#121316] font-display text-base">
                        Valet &amp; Self-Parking
                      </h4>
                      <span className="text-xs text-[#1E6B52] font-semibold">
                        Complimentary 3-Hour Valet
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-[#525866] leading-relaxed">
                    Complimentary 3-hour valet parking is offered for dinner guests starting at 5:00 PM at the main porte-cochère.
                  </p>
                  <div className="pt-2 border-t border-[#F0F0EB] text-xs text-[#848C9E]">
                    <span className="font-semibold text-[#525866]">Self-Parking Garage:</span> 500 Saint-Germain (across the avenue, 24/7 covered access with EV charging).
                  </div>
                </div>

                {/* Subway & Transit Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#E8E8E2] shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF6F0] text-[#B4461B] flex items-center justify-center shrink-0">
                      <Train className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#121316] font-display text-base">
                        Transit &amp; Subway
                      </h4>
                      <span className="text-xs text-[#B4461B] font-semibold">
                        2 to 5 Min Walk
                      </span>
                    </div>
                  </div>
                  <ul className="text-xs text-[#525866] space-y-2 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#EE352E] text-white font-bold font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        1
                      </span>
                      <div>
                        <strong className="text-[#121316]">Christopher St:</strong> 2 min walk east along Saint-Germain Ave.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex items-center gap-0.5 shrink-0 mt-0.5">
                        <span className="w-4 h-4 rounded-full bg-[#0039A6] text-white font-bold font-mono text-[9px] flex items-center justify-center">A</span>
                        <span className="w-4 h-4 rounded-full bg-[#FF6319] text-white font-bold font-mono text-[9px] flex items-center justify-center">F</span>
                      </div>
                      <div>
                        <strong className="text-[#121316]">West 4th St (A/C/E/B/D/F/M):</strong> 5 min walk through the park.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Architectural Vector Map Graphic (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-[#E8E8E2] bg-[#1E2024] p-6 text-white shadow-lg">
                {/* Stylized Street Grid Background */}
                <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#16181B] border border-white/10 overflow-hidden flex items-center justify-center">
                  <svg
                    className="absolute inset-0 w-full h-full opacity-40"
                    viewBox="0 0 400 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Street Grids */}
                    <path d="M0 80 H400 M0 160 H400 M0 240 H400" stroke="#4A505D" strokeWidth="6" />
                    <path d="M80 0 V300 M200 0 V300 M320 0 V300" stroke="#4A505D" strokeWidth="6" />

                    {/* Diagonal Boulevard */}
                    <path d="M0 260 L400 40" stroke="#C58F4C" strokeWidth="8" strokeOpacity="0.6" strokeDasharray="4 4" />

                    {/* Surrounding Landmarks & Green Space */}
                    <rect x="220" y="30" width="80" height="40" rx="4" fill="#1E6B52" fillOpacity="0.4" />
                    <text x="230" y="55" fill="#A3E5C9" fontSize="9" fontFamily="sans-serif">Square Park</text>

                    {/* Subway Pins */}
                    <circle cx="90" cy="160" r="8" fill="#EE352E" />
                    <text x="105" y="164" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif">1 Train</text>

                    <circle cx="310" cy="235" r="8" fill="#0039A6" />
                    <text x="325" y="239" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif">W 4th St</text>

                    {/* Parking Garage */}
                    <rect x="230" y="180" width="16" height="16" rx="3" fill="#3B82F6" />
                    <text x="250" y="192" fill="#93C5FD" fontSize="9" fontFamily="sans-serif">500 Garage</text>
                  </svg>

                  {/* Pulsing Central Maison Pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2.4 }}
                      className="w-12 h-12 rounded-full bg-[#B4461B]/30 flex items-center justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#B4461B] text-white flex items-center justify-center shadow-lg border-2 border-white">
                        <Utensils className="w-4 h-4" />
                      </div>
                    </motion.div>
                    <div className="mt-2 px-3 py-1 rounded-full bg-[#121316]/90 border border-[#C58F4C]/40 text-center backdrop-blur-md shadow-lg">
                      <span className="text-[11px] font-bold font-display tracking-wide text-white block">
                        MAISON &amp; CO.
                      </span>
                      <span className="text-[9px] font-mono text-[#C58F4C] block">
                        482 Saint-Germain Ave
                      </span>
                    </div>
                  </div>
                </div>

                {/* Map Quick Links Bar */}
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#28A745]" />
                    <span className="text-xs text-white/80 font-medium">
                      GPS: 40.7336° N, 74.0027° W
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={appleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial text-center px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all flex items-center justify-center gap-1"
                    >
                      <span>Apple Maps</span>
                      <ExternalLink className="w-3 h-3 text-white/60" />
                    </a>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-initial text-center px-3 py-2 rounded-xl bg-[#B4461B] hover:bg-[#9B3C17] text-white text-xs font-semibold transition-all flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 2: OPERATING HOURS MATRIX WITH LIVE STATUS */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E8E8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#B4461B] text-xs font-mono font-medium border border-[#E8DFC9]">
              <Clock className="w-3.5 h-3.5" />
              <span>Complete Service Schedule</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#121316] tracking-tight">
              Operating Hours &amp; Services
            </h2>
            <p className="text-base text-[#525866] leading-relaxed">
              Maison &amp; Co. operates in continuous rhythm from the morning bakery bake to late-night natural wine cellar service. Check our real-time status below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICE_PERIODS.map((period) => {
              const Icon = period.icon;
              const isCurrentlyActive = currentDate
                ? period.isActiveNow(
                    currentDate.getDay(),
                    currentDate.getHours(),
                    currentDate.getMinutes()
                  )
                : false;

              return (
                <div
                  key={period.id}
                  className={cn(
                    "p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between",
                    isCurrentlyActive
                      ? "bg-[#FAF6F0] border-[#B4461B]/30 shadow-md ring-1 ring-[#B4461B]/20"
                      : "bg-[#FAFAF8] border-[#E8E8E2] hover:border-[#D0D0C8]"
                  )}
                >
                  {isCurrentlyActive && (
                    <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-16 h-16 bg-[#B4461B]/10 rounded-full blur-xl pointer-events-none" />
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border",
                            isCurrentlyActive
                              ? "bg-[#B4461B] text-white border-[#B4461B]"
                              : "bg-white text-[#525866] border-[#E8E8E2]"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#848C9E]">
                            {period.category}
                          </span>
                          <h3 className="text-lg font-bold font-display text-[#121316]">
                            {period.name}
                          </h3>
                        </div>
                      </div>

                      {/* Live Badge */}
                      {isCurrentlyActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1E6B52]/10 text-[#1E6B52] border border-[#1E6B52]/20 text-xs font-semibold font-mono shrink-0">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1E6B52] animate-pulse" />
                          Open Now
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/[0.04] text-[#848C9E] border border-[#E8E8E2] text-xs font-mono shrink-0">
                          Closed
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-[#E8E8E2] space-y-1">
                      <div className="text-sm font-bold font-mono text-[#121316]">
                        {period.schedule}
                      </div>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        {period.hoursDetail}
                      </p>
                    </div>

                    <p className="text-xs text-[#525866] leading-relaxed">
                      {period.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8E8E2]/60 flex items-center justify-between text-xs text-[#848C9E]">
                    <span>Walk-ins welcome based on room capacity</span>
                    {isCurrentlyActive && (
                      <span className="font-semibold text-[#B4461B]">Active Service</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION 3: DIRECT DEPARTMENT INQUIRIES */}
      <section className="py-16 sm:py-20 lg:py-24 border-b border-[#E8E8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F3EE] text-[#1E6B52] text-xs font-mono font-medium border border-[#C2E2D3]">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Direct Concierge Access</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#121316] tracking-tight">
              Department Inquiries &amp; Contacts
            </h2>
            <p className="text-base text-[#525866] leading-relaxed">
              Connect directly with our culinary leaders and hospitality directors. We respond to dining concierge inquiries within 2 hours during operational days.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEPARTMENT_INQUIRIES.map((dept) => {
              const Icon = dept.icon;
              const isEmailCopied = copiedKey === `email-${dept.id}`;
              const isPhoneCopied = copiedKey === `phone-${dept.id}`;

              return (
                <div
                  key={dept.id}
                  className="p-6 rounded-2xl bg-white border border-[#E8E8E2] shadow-sm hover:border-[#D0D0C8] transition-all flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-[#FAF6F0] text-[#B4461B] border border-[#E8DFC9] flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-[#B4461B]">
                            {dept.badge}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold font-display text-[#121316]">
                            {dept.department}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E8E2] space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#121316] font-display text-sm">
                          {dept.contactPerson}
                        </span>
                        <span className="text-[#848C9E] font-medium">{dept.role}</span>
                      </div>
                      <p className="text-xs text-[#525866] leading-relaxed pt-1">
                        {dept.purpose}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#F0F0EB]">
                    {/* Email Action */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-[#FAFAF8] transition-colors">
                      <a
                        href={`mailto:${dept.email}`}
                        className="flex items-center gap-2 text-xs font-mono text-[#121316] hover:text-[#B4461B] transition-colors truncate"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#848C9E] shrink-0" />
                        <span className="truncate">{dept.email}</span>
                      </a>
                      <button
                        onClick={() => handleCopy(dept.email, `email-${dept.id}`)}
                        className="p-1.5 rounded-md hover:bg-black/[0.05] text-[#848C9E] hover:text-[#121316] transition-colors shrink-0"
                        title="Copy Email"
                        aria-label={`Copy email for ${dept.department}`}
                      >
                        {isEmailCopied ? (
                          <Check className="w-3.5 h-3.5 text-[#1E6B52]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Phone Action */}
                    <div className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-[#FAFAF8] transition-colors">
                      <a
                        href={`tel:${dept.phone.replace(/[^0-9+]/g, "")}`}
                        className="flex items-center gap-2 text-xs font-mono text-[#121316] hover:text-[#B4461B] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#848C9E] shrink-0" />
                        <span>{dept.phone}</span>
                      </a>
                      <button
                        onClick={() => handleCopy(dept.phone, `phone-${dept.id}`)}
                        className="p-1.5 rounded-md hover:bg-black/[0.05] text-[#848C9E] hover:text-[#121316] transition-colors shrink-0"
                        title="Copy Phone Number"
                        aria-label={`Copy phone number for ${dept.department}`}
                      >
                        {isPhoneCopied ? (
                          <Check className="w-3.5 h-3.5 text-[#1E6B52]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SECTION 4: GUEST GUIDELINES & DINING ETIQUETTE */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E8E8E2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#B4461B] text-xs font-mono font-medium border border-[#E8DFC9]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Hospitality Standards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-[#121316] tracking-tight">
              Guest Guidelines &amp; Dining Etiquette
            </h2>
            <p className="text-base text-[#525866] leading-relaxed">
              We strive to cultivate a convivial, respectful sanctuary for all diners. Please review our house guidelines prior to your arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {GUEST_GUIDELINES.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E8E2] hover:border-[#C58F4C]/40 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E8E2] text-[#B4461B] flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-display text-[#121316]">
                        {item.title}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-[#1E6B52]">
                        {item.shortNote}
                      </span>
                    </div>
                    <p className="text-xs text-[#525866] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SECTION 5: DIRECT QUICK RESERVATION ACTION (CTA BANNER) */}
      <section className="py-16 sm:py-20 bg-[#121316] text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,70,27,0.22),transparent_70%)] pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C58F4C] text-xs font-mono font-medium border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Allocations Open 30 Days in Advance</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white max-w-2xl mx-auto leading-tight">
            Ready to Experience Maison &amp; Co.?
          </h2>

          <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto leading-relaxed">
            Reserve your table for an artisan breakfast, courtyard lunch, or wood-fired hearth dinner with paired grower wines.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={openBookingModal}
              size="lg"
              className="w-full sm:w-auto bg-[#B4461B] hover:bg-[#9B3C17] text-white font-semibold text-base px-8 py-3.5 rounded-xl shadow-lg"
              leftIcon={<Calendar className="w-5 h-5 mr-1" />}
            >
              Book a Table Now
            </Button>
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-all"
            >
              <span>Explore Menus &amp; Cellar</span>
              <ChevronRight className="w-4 h-4 ml-1 text-white/70" />
            </Link>
          </div>

          <p className="text-xs text-white/50 pt-4">
            For private event buyouts exceeding 12 guests, please contact{" "}
            <a href="mailto:events@maisonandco.com" className="text-[#C58F4C] underline hover:text-white transition-colors">
              events@maisonandco.com
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
