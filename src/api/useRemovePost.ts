import { useMutation } from "@apollo/client"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/AuthSlice"
import { PostType } from "../pages/Home/Home"
import { REMOVE_POST } from "./mutations/postMutation"
import { GET_POSTS, GET_USER_POSTS } from "./queries/postQueries"

export default function useRemovePost() {
  const currentUserId = useSelector(selectCurrentUser)
  const [removePost, { loading, error }] = useMutation(REMOVE_POST, {
    refetchQueries: [
      { query: GET_USER_POSTS, variables: { id: currentUserId } },
    ],
    update(cache, { data: { removePost } }) {
      let res = cache.readQuery<any>({ query: GET_POSTS })
      if (!res) return
      let { posts } = res
      cache.writeQuery({
        query: GET_POSTS,
        data: {
          posts: posts.filter((post: PostType) => post.id !== removePost.id),
        },
      })
    },
  })

  return [removePost, loading, error] as [
    typeof removePost,
    typeof loading,
    typeof error
  ]
}
