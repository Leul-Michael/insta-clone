import postStyles from "../styles/Post.module.css"

function LastPost() {
  return (
    <article
      className={`${postStyles["post-excerpt"]} ${postStyles["last-post"]}`}
    >
      <div className={postStyles["post-body"]}>
        <img
          className={postStyles["last-post-icon"]}
          src="/imgs/refresh.png"
          alt="cirle arrow correct"
        />
        <p className={postStyles["text-md"]}>You're all cought up!</p>
        <p className={postStyles["text-sm"]}>
          Start following new people for more feeds.
        </p>
      </div>
    </article>
  )
}

export default LastPost
