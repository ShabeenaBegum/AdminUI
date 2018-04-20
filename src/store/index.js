import Vue from 'vue'
import Vuex from 'vuex'
import courseApi from "@/services/course";
import eventConstants from "@/constants/events";
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        courses: []
    },
    actions: {
        [eventConstants.LOAD_COURSE_LIST](state) {
           courseApi.getAllCourses(courses => {
               state.commit(eventConstants.SET_COURSES, courses)
           });
        }
    },
    mutations: {
        [eventConstants.SET_COURSES](state,courses){
            state.courses = courses;
            eventHub.$emit(eventConstants.COURSE_LOADED);
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