import { useEffect, useState } from "react"

import searchStyles from "../../styles/Search.module.css"
import profileStyles from "../../styles/Profile.module.css"
import Spinner from "../../components/Spinner"
import { useLazyQuery } from "@apollo/client"
import { SEARCH_USERS } from "../../api/queries/userQueries"
import { UserType } from "../Home/Home"
import useDebounceValue from "../../hooks/useDebounceValue"
import { Link } from "react-router-dom"

function Result({ user }: { user: UserType }) {
  return (
    <Link to={`/account/${user.id}`} className={searchStyles["result"]}>
      <div className="user-profile">
        <div className="profile-circle">{user.username.charAt(0)}</div>
        <p>{user.username}</p>
      </div>
    </Link>
  )
}

function Search() {
  const [query, setQuery] = useState<string>("")
  const [searchUsers, { error, data }] = useLazyQuery(SEARCH_USERS)

  const debounceValue = useDebounceValue(query, 300)

  useEffect(() => {
    const getSearchResults = async () => {
      await searchUsers({ variables: { query, page: 1 } })
    }

    debounceValue && getSearchResults()
  }, [debounceValue])

  let content
  if (error) {
    content = (
      <>
        <p>{error.message}</p>
        <h1>Oops! Something went wrong.</h1>
      </>
    )
  } else if (data?.searchUsers?.results.length) {
    content = (
      <>
        <div className={searchStyles["search-results"]}>
          {data?.searchUsers?.results.map((user: UserType) => (
            <Result key={user.id} user={user} />
          ))}
        </div>
      </>
    )
  }

  return (
    <section className={profileStyles.container}>
      <div className={searchStyles.search}>
        <div className={searchStyles["search-input-box"]}>
          <input
            type="search"
            name="query"
            placeholder="Search user"
            autoComplete="false"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {content}
      </div>
    </section>
  )
}

export default Search
