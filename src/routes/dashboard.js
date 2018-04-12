import middleware from '../utils/middleware'
import Dashboard from "../pages/Dashboard";
import BatchIndex from "../pages/admin/batch/index";
import BatchCreate from "../pages/admin/batch/create";
import BatchEdit from "../pages/admin/batch/edit";
import MentorIndex from "../pages/admin/mentor/index";
import StudentIndex from "../pages/admin/student/index";
import SessionIndex from "../pages/admin/session/index";

let routes = [
    {
        path: '/dashboard',
        component: Dashboard,
        beforeEnter: middleware.auth,
        meta: {title: 'Dashboard'},
        children:[
            {
                path: '/',
                redirect: 'batch',
            },
            {
                name:'management.batch.index',
                path: 'batch',
                component: BatchIndex,
            },
            {
                name:'management.session.index',
                path: 'sessions',
                component: SessionIndex,
            },
            {
                name:'management.mentor.index',
                path: 'mentor',
                component: MentorIndex,
            },
            {
                name:'management.student.index',
                path: 'student',
                component: StudentIndex,
            },
            {
                name:'management.batch.create',
                path: 'batch/create',
                component: BatchCreate,
            },
            {
                name:'management.batch.edit',
                path: 'batch/edit/:batch_id',
                component: BatchEdit,
                props: true
            }
        ]
    }
];

export default routes;
