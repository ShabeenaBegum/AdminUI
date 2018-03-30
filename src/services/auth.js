export default {
    check() {
        return !! localStorage.authUser;
    },
    getToken(){
        if(this.check()){
            let user = JSON.parse(localStorage.authUser);
            return user ? user.access_token : null;
        }
        return null;
    },
    getAuthUser(){
        if(this.check()) {
            return JSON.parse(localStorage.authUser);
        }
    }
}