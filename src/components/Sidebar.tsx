import { Link, useNavigate } from "react-router-dom"
import Logo from "./Logo"

import {
  AiOutlineHome,
  AiOutlineMenu,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineLogout,
  AiFillSetting,
} from "react-icons/ai"
import { MdNotificationsNone } from "react-icons/md"
import { BiAddToQueue, BiUserCircle } from "react-icons/bi"
import { setAddPostModal } from "../features/ModalSlice"
import { useDispatch, useSelector } from "react-redux"
import { logOutReset, selectCurrentUser } from "../features/AuthSlice"
import { setMsg } from "../features/MessageSlice"
import { useApolloClient } from "@apollo/client"
import useLogout from "../api/useLogout"
import Dropdown, { DirectionType } from "./Dropdown"
import { useCallback } from "react"

function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const client = useApolloClient()
  const currentUser = useSelector(selectCurrentUser)

  const logout = useLogout()

  const signOut = useCallback(async () => {
    logout()
      .then(async () => {
        dispatch(logOutReset())
        localStorage.removeItem("persist")
        await client.clearStore()
        dispatch(setMsg("Logout successful!"))
        navigate("/login", { replace: true })
      })
      .catch((e) => {
        dispatch(setMsg(e.message))
      })
  }, [])

  const MAIN_MENU_OPTIONS = [
    { key: 1, value: "Setting", icon: <AiFillSetting /> },
    { key: 2, value: "Logout", action: signOut, icon: <AiOutlineLogout /> },
  ]

  return (
    <aside className="sidebar">
      <Logo classN="no-border" />
      <nav className="sidebar-links">
        <Link to="/" className="sidebar-link">
          <div className="icon">
            <AiOutlineHome />
          </div>
          <span>Home</span>
        </Link>
        <Link to="/" className="sidebar-link">
          <div className="icon">
            <AiOutlineSearch />
          </div>
          <span>Search</span>
        </Link>
        <Link to="/" className="sidebar-link">
          <div className="icon">
            <MdNotificationsNone />
          </div>
          <span>Notifications</span>
        </Link>
        <button
          onClick={() => dispatch(setAddPostModal(true))}
          className="sidebar-link"
        >
          <div className="icon">
            <BiAddToQueue />
          </div>
          <span>Create</span>
        </button>
        <Link to="/" className="sidebar-link">
          <div className="icon">
            <AiOutlineMessage />
          </div>
          <span>Messages</span>
        </Link>
        <Link to={`/account/${currentUser}`} className="sidebar-link">
          <div className="icon">
            <BiUserCircle />
          </div>
          <span>Profile</span>
        </Link>
        <button onClick={signOut} className="sidebar-mobile sidebar-link">
          <div className="icon">
            <AiOutlineLogout />
          </div>
          <span>Logout</span>
        </button>
      </nav>
      <div className="sidebar-no-mobile">
        <Dropdown
          main="Menu"
          options={MAIN_MENU_OPTIONS}
          icon={<AiOutlineMenu />}
          direction={DirectionType.TO_TOP}
        />
      </div>
    </aside>
  )
}

export default Sidebar
