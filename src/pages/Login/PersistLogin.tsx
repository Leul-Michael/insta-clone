import { useApolloClient } from "@apollo/client"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import useRefreshToken from "../../api/useRefreshToken"
import Spinner from "../../components/Spinner"
import {
  logOutReset,
  selectCurrentToken,
  setCredential,
} from "../../features/AuthSlice"
import { setMsg } from "../../features/MessageSlice"
import useLocalStorage from "../../hooks/useLocalStorage"

function PersistLogin() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const refresh = useRefreshToken()
  const client = useApolloClient()
  const [toggle] = useLocalStorage("persist", false)
  const token = useSelector(selectCurrentToken)

  const [loading, setloading] = useState<boolean>(false)

  useEffect(() => {
    const refreshToken = async () => {
      try {
        setloading(true)
        const { token, id } = await refresh()

        if (!token) {
          throw new Error("Unauthorized, Please Login again!")
        }
        dispatch(setCredential({ token, id }))
      } catch (e: any) {
        dispatch(setMsg(e.message))
        dispatch(logOutReset())
        localStorage.removeItem("persist")
        await client.clearStore()
        navigate("/login", { replace: true })
      } finally {
        setloading(false)
      }
    }

    if (!token && toggle) {
      refreshToken()
    } else if (!toggle && !token) {
      dispatch(setMsg("Please, Login back again."))
      dispatch(logOutReset())
      localStorage.removeItem("persist")
      navigate("/login", { state: { from: location } })
    }
  }, [])

  return loading ? <Spinner /> : <Outlet />
}

export default PersistLogin
