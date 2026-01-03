"use client";

import { useState } from "react";
// import "./range-slider.css";

type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
};

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
}: RangeSliderProps) {
  const [minVal, maxVal] = value;

  const handleMinChange = (val: number) => {
    if (val <= maxVal) onChange([val, maxVal]);
  };

  const handleMaxChange = (val: number) => {
    if (val >= minVal) onChange([minVal, val]);
  };

  const [minRangeId] = useState(
    () => `min-range-${Math.random().toString(36).slice(2)}`
  );
  const [maxRangeId] = useState(
    () => `max-range-${Math.random().toString(36).slice(2)}`
  );
  const [minInputId] = useState(
    () => `min-input-${Math.random().toString(36).slice(2)}`
  );
  const [maxInputId] = useState(
    () => `max-input-${Math.random().toString(36).slice(2)}`
  );

  return (
    <div className="range-slider w-full space-y-6">
      {/* SLIDER */}
      <div className="range-track relative h-2">
        <div className="range-track-base absolute inset-0 rounded-full" />

        {/* Note: We avoid inline styles. The visual selection fill is omitted to satisfy no-inline-styles rule.
            The dual-range thumbs still allow selecting min/max values. */}

        <label htmlFor={minRangeId} className="sr-only">
          Minimum price range
        </label>
        <input
          id={minRangeId}
          aria-label="Minimum price range"
          title="Minimum price"
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="range-input absolute w-full pointer-events-none appearance-none bg-transparent
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-foreground
            -mt-1
            accent-brand"
        />

        <label htmlFor={maxRangeId} className="sr-only">
          Maximum price range
        </label>
        <input
          id={maxRangeId}
          aria-label="Maximum price range"
          title="Maximum price"
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="range-input absolute w-full pointer-events-none appearance-none bg-transparent
            [&::-webkit-slider-thumb]:pointer-events-auto
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border
            [&::-webkit-slider-thumb]:border-black
            -mt-1
            accent-brand"
        />
      </div>

      {/* INPUTS */}
      <div className="flex gap-4">
        <div className="flex items-center border px-3 py-2 rounded-md w-full">
          <span className="mr-2">₹</span>
          <label htmlFor={minInputId} className="sr-only">
            Minimum price input
          </label>
          <input
            id={minInputId}
            aria-label="Minimum price"
            title="Minimum price"
            type="number"
            value={minVal}
            min={min}
            max={maxVal}
            placeholder="Minimum price"
            onChange={(e) => handleMinChange(Number(e.target.value))}
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="flex items-center border px-3 py-2 rounded-md w-full">
          <span className="mr-2">₹</span>
          <label htmlFor={maxInputId} className="sr-only">
            Maximum price input
          </label>
          <input
            id={maxInputId}
            aria-label="Maximum price"
            title="Maximum price"
            type="number"
            value={maxVal}
            min={minVal}
            max={max}
            placeholder="Maximum price"
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            className="w-full outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );
}
