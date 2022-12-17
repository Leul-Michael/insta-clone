import { useEffect, useRef } from "react"
import { useLazyQuery } from "@apollo/client"
import { useDispatch, useSelector } from "react-redux"
import { GET_POST } from "../api/queries/postQueries"
import { resetPost, selectPost } from "../features/PostSlice"
import viewpostStyles from "../styles/Viewpost.module.css"
import Spinner from "./Spinner"
import Comments from "./Comments"
import AddComment from "./AddComment"
import Likes from "./Likes"
import ViewPostButtons from "./ViewPostButtons"
import { CONFIRM, resetDiscard, selectConfrim } from "../features/ConfirmSlice"
import useRemovePost from "../api/useRemovePost"
import { setMsg } from "../features/MessageSlice"
import useDeleteImage from "../hooks/useDeleteImage"

export default function ViewPostModal() {
  const dispatch = useDispatch()
  const { confirmed, type } = useSelector(selectConfrim)
  const { open, postId } = useSelector(selectPost)
  const effectRun = useRef(false)

  const [removePost, isLoading] = useRemovePost()

  const [getPost, { data, error, loading }] = useLazyQuery(GET_POST)

  const deletePost = async () => {
    try {
      await removePost({ variables: { id: postId } })
      dispatch(resetDiscard())
    } catch (e: any) {
      dispatch(setMsg(e.message))
    } finally {
      dispatch(resetPost())
    }
  }

  useEffect(() => {
    if (effectRun.current === true) {
      const selectedPost = async () => {
        await getPost({
          variables: { id: postId },
        })
      }

      postId && selectedPost()
    }
    return () => {
      effectRun.current = true
    }
  }, [postId])

  useEffect(() => {
    if (confirmed && type === CONFIRM.DELETE) {
      useDeleteImage(data?.userPost?.picture)
        .then(() => {
          deletePost()
        })
        .catch((e) => {
          console.log(e)
          dispatch(setMsg("Couldn't delete post, try again!"))
        })
    }
  }, [confirmed])

  let content
  if (loading || isLoading) {
    content = <Spinner />
  } else if (error) {
    content = (
      <>
        <p>{error.message}</p>
        <h2>Oops! Something went wrong.</h2>
      </>
    )
  } else {
    content = (
      <>
        <div className={viewpostStyles["view-post__img"]}>
          <img src={data?.userPost?.picture} alt="post image" />
        </div>
        <div className={viewpostStyles["view-post__content"]}>
          <header className={viewpostStyles.header}>
            <div className={`user-profile`}>
              <div className="profile-circle">
                {data?.userPost?.user.username.charAt(0)}
              </div>
              <p className="user-name">{data?.userPost?.user.username}</p>
            </div>
            <ViewPostButtons
              postUser={data?.userPost?.user?.id}
              loading={isLoading}
            />
          </header>
          <div className={`${viewpostStyles["view-post__caption"]}`}>
            <p>{data?.userPost?.caption}</p>
          </div>
          <Comments comments={data?.userPost?.comments} />
          <Likes likes={data?.userPost?.likes} postId={data?.userPost?.id} />
          <AddComment
            classN={viewpostStyles["no-mobile"]}
            postId={data?.userPost?.id}
          />
        </div>
      </>
    )
  }

  return (
    <article className={`modal ${open ? "view" : ""}`}>
      <button onClick={() => dispatch(resetPost())} className="close-modal">
        &times;
      </button>
      <div className={viewpostStyles["view-post-modal"]}>{content}</div>
    </article>
  )
}
