import authService from "@/services/auth";
import Vue from "vue";

Vue.mixin({
    data() {
        return {
            eventHub: window.eventHub,
            authCheck: authService.check(),
            authUser: authService.getAuthUser(),
            baseUrl: window.baseUrl
        }
    },
    methods: {
        _dis(value, placeHolder = "-"){
            return value ? value : placeHolder;
        },
        pathIs(url, keyword){
            return url.includes(keyword);
        },
        pluck(array, key) {
            let arr = [];
            for(var i =0 ;i < array.length ; i++){
                arr.push(array[i][key]);
            }
            return arr;
        },
        formatDate(time, format = 'D/M/Y'){
            if(time){
                return moment(time).format(format);
            }
            return time;
        },
        formNow(time, ist = true){
            if(time){
                if(ist){
                    return moment(time).add({ hours: 5, minutes: 30}).fromNow();
                }
                return moment(time).fromNow();
            }
        }
    }
});
