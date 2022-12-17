import { ChangeEvent, FormEvent, useState, useRef, useEffect } from "react"
import app from "../configs/firebase"
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { useDispatch, useSelector } from "react-redux"
import {
  selectAddPost,
  setAddPostModal,
  setConfirmModal,
} from "../features/ModalSlice"
import {
  CONFIRM,
  resetDiscard,
  selectConfrim,
  setDiscardType,
} from "../features/ConfirmSlice"
import { setMsg } from "../features/MessageSlice"
import Spinner from "./Spinner"
import useAddPost from "../api/useAddPost"

export default function AddPostModal() {
  const storage = getStorage(app)
  const dispatch = useDispatch()

  const openAddPostModal = useSelector(selectAddPost)
  const { confirmed, type } = useSelector(selectConfrim)

  const imgRef = useRef<HTMLImageElement>(null)

  const [caption, setCaption] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [picture, setPicture] = useState<File | null>(null)

  const [addPost, loading, error] = useAddPost()

  function displayImg(e: ChangeEvent<HTMLInputElement>) {
    if (imgRef.current !== null && e.target.files !== null) {
      const fileSizeInKb = Math.round(e.target.files[0].size / 1024)

      if (fileSizeInKb > 200) {
        dispatch(setMsg("Image too Big, Please select file less than 200kb"))
      } else {
        imgRef.current.src = URL.createObjectURL(e.target?.files[0])
        setPicture(e.target?.files[0])
      }
      e.target.value = ""
    }
  }

  function resetState(): void {
    setCaption("")
    if (imgRef.current?.src != null) {
      imgRef.current.src = "/imgs/picture-icon.png"
    }
    setPicture(null)
  }

  async function createPost(e: FormEvent) {
    e.preventDefault()
    if (!picture) throw new Error("Image is required!")
    const storageRef = ref(storage, `pictures/${picture.name}`)
    const uploadTask = uploadBytesResumable(storageRef, picture, {
      contentType: picture.type,
    })
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsLoading(true)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        if (progress === 100) {
          console.log("Upload is " + progress + "% done")
        }
      },
      (e) => {
        console.error(e)
        setIsLoading(false)
        return
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            await addPost({
              variables: { caption, picture: downloadURL },
            })
            dispatch(setMsg("Post added successfully!"))
            dispatch(setAddPostModal(false))
            resetState()
          } catch (e: any) {
            console.log(e.message)
            dispatch(setMsg(e.message || error?.message))
          } finally {
            setIsLoading(false)
          }
        })
      }
    )
  }

  useEffect(() => {
    if (confirmed && type === CONFIRM.DISCARD) {
      resetState()
      dispatch(resetDiscard())
      dispatch(setAddPostModal(false))
    }
  }, [confirmed])

  function confirmCloseModal() {
    if (picture || caption) {
      dispatch(setConfirmModal(true))
      dispatch(setDiscardType({ type: CONFIRM.DISCARD, confirmed: false }))
    } else {
      dispatch(setAddPostModal(false))
    }
  }

  const canSave = [caption, picture].every(Boolean)

  let content

  if (loading || isLoading) {
    content = <Spinner />
  } else {
    content = (
      <>
        <div className="image-input-box input-box">
          <img
            ref={imgRef}
            src="/imgs/picture-icon.png"
            alt=""
            className="display-img"
          />
          <input
            type="file"
            name="picture"
            onChange={(e) => displayImg(e)}
            id="picture"
            accept="image/*"
          />
          <label htmlFor="picture"></label>
        </div>
        <div className="caption-input-box input-box">
          <label htmlFor="caption">Write a caption</label>
          <textarea
            name="caption"
            id="caption"
            placeholder="Caption..."
            maxLength={250}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
          <p
            className={`caption-length ${
              caption.length === 250 ? "clr-accent" : ""
            }`}
          >
            {caption.length} <span className="clr-accent">/ 250</span>
          </p>
        </div>
        <button
          disabled={!canSave || loading || isLoading}
          className="btn-light btn-modal"
        >
          Share
        </button>
      </>
    )
  }

  return (
    <section className={`modal ${openAddPostModal ? "view" : ""}`}>
      <button
        className="close-modal"
        onClick={confirmCloseModal}
        disabled={isLoading || loading}
      >
        &times;
      </button>
      <main className="modal-body">
        <div className="modal-header">Create new post</div>
        <form className="modal-form" onSubmit={createPost}>
          {content}
        </form>
      </main>
    </section>
  )
}
