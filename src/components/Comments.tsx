import { UserType } from "../pages/Home/Home"
import viewpostStyles from "../styles/Viewpost.module.css"

interface CommentProps {
  id: string
  user: UserType
  comment: string
  likes: Partial<UserType>[]
}

interface CommentsProps {
  comments: CommentProps[]
}

function Comment({ comment }: { comment: CommentProps }) {
  return (
    <div className={viewpostStyles.comment}>
      <div className={`user-profile ${viewpostStyles["comment-profile"]}`}>
        <div className="profile-circle">{comment.user.username.charAt(0)}</div>
        <p className="user-name">{comment?.user.username}</p>
      </div>
      <p className={viewpostStyles["comment-c"]}>{comment?.comment}</p>
    </div>
  )
}

function Comments({ comments }: CommentsProps) {
  return (
    <div className={viewpostStyles.comments}>
      {comments?.length > 0 ? (
        comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <p className={viewpostStyles["comment-c"]}>No comments</p>
      )}
    </div>
  )
}

export default Comments
