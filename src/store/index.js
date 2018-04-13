import Vue from 'vue'
import Vuex from 'vuex'
import courseApi from "@/services/course";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        courses: []
    },
    actions: {
        LOAD_COURSE_LIST(state) {
           courseApi.getAllCourses(courses => {
               state.commit('SET_COURSES', courses)
           });
        }
    },
    mutations: {
        SET_COURSES(state,courses){
            state.courses = courses
        }
    },
    getters: {
        getCourseById(state){
            return function (id) {
                return _.find(state.courses, function(o) { return o._id === id; });
            }
        }
    }
});
export default store