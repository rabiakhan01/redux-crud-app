import { studentReducer } from "./Student/reducer";
import { userReducer } from './User/reducer';
import { combineReducers } from "redux";

export default combineReducers({
    studentReducer,
    userReducer,
})