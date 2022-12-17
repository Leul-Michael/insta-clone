import { PostType } from "../pages/Home/Home"
import { AiOutlineEllipsis } from "react-icons/ai"
import TimeAgo from "./TimeAgo"

import postStyles from "../styles/Post.module.css"
import AddComment from "./AddComment"
import Dropdown, { DirectionType } from "./Dropdown"
import PostComments from "./PostComments"
import { Link } from "react-router-dom"
import Likes from "./Likes"

type PostProps = {
  post: PostType
}

function PostExcerpt({ post }: PostProps) {
  const POST_OPTIONS = [
    { key: 1, value: "follow" },
    { key: 2, value: "cancel" },
  ]
  return (
    <article className={postStyles["post-excerpt"]}>
      <header className={postStyles.header}>
        <Link
          to={`/account/${post.user.id}`}
          className={`user-profile ${postStyles.pd}  ${postStyles.profile}`}
        >
          <div className="profile-circle">{post.user.username.charAt(0)}</div>
          <p className="user-name">{post.user.username}</p>
        </Link>
        <Dropdown
          icon={<AiOutlineEllipsis />}
          options={POST_OPTIONS}
          direction={DirectionType.TO_BOTTOM}
        />
      </header>
      <div className={postStyles["post-body"]}>
        <div className={postStyles["post-img"]}>
          <img src={post.picture} alt="post image" />
        </div>
        <Likes postId={post.id} likes={post.likes} />
        <div className={`post-caption ${postStyles.pb}`}>
          <p>{post.caption}</p>
        </div>
        <PostComments comments={post.comments} postId={post.id} />
        <TimeAgo timestamp={post.createdAt} />
        <AddComment postId={post.id} />
      </div>
    </article>
  )
}

export default PostExcerpt
