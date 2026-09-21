import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Compass, MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface TripAtAGlanceProps {
  onDayClick: (dayNum: number) => void;
}

export const TripAtAGlance: React.FC<TripAtAGlanceProps> = ({ onDayClick }) => {
  const dayHighlights = [
    {
      day: 1,
      date: 'OCT 1',
      title: 'BANGALORE',
      sub: 'Night Journey Departure',
      desc: 'Assemble at Guru Krupa Nilaya · Boarding & departure at 8:00 PM for overnight highway transit',
      accentColor: 'border-amber-400',
      badgeColor: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    {
      day: 2,
      date: 'OCT 2',
      title: 'MADURAI → KANYAKUMARI',
      sub: 'Temples · Heritage · Road South',
      desc: 'Le Grace Residency refresh · Meenakshi Amman Temple darshan · Thirumalai Nayakkar Palace · Raaha Restaurant & Grill lunch · Highway south to Sunshine Villas',
      accentColor: 'border-rose-400',
      badgeColor: 'bg-rose-50 text-rose-900 border-rose-200',
    },
    {
      day: 3,
      date: 'OCT 3',
      title: 'KANYAKUMARI',
      sub: 'Coastal Day',
      desc: 'Bhagavathy Amman Temple · Vivekananda Rock & Thiruvalluvar Statue ferry · Seafood lunch at The Curry · Vattakottai Beach sunset',
      accentColor: 'border-cyan-400',
      badgeColor: 'bg-cyan-50 text-cyan-900 border-cyan-200',
    },
    {
      day: 4,
      date: 'OCT 4',
      title: 'KANYAKUMARI → BANGALORE',
      sub: 'Sunrise · Shopping · Homecoming',
      desc: 'Triveni Sangam ~6:07 AM sunrise · Sannathi Street handicrafts shopping · Sea View lunch · Homeward highway return to Bangalore',
      accentColor: 'border-indigo-400',
      badgeColor: 'bg-indigo-50 text-indigo-900 border-indigo-200',
    },
  ];

  return (
    <section id="trip-glance" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold tracking-widest uppercase mb-3 border border-slate-200">
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>Trip at a Glance</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight">
          Kanyakumari trip
        </h2>
      </div>

      {/* Overview Stat Strip */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-center">
          <div className="pt-2 sm:pt-0">
            <span className="text-xl sm:text-2xl font-monument font-bold text-slate-900 block">4</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Days</span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-2">
            <span className="text-xl sm:text-2xl font-monument font-bold text-slate-900 block">3</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Destinations</span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-2">
            <span className="text-xl sm:text-2xl font-monument font-bold text-slate-900 block">17</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Travellers</span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-2">
            <span className="text-xl sm:text-2xl font-monument font-bold text-slate-900 block">15</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Adults</span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-2">
            <span className="text-xl sm:text-2xl font-monument font-bold text-slate-900 block">2</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Kids</span>
          </div>
          <div className="pt-2 sm:pt-0 sm:pl-2">
            <span className="text-xl sm:text-2xl font-monument font-bold text-slate-900 block">5</span>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Rooms</span>
          </div>
        </div>
      </div>

      {/* 4 Day Sequential Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dayHighlights.map((item) => (
          <motion.div
            key={item.day}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onDayClick(item.day)}
            className="group cursor-pointer bg-white rounded-2xl sm:rounded-3xl border border-slate-200 hover:border-amber-400 p-5 sm:p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between active:scale-[0.99]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest px-2.5 py-1 rounded-lg border ${item.badgeColor}`}>
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold group-hover:text-amber-600 transition-colors">
                  Day 0{item.day}
                </span>
              </div>

              <h3 className="font-monument text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">
                {item.title}
              </h3>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {item.sub}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-amber-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-500" /> View Day 0{item.day}
              </span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
