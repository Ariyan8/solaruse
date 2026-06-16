"use client";

import dynamic from "next/dynamic";

const RoofPlannerMapClient = dynamic(
  () => import("./RoofPlannerMapClient"),
  { ssr: false }
);

export default function RoofPlannerMap() {
  return <RoofPlannerMapClient />;
}
