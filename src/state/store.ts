import { configureStore } from "@reduxjs/toolkit";
import searchReducer, { type SearchState } from "./searchSlice";

const PERSIST_KEY = "search-pokemon-redux";

function loadState(): { search: SearchState } | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export const makeStore = () =>
  configureStore({
    reducer: { search: searchReducer },
    preloadedState: loadState(),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const persist = (store: AppStore) => {
  if (typeof window === "undefined") return;
  store.subscribe(() => {
    localStorage.setItem(
      PERSIST_KEY,
      JSON.stringify({ search: store.getState().search })
    );
  });
};
