import { Link } from "react-router-dom"
import loginStyles from "../../styles/Login.module.css"

function Footer({ path }: { path: string }) {
  return (
    <div className={loginStyles["logo-container"] + " " + loginStyles.footer}>
      {path === "/login" ? (
        <p className={loginStyles.text}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      ) : (
        <p className={loginStyles.text}>
          Have an account? <Link to="/login">Login</Link>
        </p>
      )}
    </div>
  )
}

export default Footer
