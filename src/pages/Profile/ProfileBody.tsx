import { MouseEvent, useEffect } from "react"
import { useLazyQuery, useQuery } from "@apollo/client"
import { GET_USER_POSTS } from "../../api/queries/postQueries"
import Spinner from "../../components/Spinner"
import profileStyles from "../../styles/Profile.module.css"
import { PostType } from "../Home/Home"
import { useDispatch } from "react-redux"
import { setPost } from "../../features/PostSlice"

interface ProfileProps {
  userId: string
}

function ProfileBody({ userId }: ProfileProps) {
  const dispatch = useDispatch()
  const [userPosts, { data, loading }] = useLazyQuery(GET_USER_POSTS, {
    variables: { id: userId },
  })

  useEffect(() => {
    const getUserPosts = async () => {
      await userPosts()
    }

    userId && getUserPosts()
  }, [userId])

  if (loading) {
    return (
      <div className={profileStyles["profile-body"]}>
        <Spinner />
      </div>
    )
  }

  const openPost = (e: MouseEvent<HTMLDivElement>, postId: string) => {
    e.preventDefault()
    dispatch(setPost({ open: true, postId }))
  }

  return (
    <div className={profileStyles["profile-body"]}>
      <h2>
        Posts <span>{data?.userPosts?.length}</span>
      </h2>
      <div className={profileStyles["profile-posts"]}>
        {data?.userPosts?.map((post: PostType) => (
          <div
            onClick={(e) => openPost(e, post.id)}
            key={post.id}
            className={profileStyles["profile-post"]}
          >
            <img src={post.picture} alt="post" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileBody
