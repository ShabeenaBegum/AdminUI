import Home from './../pages/Home';
import About from './../pages/About';
import PageNotFound from './../pages/PageNotFound';

let base = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about/',
        component: About,
    },
    {
        path: "*",
        component: PageNotFound
    }
];

export default base;
