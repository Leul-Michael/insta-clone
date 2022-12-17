import { useNavigate, useParams } from "react-router-dom"
import profileStyles from "../../styles/Profile.module.css"
import ProfileHead from "./ProfileHead"
import ProfileBody from "./ProfileBody"
import { useQuery } from "@apollo/client"
import { GET_USER } from "../../api/queries/userQueries"
import Spinner from "../../components/Spinner"
import { useDispatch } from "react-redux"
import { setMsg } from "../../features/MessageSlice"
import useDetermineCurrentUser from "../../hooks/useDetermineCurrentUser"

function Profile() {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!userId) {
    dispatch(setMsg("No User Found!"))
    navigate("/", { replace: true })
    return null
  }

  const isCurrentUser = useDetermineCurrentUser(userId)

  const { loading, data, error } = useQuery(GET_USER, {
    variables: { userId },
  })

  let content
  if (loading) {
    content = <Spinner />
  } else if (error) {
    content = (
      <>
        <p>{error.message}</p>
        <h1>Oops! Something went wrong.</h1>
      </>
    )
  } else if (userId) {
    content = (
      <>
        <ProfileHead user={data?.getUser} isCurrentUser={isCurrentUser} />
        {userId !== null ? <ProfileBody userId={userId} /> : null}
      </>
    )
  } else {
    ;<>
      <p>Try refreshing the page.</p>
      <h1>Oops! Something went wrong.</h1>
    </>
  }

  return (
    <section className={profileStyles.container}>
      <div className={profileStyles["profile-content"]}>{content}</div>
    </section>
  )
}

export default Profile
