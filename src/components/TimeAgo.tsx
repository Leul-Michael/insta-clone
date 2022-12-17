import formatDistanceToNow from "date-fns/formatDistanceToNow"

import timeStyles from "../styles/Timeago.module.css"

type TimeAgoProps = {
  timestamp: string
}

function TimeAgo({ timestamp }: TimeAgoProps) {
  let time = ""
  if (timestamp) {
    const timePeriod = formatDistanceToNow(Number(timestamp))

    time = `${timePeriod} ago`
  }
  return (
    <div className={timeStyles.timeago}>
      <p className={timeStyles.time}>{time}</p>
    </div>
  )
}

export default TimeAgo
