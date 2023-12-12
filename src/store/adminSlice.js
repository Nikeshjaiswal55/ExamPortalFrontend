import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: false
};


const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        getIndivisualPost: (state, action) => {
            return action.payload;
        },
        getNotification: (state, action) => {
            console.log(action.payload, 'payload')
            state.notification = action.payload
        }

    }
})

export const { getNotification } = adminSlice.actions;
export default adminSlice.reducer;

