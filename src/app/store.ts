import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/AuthSlice"
import modalReducer from "../features/ModalSlice"
import messageReducer from "../features/MessageSlice"
import confirmReducer from "../features/ConfirmSlice"
import selectPostReducer from "../features/PostSlice"

export const store = configureStore({
  reducer: {
    user: authReducer,
    modal: modalReducer,
    message: messageReducer,
    confirm: confirmReducer,
    post: selectPostReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
