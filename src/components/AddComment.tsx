import { useMutation } from "@apollo/client"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { ADD_COMMENT } from "../api/mutations/postMutation"
import { setMsg } from "../features/MessageSlice"

interface AddCommentProps {
  classN?: string
  postId: string
}

function AddComment({ classN, postId }: AddCommentProps) {
  const dispatch = useDispatch()

  const [comment, setComment] = useState<string>("")
  const [commentPost, { loading }] = useMutation(ADD_COMMENT, {
    onCompleted: () => setComment(""),
    onError: (e) => dispatch(setMsg(e.message)),
    // update(cache, { data: { commentPost } }) {
    //   let { userPosts } = cache.readQuery<any>({ query: GET_USER_POSTS })
    //   cache.writeQuery({
    //     query: GET_USER_POSTS,
    //     data: { userPosts: userPosts.concat([commentPost]) },
    //   })
    // },
  })

  return (
    <div className={`comment-box ${classN}`}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button
        onClick={() => commentPost({ variables: { post: postId, comment } })}
        className="btn-modal"
        disabled={comment.length <= 0 || loading}
      >
        Post
      </button>
    </div>
  )
}

export default AddComment
