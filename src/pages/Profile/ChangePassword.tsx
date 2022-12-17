import { useMutation } from "@apollo/client"
import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { CHANGE_PWD } from "../../api/mutations/userMutations"
import { setMsg } from "../../features/MessageSlice"
import profileStyles from "../../styles/Profile.module.css"

interface FormDataProps {
  oldPwd: string
  newPwd: string
  confirmPwd: string
}

function ChangePassword() {
  const dispatch = useDispatch()
  const [formData, setFormdata] = useState<FormDataProps>({
    oldPwd: "",
    newPwd: "",
    confirmPwd: "",
  })

  const [changePassword, { loading, error }] = useMutation(CHANGE_PWD)

  const { oldPwd, newPwd, confirmPwd } = formData

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (newPwd.length < 6) {
      return dispatch(setMsg("Password must be greater than 6 characters!"))
    }

    if (newPwd !== confirmPwd) {
      return dispatch(setMsg("Passwords do not match!"))
    }

    try {
      await changePassword({ variables: { password: oldPwd, newPwd } })
      dispatch(setMsg("Update Successful!"))
      setFormdata({
        oldPwd: "",
        newPwd: "",
        confirmPwd: "",
      })
    } catch (e: any) {
      dispatch(setMsg(e.message || error?.message))
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className={profileStyles["pwd-grid"]}>
      <div className={profileStyles["edit-input-box"]}>
        <label htmlFor="oldPwd">Old password</label>
        <input
          type="password"
          name="oldPwd"
          id="oldPwd"
          value={oldPwd}
          onChange={handleChange}
        />
      </div>
      <div className={profileStyles["edit-input-box"]}>
        <label htmlFor="newPwd">New password</label>
        <input
          type="password"
          name="newPwd"
          id="newPwd"
          value={newPwd}
          onChange={handleChange}
        />
      </div>
      <div className={profileStyles["edit-input-box"]}>
        <label htmlFor="confirmPwd">Confirm new password</label>
        <input
          type="password"
          name="confirmPwd"
          id="confirmPwd"
          value={confirmPwd}
          onChange={handleChange}
        />
      </div>
      <div className={profileStyles["edit-input-box"]}>
        <label></label>
        <button disabled={loading} className="btn-light btn-primary">
          Change password
        </button>
      </div>
    </form>
  )
}

export default ChangePassword
