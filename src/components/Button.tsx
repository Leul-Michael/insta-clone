import Spinner from "./Spinner"

interface ButtonProps {
  canSave: boolean
  loading: boolean
  text: string
  classN?: string
}

function Button({ canSave, loading, text, classN = "login-btn" }: ButtonProps) {
  return (
    <button disabled={!canSave || loading} type="submit" className={classN}>
      {loading ? (
        <>
          <span className="btn-spinner-span">
            <Spinner />
          </span>
        </>
      ) : (
        `${text}`
      )}
    </button>
  )
}

export default Button
