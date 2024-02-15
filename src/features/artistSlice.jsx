import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
    name:'artist',
    initialState:{
        artistId:0
    },
    reducers:{
        addArtistId:(state, action) =>{
            state.artistId = action.payload;
        },
        resetArtistId:(state, action ) => {
            state.artistId = 0;
        }
    }
})

export const {addArtistId, resetArtistId} = artistSlice.actions;
export default artistSlice.reducer;