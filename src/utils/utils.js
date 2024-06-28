const isLoginUser = () => {

    const getUser = JSON.parse(localStorage.getItem("loginUser"));
    if (getUser) {
        const user = getUser.find(user => user.isLogin === true);
        if (user) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }

}

const getUser = () => {
    const user = localStorage.getItem("users");
    if (user) {
        return JSON.parse(user);
    }
    else {
        return [];
    }
}



exports.isLoginUser = isLoginUser;
exports.getUser = getUser;