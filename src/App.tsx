import { Routes, Route } from "react-router-dom"

import Sign from "./pages/Login/Sign"
import Home from "./pages/Home/Home"
import "./App.css"
import PersistLogin from "./pages/Login/PersistLogin"
import Layout from "./components/Layout"
import Unauthorised from "./components/Unauthorised"
import Profile from "./pages/Profile/Profile"
import Wrapper from "./components/Wrapper"
import EditProfile from "./pages/Profile/EditProfile"
import Search from "./pages/Search/Search"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Sign />} />
        <Route path="register" element={<Sign />} />
        <Route path="access-denied" element={<Unauthorised />} />

        <Route element={<PersistLogin />}>
          <Route element={<Wrapper />}>
            <Route index element={<Home />} />
            <Route path="account/edit" element={<EditProfile />} />
            <Route path="account/:userId" element={<Profile />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
