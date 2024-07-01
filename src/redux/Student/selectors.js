import { useSelector } from "react-redux";

export const GetStudent = () => {
    const res = useSelector((state) => state.userReducer);
    return res;
}

