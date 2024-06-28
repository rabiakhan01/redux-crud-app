import { ADD_USER } from "./types";

export const userReducer = (state = [], action) => {
    console.log("🚀 ~ userReducer ~ action:", action.data)

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