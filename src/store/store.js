import { configureStore } from "@reduxjs/toolkit";
import artistSlice from "../features/artistSlice";
import playlistSlice from "../features/playlistSlice";
export const store = configureStore({
    reducer: {
        artist: artistSlice,
        playlist: playlistSlice
        
    },
})