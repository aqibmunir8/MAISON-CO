"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  UtensilsCrossed,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  CalendarPlus,
  Sparkles,
  MapPin,
  Mail,
  Phone,
  User,
  Heart,
  AlertCircle,
  X,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useStore } from "@/context/StoreContext";
import { SeatingZone, MealPeriod } from "@/types";

interface SeatingZoneOption {
  id: SeatingZone;
  name: string;
  description: string;
  tag?: string;
}

const SEATING_ZONES: SeatingZoneOption[] = [
  {
    id: "main-dining",
    name: "Main Dining Room",
    description: "Warm brass fixtures, walnut banquettes, and lively brasserie atmosphere.",
  },
  {
    id: "garden-patio",
    name: "Garden Patio",
    description: "Sunlit greenery & olive trees in our all-weather heated glass atrium.",
    tag: "Popular",
  },
  {
    id: "chefs-counter",
    name: "Chef's Counter",
    description: "Front-row hearthside seats with direct views of wood-fired open fires.",
    tag: "Signature",
  },
];

const MEAL_PERIODS: { id: MealPeriod; label: string; slots: string[] }[] = [
  {
    id: "breakfast",
    label: "Morning & Bakery",
    slots: ["7:30 AM", "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:15 AM"],
  },
  {
    id: "brunch",
    label: "All-Day Brunch",
    slots: ["11:00 AM", "11:30 AM", "12:00 PM", "12:45 PM", "1:30 PM", "2:15 PM", "3:00 PM"],
  },
  {
    id: "dinner",
    label: "Evening Hearth & Cellar",
    slots: ["5:30 PM", "6:00 PM", "6:45 PM", "7:30 PM", "8:15 PM", "8:45 PM", "9:30 PM"],
  },
];

const OCCASIONS = [
  "Casual Dining",
  "Birthday Celebration",
  "Anniversary",
  "Romantic Date",
  "Business Meal",
  "Family Gathering",
];

const DIETARY_OPTIONS = [
  { id: "GF", label: "Gluten-Free" },
  { id: "VG", label: "Vegan" },
  { id: "V", label: "Vegetarian" },
  { id: "DF", label: "Dairy-Free" },
  { id: "NF", label: "Nut-Free" },
  { id: "PESC", label: "Pescatarian" },
];

export function BookingModal() {
  const { isBookingOpen, closeBookingModal } = useStore();

  // Step state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Step 1: Reservation Details
  const [partySize, setPartySize] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedPeriod, setSelectedPeriod] = useState<MealPeriod>("brunch");
  const [selectedTime, setSelectedTime] = useState<string>("12:00 PM");
  const [seatingZone, setSeatingZone] = useState<SeatingZone>("main-dining");

  // Step 2: Guest Details
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occasion, setOccasion] = useState("Casual Dining");
  const [dietary, setDietary] = useState<string[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Step 3: Confirmation
  const [confirmationCode, setConfirmationCode] = useState("");

  // Generate 30 available dates starting today
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split("T")[0];
      const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.toLocaleDateString("en-US", { day: "numeric" });
      const month = d.toLocaleDateString("en-US", { month: "short" });
      const isToday = i === 0;
      dates.push({
        iso,
        weekday,
        dayNum,
        month,
        isToday,
        fullFormatted: d.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
      });
    }
    return dates;
  }, []);

  const activePeriodObj = MEAL_PERIODS.find((p) => p.id === selectedPeriod) || MEAL_PERIODS[1];

  const toggleDietary = (item: string) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleNextStep1 = () => {
    if (!selectedTime) {
      return;
    }
    setStep(2);
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = "Please provide your full name.";
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 7) {
      errs.phone = "Please enter a valid contact phone number.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      setConfirmationCode(`MC-${randomNum}`);
      setIsSubmitting(false);
      setStep(3);
    }, 600);
  };

  const handleResetAndClose = () => {
    closeBookingModal();
    setTimeout(() => {
      setStep(1);
      setPartySize(2);
      setSelectedPeriod("brunch");
      setSelectedTime("12:00 PM");
      setSeatingZone("main-dining");
      setFullName("");
      setEmail("");
      setPhone("");
      setOccasion("Casual Dining");
      setDietary([]);
      setSpecialRequests("");
      setErrors({});
      setConfirmationCode("");
    }, 300);
  };

  const selectedDateFormatted = useMemo(() => {
    const found = availableDates.find((d) => d.iso === selectedDate);
    return found ? found.fullFormatted : selectedDate;
  }, [availableDates, selectedDate]);

  const zoneName = SEATING_ZONES.find((z) => z.id === seatingZone)?.name || "Main Dining Room";

  const handleAddToCalendar = () => {
    const title = encodeURIComponent("Table Reservation at Maison & Co.");
    const details = encodeURIComponent(
      `Maison & Co. Table Reservation\nConfirmation: ${confirmationCode}\nGuests: ${partySize} People\nSeating: ${zoneName}\nLocation: 428 Boulevard Saint-Germain, Paris / New York\nNotes: ${specialRequests || "None"}`
    );
    const location = encodeURIComponent("Maison & Co., 428 Boulevard Saint-Germain");

    // Format start time
    const [timeStr, ampm] = selectedTime.split(" ");
    const [hoursStr, minsStr] = timeStr.split(":");
    let hours = parseInt(hoursStr, 10);
    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const startDate = new Date(selectedDate);
    startDate.setHours(hours, parseInt(minsStr || "0", 10), 0, 0);
    const endDate = new Date(startDate.getTime() + 90 * 60 * 1000); // 1.5 hr duration

    const startISO = startDate.toISOString().replace(/-|:|\.\d\d\d/g, "");
    const endISO = endDate.toISOString().replace(/-|:|\.\d\d\d/g, "");

    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startISO}/${endISO}&details=${details}&location=${location}`;
    window.open(googleUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Modal
      isOpen={isBookingOpen}
      onClose={handleResetAndClose}
      size="lg"
      showCloseButton={false}
      className="p-0 sm:p-0 max-h-[88vh] sm:max-h-[90vh] flex flex-col overflow-hidden bg-[#FAFAF8]"
    >
      {/* Modal Top Header with Stepper */}
      <div className="bg-white px-4 sm:px-8 py-4 sm:py-5 border-b border-[#E8E8E2] shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#B4461B]" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-[#848C9E]">
                Maison &amp; Co. Table Booking
              </span>
            </div>
            <h2 className="font-display text-lg sm:text-2xl font-bold text-[#121316] mt-0.5 tracking-tight">
              {step === 1 && "Select Your Table & Time"}
              {step === 2 && "Guest Information & Notes"}
              {step === 3 && "Reservation Confirmed"}
            </h2>
          </div>

          {/* Stepper indicator pills & Close Button */}
          <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    step === s
                      ? "w-5 sm:w-6 bg-[#B4461B]"
                      : step > s
                      ? "w-2 bg-[#1E6B52]"
                      : "w-2 bg-[#E8E8E2]"
                  }`}
                  aria-label={`Step ${s}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              aria-label="Close modal"
              className="p-1.5 -mr-1 text-[#848C9E] hover:text-[#121316] rounded-lg hover:bg-[#F4F4F0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4461B]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Body with animated step transitions */}
      <div className="p-4 sm:p-8 overflow-y-auto flex-1 overscroll-contain">
        <AnimatePresence mode="wait">
          {/* STEP 1: TIME, DATE, PARTY, SEATING */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Party Size Selector */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#525866] mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#B4461B]" />
                    Party Size
                  </span>
                  <span className="text-xs text-[#848C9E] font-normal lowercase">
                    {partySize} {partySize === 1 ? "guest" : "guests"}
                  </span>
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
                    const isSelected = partySize === num;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPartySize(num)}
                        className={`py-2 px-1 text-center rounded-lg border text-sm font-semibold transition-all ${
                          isSelected
                            ? "bg-[#B4461B] text-white border-[#B4461B] shadow-sm scale-[1.02]"
                            : "bg-white text-[#525866] border-[#E8E8E2] hover:border-[#B4461B]/40 hover:bg-[#F4F4F0]"
                        }`}
                      >
                        {num === 8 ? "8+" : num}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date Horizontal Picker */}
              <div>
                <label className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#525866] mb-2.5">
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#B4461B]" />
                    Select Date
                  </span>
                  <span className="text-xs text-[#848C9E] font-normal">
                    {selectedDateFormatted}
                  </span>
                </label>
                <div className="flex gap-2 overflow-x-auto pb-2 pt-0.5 scrollbar-none snap-x">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.iso;
                    return (
                      <button
                        key={item.iso}
                        type="button"
                        onClick={() => setSelectedDate(item.iso)}
                        className={`snap-start shrink-0 w-[68px] py-2.5 px-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                          isSelected
                            ? "bg-[#121316] text-white border-[#121316] shadow-sm ring-2 ring-[#121316]/20"
                            : "bg-white text-[#525866] border-[#E8E8E2] hover:border-[#B4461B]/40 hover:bg-[#F4F4F0]"
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">
                          {item.isToday ? "Today" : item.weekday}
                        </span>
                        <span className="text-lg font-bold font-display leading-tight my-0.5">
                          {item.dayNum}
                        </span>
                        <span className="text-[10px] uppercase font-medium opacity-80">
                          {item.month}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Meal Period & Time Slots */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#525866] mb-2.5">
                  <Clock className="w-3.5 h-3.5 text-[#B4461B]" />
                  Dining Period &amp; Time
                </label>

                {/* Period switcher */}
                <div className="flex rounded-lg bg-[#E8E8E2]/60 p-1 mb-3">
                  {MEAL_PERIODS.map((period) => {
                    const isActive = selectedPeriod === period.id;
                    return (
                      <button
                        key={period.id}
                        type="button"
                        onClick={() => {
                          setSelectedPeriod(period.id);
                          setSelectedTime(period.slots[0]);
                        }}
                        className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${
                          isActive
                            ? "bg-white text-[#121316] shadow-xs font-semibold"
                            : "text-[#525866] hover:text-[#121316]"
                        }`}
                      >
                        {period.label}
                      </button>
                    );
                  })}
                </div>

                {/* Time slot pills */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {activePeriodObj.slots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                          isSelected
                            ? "bg-[#B4461B] text-white border-[#B4461B] shadow-xs"
                            : "bg-white text-[#121316] border-[#E8E8E2] hover:border-[#B4461B]/40 hover:bg-[#F4F4F0]"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Seating Zone Preference */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#525866] mb-2.5">
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#B4461B]" />
                  Seating Zone Experience
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SEATING_ZONES.map((zone) => {
                    const isSelected = seatingZone === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => setSeatingZone(zone.id)}
                        className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? "bg-white border-[#B4461B] ring-2 ring-[#B4461B]/15 shadow-sm"
                            : "bg-white border-[#E8E8E2] hover:border-[#B4461B]/30 hover:bg-[#F4F4F0]"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-xs text-[#121316]">
                              {zone.name}
                            </span>
                            {zone.tag && (
                              <Badge variant="gold" size="sm">
                                {zone.tag}
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-[#525866] leading-relaxed">
                            {zone.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 1 Footer Action */}
              <div className="pt-3 border-t border-[#E8E8E2] flex items-center justify-between">
                <div className="text-xs text-[#848C9E]">
                  Table held for 15 minutes · Free cancellation
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNextStep1}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Continue to Details
                </Button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: GUEST DETAILS & NOTES */}
          {step === 2 && (
            <motion.form
              key="step2"
              onSubmit={handleConfirmReservation}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Summary recap chip */}
              <div className="bg-[#F7F4EE] border border-[#CBB590]/40 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#121316]">
                    {partySize} {partySize === 1 ? "Guest" : "Guests"}
                  </span>
                  <span className="text-[#CBB590]">·</span>
                  <span className="text-[#525866]">{selectedDateFormatted}</span>
                  <span className="text-[#CBB590]">·</span>
                  <span className="font-semibold text-[#B4461B]">{selectedTime}</span>
                </div>
                <span className="text-xs font-medium text-[#848C9E]">{zoneName}</span>
              </div>

              {/* Guest Contact Info */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#525866] mb-1.5"
                  >
                    Primary Guest Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#848C9E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                      }}
                      placeholder="e.g. Camille Laurent"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-lg border text-sm text-[#121316] bg-white focus:outline-none focus:ring-2 transition-all ${
                        errors.fullName
                          ? "border-red-400 focus:ring-red-400/20"
                          : "border-[#E8E8E2] focus:border-[#B4461B] focus:ring-[#B4461B]/15"
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#525866] mb-1.5"
                    >
                      Email Confirmation *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#848C9E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        placeholder="camille@example.com"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-lg border text-sm text-[#121316] bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? "border-red-400 focus:ring-red-400/20"
                            : "border-[#E8E8E2] focus:border-[#B4461B] focus:ring-[#B4461B]/15"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#525866] mb-1.5"
                    >
                      Mobile Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#848C9E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                        placeholder="+1 (555) 382-9102"
                        className={`w-full pl-10 pr-3.5 py-2.5 rounded-lg border text-sm text-[#121316] bg-white focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? "border-red-400 focus:ring-red-400/20"
                            : "border-[#E8E8E2] focus:border-[#B4461B] focus:ring-[#B4461B]/15"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Dining Occasion */}
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#525866] mb-2">
                  <Heart className="w-3.5 h-3.5 text-[#B4461B]" />
                  Dining Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((occ) => {
                    const isSelected = occasion === occ;
                    return (
                      <button
                        key={occ}
                        type="button"
                        onClick={() => setOccasion(occ)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-[#121316] text-white border-[#121316]"
                            : "bg-white text-[#525866] border-[#E8E8E2] hover:bg-[#F4F4F0]"
                        }`}
                      >
                        {occ}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#525866] mb-2">
                  Dietary Restrictions (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_OPTIONS.map((item) => {
                    const isSelected = dietary.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleDietary(item.id)}
                        className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-[#E8F3EE] text-[#1E6B52] border-[#1E6B52] font-semibold"
                            : "bg-white text-[#525866] border-[#E8E8E2] hover:bg-[#F4F4F0]"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label
                  htmlFor="specialRequests"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#525866] mb-1.5"
                >
                  Special Requests or Seating Notes
                </label>
                <textarea
                  id="specialRequests"
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="High chair needed, booth preference, allergy notes, quiet corner..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E8E8E2] text-sm text-[#121316] bg-white focus:outline-none focus:border-[#B4461B] focus:ring-2 focus:ring-[#B4461B]/15 transition-all resize-none"
                />
              </div>

              {/* Step 2 Actions */}
              <div className="pt-3 border-t border-[#E8E8E2] flex items-center justify-between gap-3">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setStep(1)}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                >
                  Confirm Table Reservation
                </Button>
              </div>
            </motion.form>
          )}

          {/* STEP 3: RESERVATION CONFIRMATION */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#E8F3EE] text-[#1E6B52] mb-1 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7EAE3] text-[#B4461B] font-mono text-xs font-bold tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  CONFIRMATION #{confirmationCode}
                </span>
                <h3 className="font-display text-2xl font-bold text-[#121316]">
                  We Look Forward to Welcoming You!
                </h3>
                <p className="text-xs sm:text-sm text-[#525866] mt-1 max-w-md mx-auto">
                  A reservation confirmation and calendar invite have been sent to{" "}
                  <strong className="text-[#121316] font-medium">{email}</strong>.
                </p>
              </div>

              {/* Summary Receipt Card */}
              <div className="bg-white rounded-2xl border border-[#E8E8E2] p-5 sm:p-6 text-left shadow-xs space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-[#E8E8E2]/80">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#848C9E] block mb-1">
                      Date
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#121316]">
                      {selectedDateFormatted}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#848C9E] block mb-1">
                      Time Slot
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#B4461B]">
                      {selectedTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#848C9E] block mb-1">
                      Party
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#121316]">
                      {partySize} Guests
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#848C9E] block mb-1">
                      Seating Zone
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#121316]">
                      {zoneName}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#525866]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#848C9E]">Primary Guest:</span>
                    <span className="font-medium text-[#121316]">{fullName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#848C9E]">Contact:</span>
                    <span className="font-medium text-[#121316]">
                      {phone} · {email}
                    </span>
                  </div>
                  {occasion && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#848C9E]">Occasion:</span>
                      <span className="font-medium text-[#121316]">{occasion}</span>
                    </div>
                  )}
                  {dietary.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#848C9E]">Dietary Notes:</span>
                      <span className="font-medium text-[#121316]">{dietary.join(", ")}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#E8E8E2]/80 flex items-center gap-2 text-xs text-[#848C9E]">
                  <MapPin className="w-4 h-4 text-[#B4461B] shrink-0" />
                  <span>Maison &amp; Co. · 428 Boulevard Saint-Germain</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handleAddToCalendar}
                  leftIcon={<CalendarPlus className="w-4 h-4 text-[#B4461B]" />}
                  className="w-full sm:w-auto"
                >
                  Add to Calendar
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto px-8"
                >
                  Done
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
