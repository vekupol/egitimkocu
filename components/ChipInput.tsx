"use client";
import { useState } from "react";

export default function ChipInput({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState("");

  function addValue() {
    const v = input.trim();
    if (v && !values.includes(v)) {
      onChange([...values, v]);
    }
    setInput("");
  }

  function removeValue(val: string) {
    onChange(values.filter((v) => v !== val));
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {values.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-sm dark:bg-neutral-800"
          >
            {v}
            <button
              onClick={() => removeValue(v)}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          placeholder={placeholder}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addValue();
            }
          }}
          className="flex-1 rounded-xl border px-3 py-2"
        />
        <button
          onClick={addValue}
          type="button"
          className="rounded-xl bg-brand-600 text-white px-3 py-2"
        >
          Ekle
        </button>
      </div>
    </div>
  );
}
