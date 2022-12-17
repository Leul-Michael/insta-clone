import React from "react"
import { getStorage, ref, deleteObject } from "firebase/storage"
import app from "../configs/firebase"

function useDeleteImage(img: string) {
  const storage = getStorage(app)

  const imgRef = ref(storage, img)
  return deleteObject(imgRef)
}

export default useDeleteImage
