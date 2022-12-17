import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export enum CONFIRM {
  SAVE = "Save",
  DISCARD = "Discard",
  DELETE = "Delete",
}

interface InitialStateProps {
  type: CONFIRM | null
  confirmed: boolean
}

const initialState: InitialStateProps = {
  type: null,
  confirmed: false,
}

const ConfirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    setDiscardType(state, action) {
      if (action.payload.type) {
        state.type = action.payload.type
      }
      if (action.payload.confirmed) {
        state.confirmed = action.payload.confirmed
      }
    },
    resetDiscard: () => {
      return initialState
    },
  },
})

export const { setDiscardType, resetDiscard } = ConfirmSlice.actions

export default ConfirmSlice.reducer

export const selectConfrim = (state: RootState) => state.confirm
