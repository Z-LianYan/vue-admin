export  function setToken(token){
    localStorage.token = token;
}
export function getToken(){
    return localStorage.token;
}
export function removeToken(){
    delete localStorage.token;
}
