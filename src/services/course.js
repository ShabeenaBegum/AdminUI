export default {
    async getAllCourses(cb, ecb = null){
        try{
            let response = await axios.get(window.contentUrl + "/course");
            cb(response.data.data);
        }catch (e) {
            ecb ? ecb(e) : '';
        }
    }
}