export default {
    async getAllCourses(cb){
        try{
            let response = await axios.get(window.baseUrl + "/courses");
            cb(response.data);
        }catch (e) {
            cb([]);
        }
    }
}