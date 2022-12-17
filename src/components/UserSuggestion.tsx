import { useMutation, useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { GET_SUGGESTIONS, GET_USER } from "../api/queries/userQueries"
import { UserType } from "../pages/Home/Home"
import postStyles from "../styles/Post.module.css"
import Spinner from "./Spinner"
import { MouseEvent } from "react"
import { FOLLOW_USER } from "../api/mutations/userMutations"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/AuthSlice"

function User({ user }: { user: UserType }) {
  const [followUser, { loading }] = useMutation(FOLLOW_USER)
  const currentUserId = useSelector(selectCurrentUser)

  const handleFollowUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await followUser({
      variables: { userId: user.id },
      refetchQueries: [{ query: GET_USER, variables: { userId: user.id } }],
    })
  }

  const isFollowing = user.followers?.some((u) => {
    return u.id === currentUserId
  })

  return (
    <article className={postStyles["user-excerpt"]}>
      <Link to={`/account/${user.id}`} className={`user-profile `}>
        <div className={`profile-circle`}>{user.username.charAt(0)}</div>
        <p>{user.username}</p>
      </Link>
      <button
        disabled={loading}
        onClick={handleFollowUser}
        className={`btn-light ${isFollowing ? "danger" : "btn-primary"}`}
      >
        {isFollowing ? "Unfollow" : "Follow"}
      </button>
    </article>
  )
}

function UserSuggestion() {
  const { data, loading } = useQuery(GET_SUGGESTIONS)

  let content
  if (loading) {
    return <Spinner />
  } else if (data?.userSuggestions.length > 0) {
    content = data.userSuggestions.map((user: UserType) => (
      <User key={user.id} user={user} />
    ))
  } else {
    content = <p>No suggestions found</p>
  }

  return <div className={postStyles.user}>{content}</div>
}

export default UserSuggestion
