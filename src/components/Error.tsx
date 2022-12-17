interface ErrorProps {
  errorMsg: string
}

function Error({ errorMsg = "Oops! Error Occured. Try again!" }: ErrorProps) {
  return (
    <article className="error">
      <p>{errorMsg}</p>
    </article>
  )
}

export default Error
