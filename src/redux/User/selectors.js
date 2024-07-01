import { useSelector } from "react-redux";

export const GetUser = () => {
    const result = useSelector((state) => state.userReducer);
    return result;
}