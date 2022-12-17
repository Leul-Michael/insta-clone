import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { removeMsg, selectMsg } from "../features/MessageSlice"
import Error from "./Error"

function ErrorContainer() {
  const msgs = useSelector(selectMsg)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (msgs.length) {
        dispatch(removeMsg())
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [msgs])

  return (
    <div className="error-container">
      {msgs.map((error, i) => (
        <Error key={i} errorMsg={error} />
      ))}
    </div>
  )
}

export default ErrorContainer
