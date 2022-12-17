import { useLocation } from "react-router-dom"
import Logo from "../../components/Logo"
import loginStyles from "../../styles/Login.module.css"
import Footer from "./Footer"
import Login from "./Login"
import Register from "./Register"

function Sign() {
  const location = useLocation()

  return (
    <section className={`${loginStyles.login} container m-5`}>
      <Logo />
      {location.pathname === "/login" ? <Login /> : <Register />}
      <Footer path={location.pathname} />
    </section>
  )
}

export default Sign
