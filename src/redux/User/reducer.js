import { ADD_USER, DELETE_USER } from "./types";

export const userReducer = (state = [], action) => {
    console.log("🚀 ~ userReducer ~ action:", action.data)

    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                action.data
            ]
        case DELETE_USER:
            const newData = state.filter((user) => user.id !== action.id);
            return newData;
        default:
            return state;
    }
}