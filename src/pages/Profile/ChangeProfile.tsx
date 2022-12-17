import { useMutation } from "@apollo/client"
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { UPDATE_PROFILE } from "../../api/mutations/userMutations"
import { GET_USER } from "../../api/queries/userQueries"
import { setMsg } from "../../features/MessageSlice"
import profileStyles from "../../styles/Profile.module.css"
import { UserType } from "../Home/Home"
import { validateEmail } from "../Login/Login"

interface FormDataProps {
  name: string
  email: string
  username: string
}

function ChangeProfile({ user }: { user: UserType }) {
  const dispatch = useDispatch()
  const [updateProfile, { error, loading }] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_USER, variables: { userId: user?.id } }],
  })

  const [formData, setFormdata] = useState<FormDataProps>({
    name: user?.name || "",
    email: user?.email || "",
    username: user?.username || "",
  })

  const { name, email, username } = formData

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      return dispatch(setMsg("Please input valid email!"))
    }

    if (username.length < 3) {
      return dispatch(setMsg("Username must be greater than 3 characters."))
    }

    try {
      await updateProfile({ variables: { name, username, email } })
      dispatch(setMsg("Update Successful!"))
    } catch (e: any) {
      dispatch(setMsg(e.message || error?.message))
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className={profileStyles["pwd-grid"]}>
      <div className={profileStyles["edit-input-box"]}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div className={profileStyles["edit-input-box"]}>
        <label htmlFor="username">Username</label>
        <div className={profileStyles["input-box"]}>
          <input
            type="text"
            name="username"
            value={username}
            id="username"
            onChange={handleChange}
          />
          <p>
            In most cases, you'll be able to change your username back to leu_ll
            for another 14 days. lol.
          </p>
        </div>
      </div>
      <div className={profileStyles["edit-input-box"]}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className={profileStyles["edit-input-box"]}>
        <label htmlFor="website">Website</label>
        <div className={profileStyles["input-box"]}>
          <input disabled type="text" name="website" id="website" />
          <p>Editing your links is only available on mobile. blah blah...</p>
        </div>
      </div>
      <div className={profileStyles["edit-input-box"]}>
        <label></label>
        <button disabled={loading} className="btn-light btn-primary">
          Save changes
        </button>
      </div>
    </form>
  )
}

export default ChangeProfile
