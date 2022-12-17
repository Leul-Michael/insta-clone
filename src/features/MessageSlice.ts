import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface InitialStateProp {
  message: string[]
}

const initialState: InitialStateProp = {
  message: [],
}

const MessageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMsg(state, action) {
      if (state.message.includes(action.payload)) {
        return state
      }
      state.message.unshift(action.payload)
    },
    removeMsg(state) {
      if (state.message.length <= 0) {
        return state
      }
      state.message.pop()
    },
  },
})

export const { setMsg, removeMsg } = MessageSlice.actions

export default MessageSlice.reducer

export const selectMsg = (state: RootState) => state.message.message
