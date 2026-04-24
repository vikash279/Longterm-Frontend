'use client';

import { useState } from "react";

interface Props {
  rooms: number;
  adults: number;
  children: number;
  setRooms: (n: number) => void;
  setAdults: (n: number) => void;
  setChildren: (n: number) => void;
  onApply: () => void; // parent handles closing
}

export default function GuestSelector({
  rooms,
  adults,
  children,
  setRooms,
  setAdults,
  setChildren,
  onApply
}: Props) {

  // Reusable counter component
  const Counter = ({ label, value, set, min = 0 }: { label: string; value: number; set: (n: number) => void; min?: number }) => (
    <div className="flex justify-between items-center py-3">
      <div className="font-semibold">{label}</div>
      <div className="flex items-center gap-3">
        <button
          onClick={(e) => { e.stopPropagation(); value > min && set(value - 1); }}
          className="px-3 py-1 border rounded hover:bg-gray-100 transition"
        >
          -
        </button>
        <span>{value}</span>
        <button
          onClick={(e) => { e.stopPropagation(); set(value + 1); }}
          className="px-3 py-1 border rounded hover:bg-gray-100 transition"
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="absolute top-full right-0 mt-3 bg-white shadow-xl rounded-2xl p-5 w-[320px] z-[5000] pointer-events-auto" onClick={(e) => e.stopPropagation()}>

      <Counter label="Rooms" value={rooms} set={setRooms} min={1} />
      <Counter label="Adults" value={adults} set={setAdults} min={1} />
      <Counter label="Children" value={children} set={setChildren} min={0} />

      <button
        onClick={(e) => { e.stopPropagation(); onApply(); }}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-xl font-semibold mt-4 hover:opacity-90 transition"
      >
        Apply
      </button>

    </div>
  );
}