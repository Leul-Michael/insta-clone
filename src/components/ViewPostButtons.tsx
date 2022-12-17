import { MouseEvent } from "react"
import { useDispatch } from "react-redux"
import useDetermineCurrentUser from "../hooks/useDetermineCurrentUser"
import { setConfirmModal } from "../features/ModalSlice"
import { CONFIRM, setDiscardType } from "../features/ConfirmSlice"

function ViewPostButtons({
  postUser,
  loading,
}: {
  postUser: string
  loading: boolean
}) {
  const dispatch = useDispatch()
  let isCurrentUser = useDetermineCurrentUser(postUser)

  const removePost = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    dispatch(setDiscardType({ type: CONFIRM.DELETE }))
    dispatch(setConfirmModal(true))
  }

  return (
    <>
      {isCurrentUser ? (
        <div className="button-flex">
          <button className="btn-light" type="button">
            Edit
          </button>
          <button
            onClick={(e) => removePost(e)}
            className="btn-light danger"
            type="button"
            disabled={loading}
          >
            Delete
          </button>
        </div>
      ) : null}
    </>
  )
}

export default ViewPostButtons
