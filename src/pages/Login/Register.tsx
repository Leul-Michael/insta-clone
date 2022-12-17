import loginStyles from "../../styles/Login.module.css"
import inputStyles from "../../styles/Input.module.css"
import { useState, FormEvent } from "react"
import { useMutation } from "@apollo/client"
import { REGISTER_USER } from "../../api/mutations/userMutations"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { useDispatch } from "react-redux"
import { setMsg } from "../../features/MessageSlice"
import { validateEmail } from "./Login"

function Register() {
  const [register, { loading, error }] = useMutation(REGISTER_USER)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const canSave = [email, userName, name, password].every(Boolean)

  const signin = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      return dispatch(setMsg("Please input valid email!"))
    }

    if (userName.length < 3) {
      return dispatch(setMsg("Username must be greater than 3 characters."))
    }
    if (password.length < 6) {
      return dispatch(setMsg("Password must be greater than 6 characters."))
    }
    try {
      await register({
        variables: {
          username: userName,
          email,
          password,
          name,
        },
      })

      setEmail("")
      setPassword("")
      setName("")
      setUserName("")
      dispatch(setMsg("Registeration successful!, Login."))
      navigate("/login", { replace: true })
    } catch (e: any) {
      dispatch(setMsg(e.message))
    }
  }

  return (
    <div className={loginStyles["login-container"]}>
      <form
        onSubmit={signin}
        autoComplete="off"
        className={loginStyles["login-form"]}
      >
        <h2 className={loginStyles.title}>
          Sign up to see photos from your friends!
        </h2>
        <input type="hidden" autoComplete="false" />
        <div className={inputStyles["input-box"]}>
          <input
            type="text"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="email">Email </label>
        </div>
        <div className={inputStyles["input-box"]}>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">Name </label>
        </div>
        <div className={inputStyles["input-box"]}>
          <input
            type="text"
            name="userName"
            id="userName"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label htmlFor="userName">Username </label>
        </div>
        <div className={inputStyles["input-box"]}>
          <input
            type={`${!showPassword ? "password" : "text"}`}
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password </label>
          {password.length > 0 ? (
            <span
              className={inputStyles["show-pwd"]}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          ) : null}
        </div>{" "}
        <Button canSave={canSave} loading={loading} text="Sign up" />
      </form>
    </div>
  )
}

export default Register
