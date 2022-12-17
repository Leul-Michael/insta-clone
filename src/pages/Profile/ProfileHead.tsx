import profileStyles from "../../styles/Profile.module.css"
import { FiInstagram } from "react-icons/fi"
import { UserType } from "../Home/Home"
import { MouseEvent } from "react"
import { useMutation } from "@apollo/client"
import { FOLLOW_USER } from "../../api/mutations/userMutations"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../features/AuthSlice"
import { GET_USER } from "../../api/queries/userQueries"
import { useMemo } from "react"
import { Link } from "react-router-dom"

function ProfileHead({
  user,
  isCurrentUser,
}: {
  user: UserType
  isCurrentUser: boolean
}) {
  const currentUserId = useSelector(selectCurrentUser)
  const [followUser, { loading }] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: GET_USER, variables: { userId: user.id } }],
  })

  const handleFollowUser = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await followUser({ variables: { userId: user.id } })
  }

  const isFollowing = user.followers?.some((u) => {
    return u.id === currentUserId
  })

  return (
    <div className={profileStyles["profile-header"]}>
      <div className={profileStyles["profile-img-container"]}>
        <div className={profileStyles["profile-circle"]}>
          {user.username.charAt(0)}
        </div>
      </div>
      <div className={profileStyles["profile-desc"]}>
        <div className={profileStyles["profile-desc__head"]}>
          <h1>{user?.username}</h1>
          <div className={profileStyles["profile-desc__head-btns"]}>
            {isCurrentUser ? (
              <Link to="/account/edit" className="btn-light" type="button">
                Edit Profile
              </Link>
            ) : (
              <>
                <button
                  onClick={handleFollowUser}
                  className={`btn-light ${
                    isFollowing ? "danger" : "btn-primary"
                  }`}
                  type="button"
                  disabled={loading}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
                <button className="btn-light">Message</button>
              </>
            )}
          </div>
        </div>
        <div className={profileStyles["profile-desc__status"]}>
          <div className={profileStyles["desc-card"]}>
            {user.followers?.length} <span>followers</span>
          </div>
          <div className={profileStyles["desc-card"]}>
            {user.following?.length} <span>following</span>
          </div>
        </div>
        <div className={profileStyles["profile-desc__bio"]}>
          <h1>{user.name}</h1>
          <p className={profileStyles.bio}>Full stack software developer</p>
          <div className={profileStyles["desc-group"]}>
            <p className={profileStyles["bio-light"]}>Enquiries? DM me</p>
            <a
              className={profileStyles.link}
              href="https://www.instagram.com/leu_ll/"
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram />
            </a>
          </div>
          <div className={profileStyles["desc-group"]}>
            <p className={profileStyles["bio-light"]}>Website: </p>
            <a
              className={profileStyles.link}
              href="https://leul-michael.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              leul-michael.netlify.app/
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHead
