import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name:"playlist",
    initialState:{
        playlistId:0
    },
    reducers:{
        addPlaylistId:(state, action) => {
                state.playlistId = action.payload;
            
        },
        removePlaylistId:(state, action) => {
            state.playlistId = 0;
        }
    
    }

});

export const{addPlaylistId,removePlaylistId} = playlistSlice.actions;
export default playlistSlice.reducer;