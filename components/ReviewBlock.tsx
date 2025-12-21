"use client";

import React from "react";
import { Button } from "@/components/FormUI";

export type ReviewItem = {
  label: string;
  value: React.ReactNode;
};

export function ReviewBlock({
  title,
  subtitle,
  items,
  onEdit,
}: {
  title: string;
  subtitle?: string;
  items: ReviewItem[];
  onEdit?: () => void;
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950/20">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-800 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-zinc-100">{title}</p>
          {subtitle ? <p className="mt-1 text-xs text-zinc-400">{subtitle}</p> : null}
        </div>

        {onEdit ? (
          <Button type="button" variant="ghost" onClick={onEdit}>
            Edit
          </Button>
        ) : null}
      </div>

      <div className="px-4 py-4">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {items.map((it, idx) => (
  <div key={`${it.label}-${idx}`} className="rounded-xl border border-zinc-800 bg-zinc-950/30 px-3 py-3">
    <dt className="text-xs text-zinc-400">{it.label}</dt>
    <dd className="mt-1 text-sm text-zinc-100 break-words">{it.value}</dd>
  </div>
))}
        </dl>
      </div>
    </section>
  );
}
