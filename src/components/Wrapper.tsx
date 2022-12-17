import { lazy } from "react"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

const AddPostModal = lazy(() => import("./AddPostModal"))
const Confirmation = lazy(() => import("./Confirmation"))
const ViewPostModal = lazy(() => import("./ViewPostModal"))

function Wrapper() {
  return (
    <>
      <Confirmation />
      <AddPostModal />
      <ViewPostModal />
      <Sidebar />
      <Outlet />
    </>
  )
}

export default Wrapper
