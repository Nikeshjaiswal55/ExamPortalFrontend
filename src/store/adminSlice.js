import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notification: false,
    image: [],
    assissment: {}
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
        },
        sendImage: (state, action) => {
            console.log(action.payload, 'payloadd')
            state.image.push(action.payload)

        },
        updateAssissmentData: (state, action) => {
            state.assissment = action.payload
        }

    }
})

export const { getNotification, sendImage, updateAssissmentData } = adminSlice.actions;
export default adminSlice.reducer;

