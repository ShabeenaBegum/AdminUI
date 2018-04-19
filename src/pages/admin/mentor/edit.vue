<template>
    <div class="container" v-if="mentorData">
        <div class="container justify-content-center">
            <div class="card card-default">
                <div class="card-header">Mentor Details</div>
                <div class="card-body">
                    <div v-if="errors.items.length" class="alert alert-danger">
                        <strong>Oops !!  There are some validation error</strong>
                        <ul>
                            <li v-for="error in errors.items" v-text="error.msg"></li>
                        </ul>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="course">Name</label>
                                <input name="name" v-model="mentorData.name" class="form-control form-control-sm" placeholder="Mentor Name" v-validate="'required|alpha_spaces|min:3'">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input name="email" v-model="mentorData.email" class="form-control form-control-sm" placeholder="abcd@gmail.com" v-validate="'required|email'">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="phone">Phone</label>
                                <input name="phone" v-model="mentorData.phone" class="form-control form-control-sm" placeholder="9234567890" v-validate="'required|numeric|min:9|max:12'">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="pan">PAN</label>
                                <input name="phone" v-model="mentorData.pan" class="form-control form-control-sm" placeholder="DOSPE2384V" v-validate="'required'">
                            </div>
                        </div>
                        <div class="col-md-4">
                            <label for="course">Course</label>
                            <multiselect
                                    class="mr-4"
                                    v-model="selectedCourse"
                                    label="course"
                                    name="course._id"
                                    placeholder="Select Course"
                                    :options="courses"
                                    v-validate="'required'" data-vv-value-path="innerValue" data-vv-name="course"
                                    >
                                <template slot="singleLabel" slot-scope="{ option }">
                                    <span :class="{inactiveOption: !option.active}">
                                        {{ option.name }}
                                    </span>
                                </template>
                                <template slot="option" slot-scope="props">
                                    <span :class="{inactiveOption: !props.option.active}">
                                        {{ props.option.name }}
                                    </span>
                                </template>
                            </multiselect>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group col-md-4">
                            <button type="submit" class="btn btn-primary" @click="editMentor()">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import courseApi from '@/services/course';
    export default{
        props: ['mentor_id'],
        async created() {
            let vm = this;
            await axios.get('http://users.local/api/users/'+vm.mentor_id)
                .then(function(response){
                    vm.mentorData = response.data.data;
                });
            vm.selectedCourse = _.find(vm.courses, function(c){
                return vm.mentorData.course_id == c._id;
            });
        },
        data() {
            return {
                mentor: {
                    name: null,
                    email: null,
                    phone: null,
                    user_type: null,
                    source: {
                        via: "website"
                    },
                    pan: null,
                    course_id: null
                },
                selectedCourse: [],
                mentorData: null
            }
        },
        watch: {
            selectedCourse(){
                this.mentorData.course_id = this.selectedCourse ? this.selectedCourse._id : null;
            }
        },
        computed: {
            courses() {
                return this.$store.state.courses;
            } 
        },
        methods: {
            async editMentor(){
                try{
                    let vm = this;
                    let result = await this.$validator.validateAll();
                    if(result) {
                        try{
                            let mentor_updated = await axios.put('http://users.local/api/users/'+vm.mentorData._id, vm.mentorData);
                            if(mentor_updated.data.success == true){
                                sflash('Mentor Updated');
                            } else {
                                sflash('Error', 'error');
                            }
                        } catch (error){
                            sflash('Error', 'error');
                        }
                    }
                } catch(error){
                    log(error);
                }
            }
        }
    }
</script>