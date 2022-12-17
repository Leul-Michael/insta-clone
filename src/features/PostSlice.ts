import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

interface InitialStateProps {
  open: false
  postId: string | null
}

const initialState: InitialStateProps = {
  open: false,
  postId: null,
}

const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost(state, action) {
      state.open = action.payload.open
      state.postId = action.payload?.postId
    },
    resetPost: () => {
      return initialState
    },
  },
})

export const { setPost, resetPost } = PostSlice.actions

export const selectPost = (state: RootState) => state.post

export default PostSlice.reducer
