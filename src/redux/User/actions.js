import { ADD_USER, LOGIN_USER, LOGOUT_USER } from "./types"

export const addUser = (data) => {
    return {
        type: ADD_USER,
        data,
    }

}
export const logOutUser = (email) => {
    return {
        type: LOGOUT_USER,
        email
    }

}
export const loggedInUser = (email) => {
    return {
        type: LOGIN_USER,
        email,
    }
}