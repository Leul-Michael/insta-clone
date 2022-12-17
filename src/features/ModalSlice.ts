import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

type Initialstate = {
  openAddPostModal: boolean
  openViewPostModal: boolean
  openConfirmModal: boolean
}

const initialState: Initialstate = {
  openAddPostModal: false,
  openViewPostModal: false,
  openConfirmModal: false,
}

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setAddPostModal(state, action) {
      state.openAddPostModal = action.payload
    },
    setViewPostModal(state, action) {
      state.openViewPostModal = action.payload
    },
    setConfirmModal(state, action) {
      state.openConfirmModal = action.payload
    },
  },
})

export const { setAddPostModal, setViewPostModal, setConfirmModal } =
  ModalSlice.actions

export default ModalSlice.reducer

export const selectAddPost = (state: RootState) => state.modal.openAddPostModal
export const selectViewPost = (state: RootState) =>
  state.modal.openViewPostModal
export const selectConfirmModal = (state: RootState) =>
  state.modal.openConfirmModal
