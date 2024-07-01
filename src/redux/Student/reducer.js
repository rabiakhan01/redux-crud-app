import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from "./types";

export const studentReducer = (state = [], action) => {

    switch (action.type) {
        case ADD_STUDENT:
            return [
                ...state,
                action.data
            ]
        case DELETE_STUDENT:
            const newData = state.filter((student) => student.id !== action.id);
            return newData;
        case UPDATE_STUDENT:
            const updatedData = state.map((student) => {
                if (student.id === action.data.id) {
                    return action.data
                }
                else return student
            });
            console.log("🚀 ~ updatedData ~ updatedData:", updatedData)
            return updatedData;
        default:
            return state;
    }
}