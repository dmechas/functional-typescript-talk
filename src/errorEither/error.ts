import { getSession as getSessionError, getUser as getUserError } from "./common"

const unsafeGetLoggedInUserName = (sessionId: string) => {
  const session = getSession(sessionId)
  const user = getUser(session.userId)
  return user.name
}

const getLoggedInUserName1 = (sessionId: string) => {
  try {
    const session = getSession(sessionId)
    const user = getUser(session.userId)
    return user.name
  } catch (error) {
    throw new Error("Session not found")
  }
}

const getSession = (sessionId: string) => {
  try {
    return getSessionError(sessionId)
  } catch (error) {
    throw new Error("Session not found")
  }
}

const getUser = (sessionId: string) => {
  try {
    return getUserError(sessionId)
  } catch (error) {
    throw new Error("Session not found")
  }
}

const getLoggedInUserName = (sessionId: string) => {
  const session = getSession(sessionId)
  const user = getUser(session.userId)
  return user.name
}

try {
  const userName = getLoggedInUserName("invalidUserSessionId")
  console.log("The logged in user is:", userName)
} catch (error) {
  console.log(error.message)
}
