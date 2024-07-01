import { ADD_USER, LOGOUT_USER, LOGIN_USER } from "./types"

export const userReducer = (state = [], action) => {
    console.log("data in actions", action.data)
    switch (action.type) {
        case ADD_USER:
            return [
                ...state,
                action.data
            ]
        case LOGIN_USER:
            const updatedUsers = state.map((user) => {
                if (user.email === action.email) {
                    return {
                        ...user, isLogin: true
                    }
                }
                else { return user }
            })
            return updatedUsers;

        case LOGOUT_USER:
            const editUsers = state.map((user) => {
                if (user.email === action.email) {
                    return { ...user, isLogin: false }
                }
                else {
                    return user
                }
            });
            return editUsers;

        default:
            return state;
    }
}