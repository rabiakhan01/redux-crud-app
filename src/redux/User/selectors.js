import { useSelector } from "react-redux";

export const GetUser = () => {
    const result = useSelector((state) => state.userReducer);
    console.log("🚀 ~ GetUser ~ result:", result)
    return result;
}