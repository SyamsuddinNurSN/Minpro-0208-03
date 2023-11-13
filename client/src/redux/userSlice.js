import { createSlice } from '@reduxjs/toolkit'


const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {},
        profile_picture: null,
    },
    reducers: {
        setData: (state, action) => {
            state.value = action.payload
        },
        updateProfilePicture: (state, action) => {
            state.value.profile_picture = action.payload;
          },
    }
})

export const { setData, updateProfilePicture } = userSlice.actions
export default userSlice.reducer