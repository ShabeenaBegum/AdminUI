<template>
    <div>
        <div class="row">
            <div class="col-md-2" style="padding-right: 0;">
                <div class="card">
                    <div class="card-header flex space-between">
                        Filter's
                        <button class="btn btn-link btn-sm">Reset</button>
                        <button class="btn btn-outline-dark btn-sm">Apply</button>
                    </div>
                    <div class="card-body">
                        <div class="filter mb-2">
                            <span>Name</span>
                            <input type="text" class="form-control form-control-sm">
                        </div>
                        <div class="filter mb-2">
                            <span>Email</span>
                            <input type="text" class="form-control form-control-sm">
                        </div>
                        <div class="filter mb-2">
                            <span>Role</span>
                            <select class="form-control form-control-sm">
                                <option value="">Admin</option>
                                <option value="">Student</option>
                                <option value="">Support</option>
                            </select>

                        </div>
                        <div class="filter mb-2">
                            <span>Phone</span>
                            <input type="text" class="form-control form-control-sm">
                        </div>
                        <div class="filter mb-2">
                            <span>Batch Id</span>
                            <input type="text" class="form-control form-control-sm">
                        </div>
                        <div class="filter mb-2">
                            <span>Action</span>
                            <input type="text" class="form-control form-control-sm">
                        </div>
                        <div class="filter mb-2">
                            <span>Batch Date Range</span>
                            <date-picker v-model="date" :config="{mode: 'range'}" class="form-control form-control-sm"></date-picker>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-10">
                <div class="card card-default table-card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
                            <multiselect
                                    class="mr-4"
                                    v-model="selectedCourse"
                                    track-by="name"
                                    label="name"
                                    placeholder="Select Course"
                                    :options="courses">
                                <template slot="singleLabel" slot-scope="{ option }">
                        <span :class="{inactiveCourse: !option.active}">
                            {{ option.name }}
                        </span>
                                </template>
                                <template slot="option" slot-scope="props">
                        <span :class="{inactiveCourse: !props.option.active}">
                            {{ props.option.name }}
                        </span>
                                </template>
                            </multiselect>

                            <button class="btn btn-primary">Create Batch</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <data-grid :data="batches" @changed="getBatchesByCourseId"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    span.inactiveCourse {
        text-decoration: line-through;
        color: red;
    }

</style>
<script>
    import datePicker from 'vue-flatpickr-component';
    export default {
        components:{datePicker},
        data() {
            return {
                date:null,
                batches:{},
                courses:[],
                selectedCourse:null
            }
        },
        watch:{
            selectedCourse(){
                let page = this.$route.query.page;
                if(!page){
                    page = 1;
                }
                if(this.selectedCourse){
                    this.getBatchesByCourseId(page);
                }
            }
        },
        methods:{
            courseStatus(data){
                let s = data.active ? '' : ' (in active)';
                return data.name + s;
            },
            async getBatchesByCourseId(page = 1){
                try{
                    let response = await axios.get(window.baseUrl+"/batches?id="+this.selectedCourse._id+"&page="+page);
                    this.batches = response.data;
                    history.pushState(null, null, '?id='+this.selectedCourse._id+'&page='+page);
                }catch (error){
                    log(error);
                }
            },
            setData(courses){
                this.courses = courses;
                let id = this.$route.query.id;
                if(id){
                    this.selectedCourse = _.find(this.courses, ['_id', id]);
                }
            }

        },
        async beforeRouteEnter (to, from, next) {
            try{
                let response = await axios.get(window.baseUrl+"/courses");
                next(function (vm) {
                    return vm.setData(response.data);
                })
            }catch (error){
                log(error);
                flash(error.response.data.data.message, "danger");
                next();
            }
        },
    }
</script>