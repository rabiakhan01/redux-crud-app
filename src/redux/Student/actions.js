import { ADD_STUDENT, DELETE_STUDENT, UPDATE_STUDENT } from "./types"

export const addStudent = (data) => {
    return {
        type: ADD_STUDENT,
        data,
    }
}

export const deleteStudent = (id) => {
    return {
        type: DELETE_STUDENT,
        id,
    }
}

export const updateStudent = (data) => {
    return {
        type: UPDATE_STUDENT,
        data,
    }
}