import middleware from '../utils/middleware'
import Dashboard from "../pages/Dashboard";
import BatchIndex from "../pages/admin/batch/index";
import BatchCreate from "../pages/admin/batch/create";
import BatchEdit from "../pages/admin/batch/edit";
import MentorIndex from "../pages/admin/mentor/index";
import MentorCreate from "../pages/admin/mentor/create";
import MentorEdit from "../pages/admin/mentor/edit";
import StudentIndex from "../pages/admin/student/index";
import CourseCreate from "../pages/admin/course/create";
import CourseEdit from "../pages/admin/course/edit";
import SessionIndex from "../pages/admin/session/index";
import WebinarCreate from "../pages/admin/webinar/create";
import WebinarEdit from "../pages/admin/webinar/edit";



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
                name:'management.course.create',
                path: 'course/create',
                component: CourseCreate,
            },
            {
                name:'management.course.edit',
                path: 'course/edit/:course_id',
                component: CourseEdit,
                props:true
            },
            {          
                name:'management.batch.edit',
                path: 'batch/edit/:batch_id',
                component: BatchEdit,
                props: true
            },
            {
                name:'management.mentor.create',
                path: 'mentor/create',
                component: MentorCreate
            },
            {
                name:'management.mentor.edit',
                path: 'mentor/edit/:mentor_id',
                component: MentorEdit,
                props: true
            },
            {
                name:'management.webinar.create',
                path: 'webinar/create',
                component: WebinarCreate,
            },
            {
                name:'management.webinar.edit',
                path: 'webinar/edit',
                component: WebinarEdit,
            },

        ]
    }
];

export default routes;
