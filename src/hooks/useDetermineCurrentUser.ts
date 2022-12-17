import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/AuthSlice"

export default function useDetermineCurrentUser(userid: string) {
  const currentLoggedInUser = useSelector(selectCurrentUser)

  return userid === currentLoggedInUser
}
