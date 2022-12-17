import { useQuery } from "@apollo/client"
import { GET_POSTS } from "../../api/queries/postQueries"
import LastPost from "../../components/LastPost"
import PostExcerpt from "../../components/PostExcerpt"
import Spinner from "../../components/Spinner"
import UserSuggestion from "../../components/UserSuggestion"

export type PostType = {
  id: string
  caption: string
  picture: string
  createdAt: string
  user: UserType
  comments: CommentType[]
  likes: []
}

export type UserType = {
  id: string
  username: string
  name?: string
  email?: string
  followers?: FollowerType[]
  following?: FollowerType[]
}

export type CommentType = {
  id: string
  user: UserType
  comment: string
}

interface FollowerType {
  id: string
  username?: string
}

function Home() {
  const { data, loading, error } = useQuery(GET_POSTS)

  let content

  if (loading) {
    content = <Spinner />
  } else if (data?.posts?.length > 0) {
    content = (
      <>
        {data.posts.map((post: PostType) => (
          <PostExcerpt key={post.id} post={post} />
        ))}{" "}
        <h3 className="post-title">Suggestions for you</h3>
        <UserSuggestion />
      </>
    )
  } else if (data?.posts?.length <= 0) {
    content = (
      <>
        <LastPost />
        <UserSuggestion />
      </>
    )
  } else if (error) {
    content = (
      <div className="posts-error">
        <p>try refreshing the page.</p>
        <h1>Oops! Something went wrong.</h1>
      </div>
    )
  }

  return (
    <section className="home">
      <div className="posts">{content}</div>
    </section>
  )
}

export default Home
