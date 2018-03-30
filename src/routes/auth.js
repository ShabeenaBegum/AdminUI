import  middleware from "../utils/middleware";
import Login from "../pages/login";

let routes = [
    {
        path: '/login',
        component: Login,
        beforeEnter:  middleware.guest
    }
];

export default routes;
