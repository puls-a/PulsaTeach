import { useEffect, useState } from "react";
import { getLearnerItem, setLearnerItem } from "../../learnerStorage.js";

const storageKey = "pulsateach-studio-preferences";
const defaultPreferences = {
  panelWidths: [26, 42, 32],
  fontSize: 14,
  lineWrapping: true
};

export default function useStudioPreferences() {
  const [preferences, setPreferences] = useState(readPreferences);

  useEffect(() => {
    setLearnerItem(storageKey, JSON.stringify(preferences));
  }, [preferences]);

  const setDividerPosition = (index, position) => {
    setPreferences((current) => {
      const [learn, code, results] = current.panelWidths;
      if (index === 0) {
        const nextLearn = clamp(position, 18, 100 - 28 - results);
        return { ...current, panelWidths: [nextLearn, code + learn - nextLearn, results] };
      }
      const nextCode = clamp(position - learn, 28, 100 - learn - 20);
      return { ...current, panelWidths: [learn, nextCode, 100 - learn - nextCode] };
    });
  };

  return {
    ...preferences,
    setDividerPosition,
    setFontSize: (fontSize) => setPreferences((current) => ({ ...current, fontSize: Number(fontSize) })),
    setLineWrapping: (lineWrapping) => setPreferences((current) => ({ ...current, lineWrapping }))
  };
}

function readPreferences() {
  try {
    return { ...defaultPreferences, ...JSON.parse(getLearnerItem(storageKey)) };
  } catch {
    return defaultPreferences;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
