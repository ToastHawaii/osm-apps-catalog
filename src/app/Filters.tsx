import React from "react";

import { Toggle } from "@components/ui/toggle";
import { useAppState } from "@hooks/useAppState";

export function Filters() {
  const [state, setAppState] = useAppState();

  const platformsUp = state.platforms.map((t) => t.toUpperCase());

  return (
    <div className="flex flex-wrap items-center gap-2 px-8 py-3 md:px-18">
      {Object.entries({
        WEB: () => "Web",
        ANDROID: () => "Android",
        LINUX: () => "Linux",
        IOS: () => "iOS",
        MACOS: () => "MacOS",
        WINDOWS: () => "Windows",
      }).map((keyValue) => (
        <Toggle
          key={keyValue[0]}
          size="sm"
          variant="outline"
          pressed={platformsUp.includes(keyValue[0])}
          onPressedChange={(pressed) => {
            if (!pressed)
              setAppState(
                "platforms",
                state.platforms.filter((p) => p.toUpperCase() !== keyValue[0]),
              );
            else setAppState("platforms", [...state.platforms, keyValue[0]]);
          }}
        >
          {keyValue[1]()}
        </Toggle>
      ))}
    </div>
  );
}
