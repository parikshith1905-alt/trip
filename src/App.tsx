/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { TripAtAGlance } from './components/TripAtAGlance';
import { RouteMapSection } from './components/RouteMapSection';
import { DayNavigationBar } from './components/DayNavigationBar';
import { HighwayRoadTimeline } from './components/HighwayRoadTimeline';
import { FamilyTripFooter } from './components/FamilyTripFooter';
import { ITINERARY_DATA } from './data/itineraryData';

export default function App() {
  const [currentActiveDay, setCurrentActiveDay] = useState<number>(1);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStopName, setActiveStopName] = useState<string>('Guru Krupa Nilaya, Bangalore');

  // Monitor scroll progress and determine active day
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      // Determine active day by scroll position of sections
      const daySections = [1, 2, 3, 4].map((d) => document.getElementById(`day-${d}`));
      const scrollPosition = winScroll + 320; // offset for sticky header

      for (let i = daySections.length - 1; i >= 0; i--) {
        const section = daySections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setCurrentActiveDay(i + 1);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToDay = (dayNum: number) => {
    const el = document.getElementById(`day-${dayNum}`);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleScrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Cinematic Hero Section */}
      <Hero
        onExploreClick={() => handleScrollToSection('trip-glance')}
        onCityClick={(targetId) => handleScrollToSection(targetId)}
      />

      {/* 2. Persistent Navigation Bar (Sticky with Active Day + Trip Progress Bar) */}
      <DayNavigationBar
        currentActiveDay={currentActiveDay}
        onSelectDay={handleScrollToDay}
        scrollProgress={scrollProgress}
      />

      {/* 3. Trip at a Glance Compact Overview */}
      <div className="bg-white border-b border-slate-200/90">
        <TripAtAGlance onDayClick={handleScrollToDay} />
      </div>

      {/* 4. Interactive Route Corridor Section */}
      <div className="bg-[#F8FAFC] border-b border-slate-200/90">
        <RouteMapSection onSelectCity={handleScrollToSection} />
      </div>

      {/* 5. Main Animated Highway Road Timeline */}
      <main id="main-timeline" className="flex-grow py-12 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 mb-8 text-center">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-600 font-bold block mb-1">
            INTERACTIVE ROAD TIMELINE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900">
            The Highway Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mt-2">
            Watch the private mini-bus travel along the highway as you scroll down the road.
          </p>
        </div>

        {/* The Highway Road Timeline with moving minibus */}
        <HighwayRoadTimeline
          days={ITINERARY_DATA}
          currentActiveDay={currentActiveDay}
          onActiveStopChange={(stopName) => setActiveStopName(stopName)}
        />
      </main>

      {/* 6. Epilogue / Family Trip Footer */}
      <FamilyTripFooter />
    </div>
  );
}
