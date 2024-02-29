// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import CursorMagic from "../components/main/CursorMagic";

export function Provider({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
