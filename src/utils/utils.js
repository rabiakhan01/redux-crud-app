const { GetUser } = require("../redux/User/selectors");

const isLoginUser = () => {

    const getUser = GetUser();
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

exports.isLoginUser = isLoginUser;
