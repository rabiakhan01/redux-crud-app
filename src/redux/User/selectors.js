import { useSelector } from "react-redux";

export const GetUser = () => {
    const res = useSelector((state) => state.userReducer);
    return res;
}

