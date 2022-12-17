import { useQuery } from "@apollo/client"
import { useState } from "react"
import { AiOutlineStop } from "react-icons/ai"
import { MdPassword } from "react-icons/md"
import { RiProfileLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { GET_USER } from "../../api/queries/userQueries"
import Spinner from "../../components/Spinner"
import { selectCurrentUser } from "../../features/AuthSlice"
import profileStyles from "../../styles/Profile.module.css"
import ChangePassword from "./ChangePassword"
import ChangeProfile from "./ChangeProfile"

function EditProfile() {
  const currentUser = useSelector(selectCurrentUser)
  const [selected, setSelected] = useState({
    profile: true,
    pwd: false,
    deactivate: false,
  })

  const { loading, data, error } = useQuery(GET_USER, {
    variables: { userId: currentUser },
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
  } else {
    content = (
      <>
        <ul className={profileStyles["edit-profile__links"]}>
          <li
            className={`${profileStyles["edit-profile__link"]} ${
              selected.profile ? profileStyles.active : null
            }`}
            onClick={() =>
              setSelected({ profile: true, pwd: false, deactivate: false })
            }
          >
            <span className={profileStyles.icon}>
              <RiProfileLine />
            </span>
            <span className={profileStyles.text}>Edit profile</span>
          </li>
          <li
            className={`${profileStyles["edit-profile__link"]} ${
              selected.pwd ? profileStyles.active : null
            }`}
            onClick={() =>
              setSelected({ profile: false, pwd: true, deactivate: false })
            }
          >
            <span className={profileStyles.icon}>
              <MdPassword />
            </span>
            <span className={profileStyles.text}>Change password</span>
          </li>
          <li
            className={`${profileStyles["edit-profile__link"]} ${
              selected.deactivate ? profileStyles.active : null
            }`}
            onClick={() =>
              setSelected({ profile: false, pwd: false, deactivate: true })
            }
          >
            <span className={profileStyles.icon}>
              <AiOutlineStop />
            </span>
            <span className={profileStyles.text}>Deactivate</span>
          </li>
        </ul>
        <div className={profileStyles["edit-profile__user"]}>
          {selected.profile && <ChangeProfile user={data?.getUser} />}
          {selected.pwd && <ChangePassword />}
        </div>
      </>
    )
  }
  return (
    <section className={profileStyles.container}>
      <div
        className={`${profileStyles["profile-content"]} ${profileStyles["edit-profile"]}`}
      >
        {content}
      </div>
    </section>
  )
}

export default EditProfile
