import { useState } from "react"

import loginStyles from "../../styles/Login.module.css"
import inputStyles from "../../styles/Input.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import useLocalStorage from "../../hooks/useLocalStorage"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentToken, setCredential } from "../../features/AuthSlice"
import Button from "../../components/Button"
import { setMsg } from "../../features/MessageSlice"
import useLogin from "../../api/useLogin"
import { useApolloClient } from "@apollo/client"

export const validateEmail = (inputEmail: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(inputEmail)) {
    return true
  }
  return false
}

function Login() {
  const client = useApolloClient()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"

  const token = useSelector(selectCurrentToken)

  const [loading, setloading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [toggle, setToggle] = useLocalStorage("persist", false)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const login = useLogin()

  const canSave = [email, password].every(Boolean)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      dispatch(setMsg("Please input valid email!"))
      return
    }

    try {
      setloading(true)
      client.clearStore()
      const { token, id } = await login(email, password)

      dispatch(setCredential({ token, id }))
      setEmail("")
      setPassword("")
      navigate(from, { replace: true })
    } catch (e: any) {
      dispatch(setMsg(e.message))
    } finally {
      setloading(false)
    }
  }

  return (
    <div className={loginStyles["login-container"]}>
      <form
        onSubmit={handleLogin}
        autoComplete="off"
        className={loginStyles["login-form"]}
      >
        <h2 className={loginStyles.title}>
          Sign in to see photos of your friends!
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
        </div>
        <div className={inputStyles.checkbox}>
          <input
            type="checkbox"
            id="trustDevice"
            checked={toggle}
            onChange={(e) => setToggle(e.target.checked)}
          />
          <label htmlFor="trustDevice">Trust this device</label>
        </div>
        <p className={inputStyles.msg}>
          This will let your account to persist on refresh, and you'll be
          agreeing to our terms which you will not read...{" "}
        </p>
        <Button canSave={canSave} loading={loading} text="Sign in" />
      </form>
    </div>
  )
}

export default Login
