import { MouseEvent } from "react"

function Unauthorised() {
  function reload(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    window.location.reload()
  }
  return (
    <section className="unauthorised">
      <div className="content">
        <h1>401, Unauthorized!</h1>
        <p>
          You're probably attempting to access unauthorized page, pleasse
          refresh the page or login again.
        </p>
        <div className="button-flex">
          <button onClick={(e) => reload(e)} className="btn btn-outline">
            Refresh
          </button>
          <button className="btn">Sign in</button>
        </div>
      </div>
    </section>
  )
}

export default Unauthorised
