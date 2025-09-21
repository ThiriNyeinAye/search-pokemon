import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SearchState = {
  recents: string[];
  favorites: Record<string, boolean>;
};
const initialState: SearchState = { recents: [], favorites: {} };

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addRecent(state, action: PayloadAction<string>) {
      const v = action.payload.toLowerCase();
      state.recents = [v, ...state.recents.filter((x) => x !== v)].slice(0, 10);
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const n = action.payload;
      state.favorites[n] = !state.favorites[n];
    },
  },
});

export const { addRecent, toggleFavorite } = searchSlice.actions;
export default searchSlice.reducer;
