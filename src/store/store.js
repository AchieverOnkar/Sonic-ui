import { configureStore } from "@reduxjs/toolkit";
import artistSlice from "../features/artistSlice";
import playlistSlice from "../features/playlistSlice";
import playerSlice from "../features/playerSlice";
export const store = configureStore({
    reducer: {
        artist: artistSlice,
        playlist: playlistSlice,
        player: playerSlice

    },
})