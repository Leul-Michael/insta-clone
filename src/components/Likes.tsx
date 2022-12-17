import { useMutation } from "@apollo/client"
import { MouseEvent } from "react"
import { BiMessageRounded } from "react-icons/bi"
import { AiTwotoneHeart, AiFillHeart } from "react-icons/ai"
import { useSelector } from "react-redux"
import { LIKE_POST } from "../api/mutations/postMutation"
import { selectCurrentUser } from "../features/AuthSlice"
import { UserType } from "../pages/Home/Home"
import viewpostStyles from "../styles/Viewpost.module.css"

function Likes({ likes, postId }: { likes: UserType[]; postId: string }) {
  const [likePost, { loading }] = useMutation(LIKE_POST)

  const currentUserId = useSelector(selectCurrentUser)

  const isLiked = likes?.some((like) => {
    return like.id === currentUserId
  })

  const handleLikePost = async (e: MouseEvent<HTMLButtonElement>) => {
    await likePost({ variables: { id: postId, user: currentUserId } })
  }

  let likedBy
  if (likes?.length > 0) {
    if (likes.length === 1) {
      likedBy = (
        <p>
          Liked by <b>{likes[0]?.username}</b>
        </p>
      )
    } else if (likes.length === 2) {
      likedBy = (
        <p>
          Liked by <b>{likes[0]?.username}</b> and 1 other
        </p>
      )
    } else {
      likedBy = (
        <p>
          Liked by <b>{likes[0]?.username}</b> and {likes?.length} others
        </p>
      )
    }
  } else {
    likedBy = <p>0 likes</p>
  }

  return (
    <div className={viewpostStyles.likes}>
      <div className={`${viewpostStyles["post-reactions"]}`}>
        <button
          onClick={(e) => handleLikePost(e)}
          className={`${viewpostStyles["like-icon"]} like-icon icon 
          `}
          disabled={loading}
        >
          <AiFillHeart className={`${isLiked ? "liked" : ""}`} />
        </button>
        <button className="comment-icon icon">
          <BiMessageRounded />
        </button>
      </div>
      {likedBy}
    </div>
  )
}

export default Likes
