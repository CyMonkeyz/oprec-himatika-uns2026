"use client";

import React from "react";

export function Stepper({
  steps,
  current,
}: {
  steps: { title: string }[];
  current: number;
}) {
  const total = steps.length;
  const safeCurrent = Math.min(Math.max(current, 0), total - 1);
  const pct = total <= 1 ? 0 : Math.round((safeCurrent / (total - 1)) * 100);

  return (
    <div className="space-y-3" aria-label="Progress pendaftaran">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400">
            Step <span className="text-zinc-200 font-medium">{safeCurrent + 1}</span> / {total}
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-100">{steps[safeCurrent]?.title}</p>
        </div>

        <span className="text-xs rounded-full border border-zinc-800 bg-zinc-950/20 px-2 py-1 text-zinc-300">
          {pct}%
        </span>
      </div>

      {/* progress bar */}
      <div className="relative h-2 w-full overflow-hidden rounded-full border border-zinc-800 bg-zinc-950/30">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-zinc-50 transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* dots */}
      <div className="flex items-center justify-between gap-2">
        {steps.map((s, i) => {
          const isDone = i < safeCurrent;
          const isActive = i === safeCurrent;

          return (
            <div key={s.title + i} className="flex flex-1 items-center gap-2">
              <div
                aria-hidden
                className={[
                  "h-2.5 w-2.5 rounded-full border transition",
                  isActive
                    ? "border-white bg-white"
                    : isDone
                    ? "border-zinc-300 bg-zinc-300"
                    : "border-zinc-700 bg-transparent",
                ].join(" ")}
              />
              {/* line */}
              {i !== steps.length - 1 ? (
                <div
                  aria-hidden
                  className={[
                    "h-[2px] flex-1 rounded-full transition",
                    isDone ? "bg-zinc-300" : "bg-zinc-800",
                  ].join(" ")}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
