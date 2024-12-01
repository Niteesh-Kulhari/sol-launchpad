import { SparklesCore } from "./sparkles";
import { useTheme } from "@/components/theme-provider";

export function SpotlightPreview() {
  const { theme } = useTheme();
  return (
    <div className="w-full rounded-md flex items-center justify-center dark:bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden h-screen">
      {/* <Spotlight
        className="top-20 left-0 md:left-10 md:-top-0 lg:left-60 lg:-top-40"
        fill="white"
      /> */}
      {/* <WavyBackground/> */}
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={theme === "dark" ? 0.3 : 0.5}
          maxSize={theme === "dark" ? 0.4 : 0.9}
          particleDensity={theme === "dark" ? 30 : 50}
          className="w-full h-full"
          particleColor={theme === "dark" ? "#DDDDDD" : "#1E3A8A"}
        />
      </div>
      <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-900  dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50">
          Solana <br /> Launchpad.
        </h1>
        <p className="mt-4 font-semibold text-base text-neutral-400 dark:text-neutral-300 max-w-lg text-center mx-auto">
          Launch your own token using Solana blockchain in just a few clicks.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <a href="/start" className="px-6 py-3 bg-black/50 dark:bg-blue-600 text-white rounded-md hover:bg-black/80 dark:hover:bg-blue-500 transition duration-300">
            Get Started
          </a>
          {/* <button className="px-6 py-3 bg-transparent border border-neutral-300 text-neutral-300 rounded-md hover:bg-neutral-800 transition duration-300">
            Learn More
          </button> */}
        </div>
      </div>
    </div>
  );
}
