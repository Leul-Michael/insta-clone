import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

type Initialstate = {
  token: string | null
  userid: string | null
}

const initialState: Initialstate = {
  token: null,
  userid: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential(state, action) {
      const { token, id } = action.payload
      state.token = token
      state.userid = id
    },
    logOutReset: () => {
      return initialState
    },
  },
})

export const { setCredential, logOutReset } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.user.token
export const selectCurrentUser = (state: RootState) => state.user.userid
