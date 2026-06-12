"use client";

import Image from "next/image";
import { BadgeCheck, Info } from "lucide-react";

const PREVIEW_IMAGE_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_DizxGG8r11uSRvyVMMkmTljiGBJgCIng4v3AjCFRrKBVB-Rmopa7ADALzGgy_k6SLtByCzUWhCW6sY0wFNm89Ag_kp2OyXVI56xjYVaueX4svJ7ydsi238QeIvdBYBxvSmORlW0GrMnXXbbwvLYlIRxqGm8gT4s_2KCe5W-Gi4hhWu1H3foDrx1AfBz3Dk4CQWiULvRcXOmSxlOvl6Ori3mHPNDc9gSC00yGZBGX9PUs4GnzZH4Wg0eqOHU6Bzb09wcxMPhbGUlW";

export default function CreateClassSidebar() {
  return (
    <aside className="space-y-6">
      <div className="bg-indigo-600 p-8 rounded-xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <Info className="mb-4 h-7 w-7" />
          <h3 className="text-xl font-bold mb-2">Review Required</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            The system detected 1 validation error. Please resolve the seat
            capacity before publishing this class to the roster.
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mb-16" />
      </div>

      <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
          Class Preview
        </h4>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-200">
          <Image
            src={PREVIEW_IMAGE_SRC}
            alt="High-end minimalist classroom with large windows and natural oak furniture"
            fill
            sizes="(min-width: 1024px) 360px, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-xs text-on-surface-variant mb-1 uppercase tracking-tighter">
            Current Lead
          </p>
          <p className="font-semibold text-on-surface">Dr. Julian Thorne</p>
        </div>
        <div className="flex items-center gap-4 py-2 border-t border-outline-variant/20">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-slate-400" />
            <div className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-slate-500" />
            <div className="w-8 h-8 rounded-full border-2 border-surface-container-low bg-slate-300" />
          </div>
          <span className="text-xs font-medium text-on-surface-variant">
            Waitlist: 12 Students
          </span>
        </div>
      </div>

      <div className="p-6 border-2 border-emerald-200 rounded-xl">
        <div className="flex items-start gap-3">
          <BadgeCheck className="h-5 w-5 text-emerald-600" />
          <div>
            <h5 className="text-sm font-bold text-emerald-600 uppercase">
              Pro Tip
            </h5>
            <p className="text-sm text-on-surface-variant mt-1 leading-snug">
              Classes with capacities over 40 automatically generate a secondary
              TA assignment request.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
