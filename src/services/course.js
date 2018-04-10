export default {
    async getAllCourses(cb){
        try{
            let response = await axios.get(window.contentUrl + "/course");
            cb(response.data);
        }catch (e) {
            cb({data:[]});
        }
    }
}