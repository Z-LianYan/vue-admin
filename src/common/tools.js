export  function setToken(token){
    localStorage.token = token;
}
export function getToken(){
    return localStorage.token;
}
export function removeToken(){
    delete localStorage.token;
}

export  function setUserInfo(userInfo){
    localStorage.userInfo = userInfo;
}
export function getUserInfo(){
    return localStorage.userInfo;
}
export function removeUserInfo(){
    delete localStorage.userInfo;
}