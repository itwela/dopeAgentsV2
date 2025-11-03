"use client"

import React, { useRef, useState, useCallback } from "react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

interface GameBoxProps {
  className?: string;
}

export function GameBox({ className }: GameBoxProps) {
  const [iframeSrc, setIframeSrc] = useState("https://thelittlelabs.com/work/studio-run");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [showMuteTooltip, setShowMuteTooltip] = useState(false);

  const reloadIframe = useCallback(() => {
    // Force reload by updating src with timestamp
    setIframeSrc(`https://thelittlelabs.com/work/studio-run?t=${Date.now()}`);
  }, []);

  const handleMuteClick = useCallback(() => {
    setShowMuteTooltip(true);
    // Auto-hide tooltip after 5 seconds
    setTimeout(() => {
      setShowMuteTooltip(false);
    }, 5000);
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto mb-6 rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10 bg-background ${className || ""}`}>
      
      <div className="m-2 top-2 right-2 z-10 flex items-center gap-2">
        <button
          type="button"
          onClick={reloadIframe}
          className="px-3 py-1.5 rounded-md bg-black/60 text-white text-xs backdrop-blur hover:bg-black/70 transition"
          aria-label="Reload game"
        >
          Reload
        </button>
        <Tooltip open={showMuteTooltip} onOpenChange={setShowMuteTooltip}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={handleMuteClick}
              className="px-3 py-1.5 rounded-md bg-black/60 text-white text-xs backdrop-blur hover:bg-black/70 transition"
              aria-label="Mute instructions"
            >
              Mute
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-2">
              <p className="text-xs">
                Please mute the volume on your computer or press the mute icon on your tab for a quieter experience.
              </p>
              <div className="mt-2">
                <img 
                  src="/muteexample.png" 
                  alt="Mute instructions visual example" 
                  className="w-full h-auto rounded border"
                />
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {/* Controls overlay */}

        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title="Studio Run by The Little Labs"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          sandbox="allow-scripts allow-same-origin allow-popups allow-top-navigation-by-user-activation"
        />
      </div>
    </div>
  );
}


