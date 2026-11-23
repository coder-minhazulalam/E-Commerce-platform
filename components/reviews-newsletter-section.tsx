"use client";

import React, { useState } from "react";

interface ReviewsNewsletterSectionProps {
  onNotify?: (msg: string) => void;
}

export function ReviewsNewsletterSection({ onNotify }: ReviewsNewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    onNotify?.("Subscribed to OOTFY Atelier Dispatches");
  };

  return (
    <section className="w-full bg-[#fcf9f4] py-16 lg:py-24">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Reviews Block */}
          <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8">
            <span className="text-[11px] uppercase text-[#755a21] tracking-widest font-medium">
              Client Dispatches
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Review 1 */}
              <div className="bg-[#f6f3ee] p-6 lg:p-8 flex flex-col justify-between gap-6 border border-[#c3c8c2]/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#755a21] hover:shadow-sm">
                <p className="text-sm lg:text-base text-[#1c1c19] italic leading-relaxed">
                  “The ivory Panjabi feels weightless yet structured. The Dhakai tonal embroidery is understated in the best possible way.”
                </p>
                <div>
                  <p className="text-xs uppercase text-[#1c1c19] font-semibold tracking-wider">
                    Tariq Rahman
                  </p>
                  <p className="text-xs text-[#737873] mt-0.5">Dhaka · Verified Client</p>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-[#f6f3ee] p-6 lg:p-8 flex flex-col justify-between gap-6 border border-[#c3c8c2]/30 transition-all duration-300 hover:-translate-y-1 hover:border-[#755a21] hover:shadow-sm">
                <p className="text-sm lg:text-base text-[#1c1c19] italic leading-relaxed">
                  “Finally a Bangladeshi label that understands quiet luxury. My Jamdani saree arrived in museum-grade packaging.”
                </p>
                <div>
                  <p className="text-xs uppercase text-[#1c1c19] font-semibold tracking-wider">
                    Nusrat Jahan
                  </p>
                  <p className="text-xs text-[#737873] mt-0.5">Chattogram · Verified Client</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-5 bg-[#f0ede9] p-6 lg:p-10 flex flex-col justify-between gap-6 border border-[#c3c8c2]/30">
            <div>
              <span className="text-[11px] uppercase text-[#755a21] block mb-2 tracking-widest font-medium">
                Private List
              </span>
              <h3 className="font-serif text-2xl lg:text-3xl text-[#1c1c19] mb-3">
                Join the Atelier
              </h3>
              <p className="text-sm text-[#434844] leading-relaxed">
                Early access to limited handloom capsules, private trunk shows, and seasonal edits.
              </p>
            </div>

            {!subscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-[#fcf9f4] px-4 py-3 text-sm text-[#1c1c19] placeholder:text-[#737873] border border-[#c3c8c2]/60 focus:border-[#243329] focus:outline-none focus:ring-1 focus:ring-[#243329] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#243329] text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-[#3a4a3f] transition-all duration-300 whitespace-nowrap active:scale-95 font-medium cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-[#243329]/10 border border-[#243329]/20 text-[#243329]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <p className="text-xs font-medium">
                  Subscribed to Atelier Dispatches. Welcome to OOTFY.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
