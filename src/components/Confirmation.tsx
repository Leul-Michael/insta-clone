import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  CONFIRM,
  selectConfrim,
  setDiscardType,
} from "../features/ConfirmSlice"
import { selectConfirmModal, setConfirmModal } from "../features/ModalSlice"

function Confirmation() {
  const dispatch = useDispatch()

  const openConfirmModal = useSelector(selectConfirmModal)
  const { type } = useSelector(selectConfrim)

  function confirmAction() {
    dispatch(setDiscardType({ confirmed: true }))
    dispatch(setConfirmModal(false))
  }

  return (
    <div
      tabIndex={0}
      onBlur={() => dispatch(setConfirmModal(false))}
      className={`${openConfirmModal ? "show" : ""} confirmation`}
    >
      <div className="text-flex">
        <h3>{type} post?</h3>
        {type === CONFIRM.DISCARD && (
          <p>If you leave, your edits won't be saved.</p>
        )}
      </div>

      <div className="f-col-buttons">
        <button onClick={confirmAction}>{type}</button>
        <button onClick={() => dispatch(setConfirmModal(false))}>Cancel</button>
      </div>
    </div>
  )
}

export default Confirmation
