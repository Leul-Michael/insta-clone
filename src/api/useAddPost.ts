import { useMutation } from "@apollo/client"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/AuthSlice"
import { ADD_USER_POST } from "./mutations/postMutation"
import { GET_POSTS, GET_USER_POSTS } from "./queries/postQueries"

export default function useAddPost() {
  const currentUserId = useSelector(selectCurrentUser)

  const [addPost, { error, loading }] = useMutation(ADD_USER_POST, {
    refetchQueries: [
      { query: GET_USER_POSTS, variables: { id: currentUserId } },
    ],
    update(cache, { data: { addPost } }) {
      let res = cache.readQuery<any>({ query: GET_POSTS })
      if (!res) return
      let { posts } = res
      cache.writeQuery({
        query: GET_POSTS,
        data: {
          posts: posts.concat([addPost]),
        },
      })
    },
  })

  return [addPost, loading, error] as [
    typeof addPost,
    typeof loading,
    typeof error
  ]
}
