"use client";

import * as React from "react";

export function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/30 p-6 sm:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
      {children}
    </div>
  );
}

export function Field({
  label,
  helper,
  error,
  children,
}: {
  label: string;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-3">
        <div>
          <label className="text-sm font-medium text-zinc-100">{label}</label>
          {helper ? <p className="mt-1 text-xs text-zinc-400">{helper}</p> : null}
        </div>
        {error ? <p className="text-xs text-red-300">{error}</p> : null}
      </div>
      {children}
    </div>
  );
}

export const TextInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function TextInput(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={[
          "w-full rounded-2xl border bg-zinc-950/30 px-4 py-3 text-sm text-zinc-100 outline-none transition",
          "border-zinc-800 placeholder:text-zinc-600",
          "focus:border-zinc-500 focus:ring-4 focus:ring-white/5",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          props.className || "",
        ].join(" ")}
      />
    );
  }
);

export const TextArea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function TextArea(props, ref) {
    return (
      <textarea
        ref={ref}
        {...props}
        className={[
          "w-full min-h-[120px] resize-y rounded-2xl border bg-zinc-950/30 px-4 py-3 text-sm text-zinc-100 outline-none transition",
          "border-zinc-800 placeholder:text-zinc-600",
          "focus:border-zinc-500 focus:ring-4 focus:ring-white/5",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          props.className || "",
        ].join(" ")}
      />
    );
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
};

export function Button({ variant = "solid", className, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition " +
    "focus:outline-none focus:ring-4 focus:ring-white/10 disabled:opacity-60 disabled:cursor-not-allowed";

  const solid =
    "bg-zinc-50 text-zinc-950 hover:bg-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] active:scale-[0.99]";

  const ghost =
    "border border-zinc-800 bg-zinc-950/20 text-zinc-100 hover:bg-zinc-950/45 active:scale-[0.99]";

  return <button {...props} className={[base, variant === "ghost" ? ghost : solid, className || ""].join(" ")} />;
}

/**
 * UI helper: “radio-card” yang kelihatan selected tanpa JS.
 * Cara pakai: bungkus input + konten dalam label className="choice-card"
 * Input radio-nya beri className="choice-input"
 */
export function ChoiceCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label
      className={[
        "choice-card group flex cursor-pointer items-start gap-3 rounded-2xl border px-3 py-3 transition",
        "border-zinc-800 bg-zinc-950/30 hover:bg-zinc-950/55",
        "focus-within:ring-4 focus-within:ring-white/5 focus-within:border-zinc-500",
        className,
      ].join(" ")}
    >
      {children}
    </label>
  );
}

/**
 * Input radio/checkbox yang ringan + tetap native.
 * Style “selected” di-handle lewat :has() di globals.css (opsional)
 */
export function ChoiceInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={[
        "choice-input mt-1 h-4 w-4 accent-white",
        "focus:outline-none",
        props.className || "",
      ].join(" ")}
    />
  );
}
