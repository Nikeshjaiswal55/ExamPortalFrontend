import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stream: null
};


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        getIndivisualPost: (state, action) => {
            return action.payload;
        },
        getStream: (state, action) => {
            console.log(action, 'payload')
            state.stream = action.payload;
        }
    }
})

export const { getIndivisualPost, getStream } = adminSlice.actions;
export default adminSlice.reducer;

