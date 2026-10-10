import React from "react";
import { Cursor } from "../shared/Cursor";
import { Home } from "../pages/studio/Home";

interface StudioLayoutProps {
  accentRgb: string;
  showLoader: boolean;
}

export function StudioLayout({ accentRgb, showLoader }: StudioLayoutProps) {
  return (
    <>
      <Cursor />
      <Home accentRgb={accentRgb} showLoader={showLoader} />
    </>
  );
}
