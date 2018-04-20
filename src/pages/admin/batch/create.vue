<template>
    <div class="container">
        <div class="container justify-content-center">
            <!-- <form> -->
                <div class="card card-default">
                    <div class="card-header">Basic Details</div>
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
                            <label for="course">Course</label>
                            <multiselect
                                    class="mr-4"
                                    v-model="selectedCourse"
                                    label="course"
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
                    <div class="col-md-4">
                        <div class="form-group">
                            <label for="course_plan_id">Course Plan</label>
                            <div>
                                <multiselect
                                        class="mr-4"
                                        :disabled="!selectedCourse"
                                        v-model="selectedCoursePlan"
                                        label="course_plan_id"
                                        :searchable="true"
                                        placeholder="Select Course Plan"
                                        :options="course_plan_ids"
                                        v-validate="'required'" data-vv-value-path="innerValue" data-vv-name="course_plan_id">
                                    <template slot="singleLabel" slot-scope="{ option }">
                                        <span :class="{inactiveOption: !option.status}">
                                            {{ option.name }}
                                        </span>
                                    </template>
                                    <template slot="option" slot-scope="props">
                                        <span :class="{inactiveOption: !props.option.status}">
                                            {{ props.option.name }}
                                        </span>
                                    </template>
                                </multiselect>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label for="duration">Duration in min</label>
                            <input v-model="newBatch.duration" class="form-control form-control-sm" disabled name="duration" v-validate="'required'" />
                        </div>
                    </div>
                    <div class="co-md-2">
                        <div class="form-group">
                            <label for="mode_of_training">Mode of Training</label>
                            <input v-model="newBatch.mode_of_training" class="form-control form-control-sm" disabled name="mode_of_training" v-validate="'required'"/>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
                <hr>
                <div class="card card-default">
                <div class="card-header">
                    Batch Schedule
                </div>
                    <div class="card-body">


                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="start_date">Start Date</label>
                            <date-picker v-model="newBatch.start_date" :config="{minDate: 'today'}"
                                         class="form-control form-control-sm"
                                         v-validate="'required'"
                                         name="start_date"
                                         data-vv-value-path="innerValue"
                                         :has-error="errors.has('start_date')">
                            </date-picker>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="days">Days</label>
                            <multiselect
                                    class="mr-4"
                                    v-model="newBatch.days"
                                    placeholder="Days"
                                    :allow-empty="false"
                                    label="day"
                                    track-by="day"
                                    :disabled="!newBatch.start_date"
                                    :options="days"
                                    :multiple="true"
                                    v-validate="'required'" data-vv-value-path="innerValue" data-vv-name="day" :has-error="errors.has('day')">
                            </multiselect>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="time_zone">Time Zone</label>
                            <input v-model="newBatch.time_zone" class="form-control form-control-sm" name="time_zone" v-validate="'required'"/>
                        </div>
                    </div>
                </div>
                <!--selected days time-->
                <div class="row">
                    <div v-for="(selectedDay, index) in newBatch.days" class="col-2">
                        <label>{{selectedDay.day}}</label>
                        <date-picker v-model="selectedDay.time"
                                     :config="{enableTime: true,noCalendar: true,dateFormat: 'H:i'}"
                                     class="form-control form-control-sm"
                                     v-validate="'required'"
                                     :data-vv-name="selectedDay.day"
                                     :has-error="errors.has('selectedDay.day')">
                        </date-picker>
                    </div>
                </div>
                    </div>
                </div>
                <hr>
                <div class="card card-default">
                    <div class="card-header">
                        Location Details
                    </div>
                    <div class="card-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="location">Location</label>
                            <geolocation id="map" v-model="address" class="form-control form-control-sm"/>
                            <!--<input v-model="newBatch.location" class="form-control form-control-sm"/>-->
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="status">Status</label>
                            <select v-model="newBatch.status" class="form-control form-control-sm" name="status" v-validate="'required'">
                                <option selected value="">Select Status</option>
                                <option v-for="status in statuses" v-bind:value="status">{{status}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="francise">Francise Name</label>
                            <input  class="form-control form-control-sm"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <div class="form-group">
                            <label for="mentor">Mentor</label>
                            <select v-model="newBatch.mentor" class="form-control form-control-sm" name="mentor" v-validate="'required'">
                                <option selected value="not_assigned">Not Assigned</option>
                                <option v-for="(mentor,index) in mentors" v-bind:value="mentor.id" :key="index">{{mentor.name}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="form-group">
                            <label for="reference_name">Reference Name</label>
                            <input  class="form-control form-control-sm"/>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group">
                        <div class="col-md-8">
                            <button type="submit" class="btn btn-primary" @click="createBatch()">Create Batch</button>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            <!-- </form> -->
        </div>
    </div>
</template>
<style>
    span.inactiveOption {
        text-decoration: line-through;
        color: red;
    }
</style>
<script>
    import datePicker from 'vue-flatpickr-component';
    import moment from 'moment';
    import geolocation from '@/components/geolocation';
    import courseApi from '@/services/course';
    export default {
        components: {datePicker, geolocation},
        created() {
            courseApi.getAllCourses(courses => this.courses=courses.data);
        },
        data() {
            return {
                users: [],
                courses: [],
                statuses: ['yet_to_start', 'pending', 'completed'],
                mentors: [
                    {id: 1, name: 'mentor1'},
                    {id: 2, name: 'mentor2'},
                    {id: 3, name: 'mentor3'},
                ],
                selectedCourse: null,
                selectedCoursePlan: null,
                date: null,
                days: [
                    {day: 'Monday', time: ''},
                    {day: 'Tuesday', time: ''},
                    {day: 'Wednesday',time: ''},
                    {day: 'Thursday', time: ''},
                    {day: 'Friday', time: ''},
                    {day: 'Saturday', time: ''},
                    {day: 'Sunday', time: ''}
                ],
                newBatch: {
                    days: [],
                    location: null,
                    course_plan_id: null,
                    course_id: null,
                    start_date: "",
                    duration: null,
                    mode_of_training: null,
                    sessions: [],
                    modules: []
                },
                selectedDays: null,
                start_date: "",
                address: null

            }
        },
        watch: {
            selectedCourse() {
                this.newBatch.course_id = this.selectedCourse ? this.selectedCourse._id : null;
                if(this.selectedCourse == null){
                    this.newBatch.course_plan_id = null;
                    this.newBatch.duration = null;
                    this.newBatch.mode_of_training = null;
                }
            },
            selectedCoursePlan() {
                this.newBatch.course_plan_id = this.selectedCoursePlan ? this.selectedCoursePlan._id : null;
                if(this.selectedCoursePlan){
                    this.newBatch.duration = this.selectedCoursePlan.weeks ? this.selectedCoursePlan.weeks : null;
                    this.newBatch.mode_of_training = this.selectedCoursePlan.mode_of_training ? this.selectedCoursePlan.mode_of_training : null;
                } else {
                    this.newBatch.duration = null;
                    this.newBatch.mode_of_training = null;
                }
            },
            "newBatch.start_date"(){
                this.newBatch.days = [];
                var dt = moment(this.newBatch.start_date, "YYYY-MM-DD HH:mm:ss");
                var selected_day = (dt.format('dddd'));
                if(this.newBatch.start_date)
                this.newBatch.days.push({day: selected_day, time: ""});
            },
            address() {
                this.newBatch.location = this.address ? this.address : null;
            },
           /* duration() {
                this.newBatch.duration = this.selectedCoursePlan.duration ? this.selectedCoursePlan.duration : null;
            },
            mode_of_training() {

            },*/

        },
        computed: {
            course_plan_ids() {
                let vm = this;
                if (this.selectedCourse) {
                    if (this.selectedCourse.coursePlan) {
                        return this.selectedCourse.coursePlan;
                    }
                    return [];
                } else {
                    return [];
                }
            },


        },
        methods: {
            async createBatch(){
                let vm = this;

                try{
                    let result = await this.$validator.validateAll();
                    if(result){
                        try{
                            let coursePlan = await axios.get(window.contentUrl+"/content/csd?course_plan_id="+vm.newBatch.course_plan_id);
                                if((coursePlan.status == 200)&&(coursePlan.data.data.modules != undefined)&&(coursePlan.data.data.sessions != undefined) )
                                {
                                    vm.newBatch.modules = coursePlan.data.data.modules;
                                    vm.newBatch.sessions = coursePlan.data.data.sessions;
                                    try{
                                        let response = await axios.post(window.batchUrl+"/batch", vm.newBatch);
                                        if(response.status == 201)
                                        {
                                            sflash('Batch created');
                                            this.$router.push({ name: 'management.batch.index', query: { course_id: this.selectedCourse._id, page:1 }});
                                        } else {
                                            sflash('Batch Not created', 'error');
                                        }
                                    }catch(er){
                                        log(er);
                                    }
                                } else {
                                    sflash('Content Not updated contact support team!', 'error');
                                }

                        }catch(e){
                            log(e);
                        }
                    }

                }catch(error){
                    log(error);
                }
           
            }
        },

    }
</script>
