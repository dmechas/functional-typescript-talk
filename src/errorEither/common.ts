import { Either, tryCatch2v } from "fp-ts/lib/Either"

export interface Session {
  startTime: string
  userId: string
}

export interface User {
  name: string
  userId: string
}

export const getSession: (sessionId: string) => Session = sessionId => {
  switch (sessionId) {
    case "validUserSessionId":
      return {
        startTime: "sometimeago",
        userId: "validUser",
      }
    case "invalidUserSessionId":
      return {
        startTime: "anothertime",
        userId: "invalidUser",
      }
    default:
      throw new Error("ERROR 4576387456837456: session not found")
  }
}
export const getUser: (userId: string) => User = userId => {
  if (userId === "validUser") {
    return {
      name: "Valid User",
      userId,
    }
  } else {
    throw new Error("ERROR 9893847928476: missing user")
  }
}

export const wrapErrors1 = <T, U>(f: (t: T) => U, error: string) => (t: T): Either<Error, U> =>
  tryCatch2v(() => f(t), () => new Error(error))
