'use client';

import React from 'react';

export default function HeroSection() {

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      <section className="relative h-screen bg-[url('/Bg.png')] w-full bg-no-repeat bg-cover bg-center text-sm">
        <div className="relative z-10 pt-28 md:pt-32 lg:pt-36 px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-2 border border-black-400/50 rounded-full w-max mx-auto px-4 py-2 bg-white/5">
            <span className="text-black text-xs md:text-sm font-normal">Track, analyze, and reduce mining emissions</span>
          </div>

          <h5 className="text-4xl md:text-6xl lg:text-7xl font-semibold max-w-[950px] text-center mx-auto mt-6 text-black leading-tight">
            Monitor Carbon Emissions from Coal Mining Operations
          </h5>

          <p className="text-lg md:text-xl lg:text-2xl mx-auto max-w-3xl text-center mt-6 max-md:px-2 text-black/80">
            A comprehensive platform to measure, track, and analyze carbon emissions across coal mining sites, helping you meet environmental standards and sustainability goals.
          </p>

          <div className="mx-auto w-full flex items-center justify-center gap-3 mt-2">
            <button className="bg-black hover:bg-slate-600 text-cyan-50 px-6 py-3 rounded-lg font-normal transition text-base md:text-lg">
              Start Monitoring
            </button>
            <button className="flex items-center gap-2 border border-black-300 hover:bg-white/5 rounded-lg px-6 py-3 text-black border-black text-base md:text-lg">
              <span>View Demo</span>
              <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M1.25.5 4.75 4l-3.5 3.5" stroke="#000000" strokeOpacity=".9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}