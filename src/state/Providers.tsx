"use client";

import { Provider } from "react-redux";
import { makeStore, persist, type AppStore } from "./store";
import { useRef, useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  useEffect(() => {
    if (storeRef.current) persist(storeRef.current);
  }, []);
  return <Provider store={storeRef.current!}>{children}</Provider>;
}
