<template>
    <div class="container">
        <div class="container justify-content-center">
            <form @submit.prevent="createBatch()">
                <h4>Basic Details</h4>
                <div v-if="errors.items.length" class="alert alert-danger">
                    <strong>Oops !!  There are some validation error</strong>
                    <ul>
                        <li v-for="error in errors.items" v-text="error.msg"></li>
                    </ul>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="course">Course</label>
                            <multiselect
                                    class="mr-4"
                                    v-model="selectedCourse"
                                    track-by="course"
                                    label="course"
                                    placeholder="Select Course"
                                    :options="courses"
                                    v-validate="'required'">
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
                    <div class="col">
                        <div class="form-group">
                            <label for="course_plan_id">Course Plan</label>
                            <div>
                                <multiselect
                                        class="mr-4"
                                        v-model="selectedCoursePlan"
                                        track-by="course_plan_id"
                                        label="course_plan_id"
                                        placeholder="Select Course Plan"
                                        :options="course_plan_ids"
                                        v-validate="'required'">
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
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="duration">Duration in min</label>
                            <input v-model="newBatch.duration" class="form-control form-control-sm" disabled />
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="mode_of_training">Mode of Training</label>
                            <input v-model="newBatch.mode_of_training" class="form-control form-control-sm" disabled />
                        </div>
                    </div>
                </div>
                <hr />
                <h4>Batch Schedule</h4>
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="start_date">Start Date</label>
                            <date-picker v-model="start_date" :config="{minDate: 'today' }"
                                         class="form-control form-control-sm" v-validate="'required'" >
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
                                    label="day"
                                    track-by="day"
                                    :disabled="!start_date"
                                    :options="days"
                                    :multiple="true">
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
                <hr />
                <!--selected days time-->
                <div class="row">
                    <div v-for="(selectedDay, index) in newBatch.days" class="col-2">
                        <label>{{selectedDay.day}}</label>
                        <date-picker v-model="selectedDay.time"
                                     :config="{enableTime: true,noCalendar: true,dateFormat: 'H:i'}"
                                     class="form-control form-control-sm" v-validate="'required'">
                        </date-picker>
                    </div>
                </div>
                <h4>Location Details</h4>
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
                            <select v-model="newBatch.status" class="form-control form-control-sm">
                                <option value="">Select Status</option>
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
                            <select v-model="newBatch.mentor" class="form-control form-control-sm">
                                <option value="not_assigned">Not Assigned</option>
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
                            <button type="submit" class="btn btn-primary" >Submit</button>
                        </div>
                    </div>
                </div>
            </form>
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
    export default {
        components: {datePicker, geolocation},
        mounted() {
        },
        data() {
            return {
                users: [],
                courses: [
                    {
                        id: 1, name: 'Android Development', active: true,
                        course_plan_id: [
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-2sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            },
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-3sessions',
                                active: false,
                                duration: '60',
                                mode_of_training: 'offline'
                            },
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-4sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            }
                        ]
                    },
                    {
                        id: 2, name: 'Frontend Development', active: true,
                        course_plan_id: [
                            {
                                id: 1125,
                                name: 'b2c-selfpaced-2sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            },
                            {
                                id: 1126,
                                name: 'front-b2c-selfpaced-3sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            },
                            {
                                id: 1127,
                                name: 'b2c-selfpaced-4sessions',
                                active: false,
                                duration: '60',
                                mode_of_training: 'online'
                            }
                        ]
                    },
                    {
                        id: 3, name: 'Big data Development', active: true,
                        course_plan_id: [
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-2sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            },
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-3sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            },
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-4sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            }
                        ]
                    },
                    {
                        id: 4, name: 'FullStack Development', active: false,
                        course_plan_id: [
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-2sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            },
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-3sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            },
                            {
                                id: 1121,
                                name: 'b2c-selfpaced-4sessions',
                                active: true,
                                duration: '60',
                                mode_of_training: 'online'
                            }
                        ]
                    },
                ],
                statuses: ['yet_to_start', 'in_progress', 'completed'],
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
                    start_date: null,
                    duration: null,
                    mode_of_training: null
                },
                selectedDays: null,
                start_date: null,
                address: null

            }
        },
        watch: {
            selectedCourse() {
                this.newBatch.course_id = this.selectedCourse ? this.selectedCourse.id : null;
            },
            selectedCoursePlan() {
                this.newBatch.course_plan_id = this.selectedCoursePlan ? this.selectedCoursePlan.id : null;
            },
            start_date() {
                this.newBatch.start_date = this.start_date;
                var dt = moment(this.start_date, "YYYY-MM-DD HH:mm:ss");
                var selected_day = (dt.format('dddd'));
                if(this.start_date)
                this.newBatch.days.push({day: selected_day, time: ""});
            },
            address() {
                this.newBatch.location = this.address ? this.address : null;
            }
        },
        computed: {
            course_plan_ids() {
                let vm = this;
                if (this.selectedCourse) {
                    if (this.selectedCourse.course_plan_id) {
                        return this.selectedCourse.course_plan_id;
                    }
                    return [];
                } else {
                    return [];
                }
            },
            duration() {
                this.newBatch.duration = this.selectedCoursePlan.duration ? this.selectedCoursePlan.duration : null;
            },
            mode_of_training() {
                this.newBatch.mode_of_training = this.selectedCoursePlan.mode_of_training ? this.selectedCoursePlan.mode_of_training : null;
            },

        },
        methods: {
            createBatch(){
                alert('hii');
            }
        },

    }
</script>
