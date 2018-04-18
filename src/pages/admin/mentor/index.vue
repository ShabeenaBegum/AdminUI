<template>
    <div class="row">
        <div class="col-md-2" style="padding-right: 0;">
            <data-filter :filters="filters"/>
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

                        <button class="btn btn-primary" @click="$router.push({ name: 'management.mentor.create'})">
                            Create Mentor
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <data-grid :data="mentors" :columns="cols" @changed="paginationPageChanged">
                        <template slot-scope="{ row, col }">
                            <span v-if="col == 'course_id'">
                               {{getCourseName(row)}}
                            </span> 
                            <span v-else>{{ row[col] }}</span>
                            <span v-if="col == 'edit'"><button class="btn btn-primary" @click="$router.push({ name: 'management.mentor.edit', params:{mentor_id:row._id}})">Edit</button></span>
                        </template>
                    </data-grid>
                </div>
                <!-- <div class="bottom-table  mb-3">
                    <strong class="ml-2"></strong>
                    <div class="pagination-table float-right">
                        <button class="btn btn-filter mr-3">
                            Next
                        </button>
                        <button class="btn btn-filter  mr-3">
                            Previous
                        </button>
                    </div>
                </div> -->
            </div>
        </div>   

    </div>
</template>

<script>
    import constants from '@/constants/Mentor/grid';
    import courseApi from '@/services/course';
    import eventConstant from "@/constants/events";
    export default {
        name:"MentorIndex",
        async created() {
            
        },
        data() {
            return {
                mentors: {},
                cols: constants.cols,
                filters: constants.filters,
                selectedCourse: null
            }
        },
        computed: {
            courses() {
                return this.$store.state.courses;
            } 
        },
        watch: {
            selectedCourse() {
                let page = this.$route.query.page;
                if (!page) {
                    page = 1;
                }
                if (this.selectedCourse) {
                    this.getMentorsByCourseId(page);
                }
            }
        },
        methods: {
            async getMentorsByCourseId(page){
                let vm = this;
                await axios.get('http://users.local/api/users/user_type/mentor?course_id='+vm.selectedCourse._id+ "&page=" + page)
                    .then(function(response){
                        vm.mentors = response.data.data;
                });  
            },
            getCourseName(row){
                let vm = this;
                let course = _.find(vm.courses, function(c){
                    if(c._id === row.course_id){
                        return c;
                    } 
                });
                return (course ? course.name : "no course");
                
            },
            paginationPageChanged(page) {
                if (this.mentors.data && page != this.mentors.current_page) {
                    this.getMentorsByCourseId(page);
                }
            },
            
        }
    }
</script>