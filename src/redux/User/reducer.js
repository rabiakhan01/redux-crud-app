import { ADD_USER, DELETE_USER, UPDATE_USER } from "./types";

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
        case UPDATE_USER:
            const updatedData = state.map((user) => {
                if (user.id === action.data.id) {
                    return action.data
                }
                else return user
            });
            console.log("🚀 ~ updatedData ~ updatedData:", updatedData)
            return updatedData;
        default:
            return state;
    }
}