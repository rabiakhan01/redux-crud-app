import { ADD_USER, DELETE_USER, UPDATE_USER } from "./types"

export const userReducer = (state = [], action) => {
    console.log("data in actions", action.data)
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                action.data
            ]
        default:
            return state;
    }
}