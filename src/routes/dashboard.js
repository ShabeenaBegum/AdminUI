import middleware from '../utils/middleware'
import Dashboard from "../pages/Dashboard";
import BatchIndex from "../pages/admin/batch/index";
import BatchCreate from "../pages/admin/batch/create";
import MentorIndex from "../pages/admin/mentor/index";
import StudentIndex from "../pages/admin/student/index";
import CourseCreate from "../pages/admin/course/create";


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
                name:'management.course.create',
                path: 'course',
                component: CourseCreate,
            }          
        ]
    }
];

export default routes;
