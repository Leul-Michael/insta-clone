import loginStyles from "../styles/Login.module.css"

interface LogoProps {
  classN?: string
}

function Logo({ classN }: LogoProps) {
  return (
    <div className={`${loginStyles["logo-container"]} ${classN}`}>
      <h1 className="logo">
        <span>S</span>haregr<span>a</span>m
      </h1>
    </div>
  )
}

export default Logo
