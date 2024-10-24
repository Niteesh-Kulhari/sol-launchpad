import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../componenets/spotlight";

export function SpotlightPreview() {
  return (
    <div className="w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden h-screen">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Solana <br /> Launchpad.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Launch your own token using Solana blockchain in just a few clicks.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <a href="/start" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">
            Get Started
          </a>
          {/* <button className="px-6 py-3 bg-transparent border border-neutral-300 text-neutral-300 rounded-md hover:bg-neutral-800 transition duration-300">
            Learn More
          </button> */}
        </div>

        {/* Additional Features Section */}
        {/* <div className="mt-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-100">
            Why Solana?
          </h2>
          <p className="mt-2 text-neutral-300 max-w-md mx-auto">
            Solana offers unparalleled speed and low transaction costs, making it the ideal blockchain for launching your decentralized projects.
          </p>
        </div> */}
      </div>
    </div>
  );
}
