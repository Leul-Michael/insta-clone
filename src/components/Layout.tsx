import { Outlet } from "react-router-dom"
import ErrorContainer from "./ErrorContainer"

function Layout() {
  return (
    <main className="main-layout">
      <ErrorContainer />
      <Outlet />
    </main>
  )
}

export default Layout
