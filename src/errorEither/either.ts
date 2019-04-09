import { Either, left, right, tryCatch2v } from "fp-ts/lib/Either"
import { getSession as getSessionError, getUser as getUserError, wrapErrors1 } from "./common"

interface Session {
  startTime: string
  userId: string
}

interface User {
  name: string
  userId: string
}

const getSession = wrapErrors1(getSessionError, "Session not found")
const getUser = wrapErrors1(getUserError, "User not found")

const getLoggedInUserName: (sessionId: string) => Either<Error, string> = (sessionId: string) =>
  getSession(sessionId)
    .map(session => session.userId)
    .chain(getUser)
    .map(user => user.name)

getLoggedInUserName("validUserSessionId").bimap(
  error => console.log(error.message),
  userName => console.log("The logged in user is:", userName),
)
