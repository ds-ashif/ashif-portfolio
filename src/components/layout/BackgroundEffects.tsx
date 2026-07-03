"use client";

import dynamic from "next/dynamic";

const StarField = dynamic(() => import("@/components/three/StarField"), {
  ssr: false,
  loading: () => null,
});

const AuroraBackground = dynamic(
  () => import("@/components/ui/AuroraBackground"),
  { ssr: false, loading: () => null }
);

const ShootingStars = dynamic(
  () => import("@/components/ui/ShootingStars"),
  { ssr: false, loading: () => null }
);

const CursorGlow = dynamic(() => import("@/components/ui/CursorGlow"), {
  ssr: false,
  loading: () => null,
});

export default function BackgroundEffects() {
  return (
    <>
      <StarField />
      <AuroraBackground />
      <ShootingStars />
      <CursorGlow />
    </>
  );
}
