import { CommentType } from "../pages/Home/Home"
import postStyles from "../styles/Post.module.css"
import { useMemo } from "react"
import { setPost } from "../features/PostSlice"
import { useDispatch } from "react-redux"

interface PostCommentProps {
  comments: CommentType[]
  postId: string
}

function PostComments({ comments, postId }: PostCommentProps) {
  const dispatch = useDispatch()

  const randomSortedCommnets = useMemo(
    () => [...comments]?.sort(() => 0.5 - Math.random()).slice(0, 3),
    [comments]
  )

  let content
  if (comments.length <= 3) {
    content = comments?.map((c) => (
      <div className={postStyles.comment} key={c.id}>
        <p className={postStyles.commenter}>{c?.user.username}</p>
        <p>{c?.comment}</p>
      </div>
    ))
  } else {
    content = randomSortedCommnets?.map((c) => (
      <div className={postStyles.comment} key={c.id}>
        <p className={postStyles.commenter}>{c?.user.username}</p>
        <p>{c?.comment}</p>
      </div>
    ))
  }

  if (comments.length <= 0) {
    return null
  }

  return (
    <div className={`post-comments ${postStyles.pb}`}>
      {content}
      {comments.length > 3 ? (
        <button onClick={() => dispatch(setPost({ open: true, postId }))}>
          View all{" "}
          <span style={{ cursor: "pointer" }}>{comments.length} comments</span>
        </button>
      ) : null}
    </div>
  )
}

export default PostComments
