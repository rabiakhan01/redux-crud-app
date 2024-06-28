import { ADD_USER } from "./types"

export const addUser = (data) => {
    return {
        type: ADD_USER,
        data,
    }
}