"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import TrackClient from "./TrackClient";

export default function TrackPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: "40px", color: "white", textAlign: "center" }}>
          Loading tracking page...
        </div>
      }
    >
      <TrackClient />
    </Suspense>
  );
}