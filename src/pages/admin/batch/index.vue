<template>
    <div>
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

                            <button class="btn btn-primary">Create Batch</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <data-grid :data="batches" :columns="cols" @changed="getBatchesByCourseId">
                            <template slot-scope="{ row, col }">
                                <span v-if="col === 'batch_name'">
                                    <router-link :to="getBatchLink(row)">
                                        {{ row['batch_name']}}
                                    </router-link>
                                </span>
                                <span v-else-if="col === 'end_date'">
                                    {{ getBatchLastDate(row) }}
                                </span>
                                <span v-else-if="col === 'day_time'">
                                    <span class="badge badge-secondary mr-1" v-for="day in row['days']">
                                        {{ day.day }} - {{ day.time}}
                                    </span>
                                </span>
                                <!-- Rating -->
                                <span v-else-if="col === 'rating'">
                                    3
                                </span>
                                <span v-else-if="col === 'session'">
                                    <router-link :to="getSessionLink(row)">3/2</router-link>
                                </span>
                                <span v-else>{{ row[col] }}</span>
                            </template>
                        </data-grid>
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
    /*.table-card .card-body .table th, .table-card .card-body .table td {*/
        /*text-align: center;*/
    /*}*/

</style>
<script>
    import datePicker from 'vue-flatpickr-component';
    import courseApi from '@/services/course';
    import constants from '@/constants/Batch/grid';

    export default {
        components: {datePicker},
        created() {
            let vm = this;
            courseApi.getAllCourses(courses => vm.courses = courses.data);
        },
        data() {
            return {
                date: null,
                batches: {},
                courses: [],
                selectedCourse: null,
                cols: constants.cols,
                filters: constants.filters
            }
        },
        watch: {
            selectedCourse() {
                let page = this.$route.query.page;
                if (!page) {
                    page = 1;
                }
                if (this.selectedCourse) {
                    this.getBatchesByCourseId(page);
                }
            }
        },
        methods: {
            getBatchLink(batch){
                return "batch/"+batch._id ;
            },
            getSessionLink(batch){
              return "sessions/"+batch._id ;
            },
            getBatchLastDate(batch){
              let lastSession = _.last(batch.sessions);
              return lastSession ? lastSession.date : 'N/A';
            },
            async getBatchesByCourseId(page = 1) {
                try {
                    let response = await axios.get(window.batchUrl + "/batch?course_id=" + this.selectedCourse._id + "&page=" + page);
                    this.batches = response.data.data;
                    history.pushState(null, null, '?course_id=' + this.selectedCourse._id + '&page=' + page);
                } catch (error) {
                    log(error);
                }
            }
        }
    }
</script>