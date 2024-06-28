import { ADD_USER, DELETE_USER } from "./types"

export const addUser = (data) => {
    return {
        type: ADD_USER,
        data,
    }
}

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        id,
    }
}