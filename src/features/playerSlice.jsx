import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: "player",
    initialState:{
        songId:0,
        currentSongId:0
    },
    reducers:{
        setSongId:(state, action)=>{
            state.songId=action.payload;
        },
        setCurrentSongId:(state, action) => {
            state.currentSongId=action.payload;
        },
        resetCurrentSongId:(state) => {
            state.currentSongId=0;
        }
    }
    
})

export const{setSongId,setCurrentSongId,resetCurrentSongId} = playerSlice.actions;
export default playerSlice.reducer;