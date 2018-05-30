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
                            <!-- <multiselect
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

                            <button class="btn btn-primary" @click="$router.push({ name: 'management.batch.create'})">
                                Create Batch
                            </button> -->
                        </div>
                    </div>
                    <div class="card-body">
                        <data-grid :data="webinar1" :columns="cols" @changed="paginationPageChanged">
                                <template slot-scope="{ row, col }">


                                <span v-if="col === 'action_edit'">
                                    <button  type="button" @click="$router.push({ name: 'management.webinar.edit',params:{webinar_id:row._id}})" class="btn btn-primary">
                                        Edit
                                    </button>
                                   
                                </span>
                                <span v-if="col === 'action_review'">
                                    <button class="btn btn-success">
                                        Review
                                    </button>
                                   
                                </span>
                               <!--  <span
                                        title="View Batch"
                                        v-tippy
                                        style="cursor: pointer"
                                        class="text-primary"
                                        v-if="col === 'batch_name'"
                                        @click="showBatchModal(row)">
                                        {{ row.batch_name }}
                                </span> -->
                                <!-- <span v-else-if="col === 'end_date'">
                                    {{ getBatchLastDate(row) }}
                                </span>
                                <span v-else-if="col === 'day_time'">
                                    <span class="badge badge-secondary mr-1" v-for="day in row.days">
                                        {{ day.day }} - {{ day.time}}
                                    </span>
                                </span> -->
                                <!-- Rating -->
                                <!-- <span v-else-if="col === 'rating'">
                                    3
                                </span>
                                <span v-else-if="col === 'no_of_students'">
                                    61
                                </span> -->

                                <!-- <span v-else-if="col === 'session'" title="View Sessions"
                                      v-tippy>
                                    <router-link :to="getSessionLink(row)">3/2</router-link>
                                </span> -->
                                <span >{{ row[col] }}</span>
                            </template>
                        </data-grid>
                    </div>
                </div>
            </div>
        </div>
        <batch-modal
                v-if="currentBatch"
                @closed="currentBatch = null"
                :batch="currentBatch"/>
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
    import constants from '@/constants/webinar/grid';
    import batchModal from '@/pages/admin/batch/view';
    import eventConstant from "@/constants/events"

    export default {
        components: {datePicker, batchModal},
        created() {
            let vm = this;
            // let query = vm.$route.query;
            // if (query.course_id) {
            //     if (vm.courses && vm.courses.length) {
            //         vm.selectedCourse = vm.$store.getters.getCourseById(query.course_id);
            //     }
            // }
            // eventHub.$on(eventConstant.COURSE_LOADED, function () {
            //     if (query.course_id) {
            //         if (vm.courses && vm.courses.length) {
            //             vm.selectedCourse = vm.$store.getters.getCourseById(query.course_id);
            //         }
            //     }
            // });
            axios.get('http://127.0.0.1:5000/get', {
                   
                  })
                  .then(function (response) {

                    
                    vm.webinar1.data = response.data.data;
                    console.log(vm.webinar1)
                    
                  })
                  .catch(function (error) {
                    console.log(error);
                    
                  });
        },
        data() {
            return {
                date: null,
                batches: {},
                selectedCourse: null,
                selectedCourseId: null,
                cols: constants.cols,
                filters: constants.filters,
                currentBatch: null,
                webinar:[],
                webinar1:{data:[]}
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
        computed: {
            courses() {
                return this.$store.state.courses;
            }
        },
        methods: {
            showBatchModal(batch) {
                this.currentBatch = batch;
            },
            getSessionLink(batch) {
                return "sessions?batch_id=" + batch._id;
            },
            getBatchLastDate(batch) {
                let lastSession = _.last(batch.sessions);
                return lastSession ? lastSession.date : 'N/A';
            },
            paginationPageChanged(page) {
                if (this.batches.data && page != this.batches.current_page) {
                    this.getBatchesByCourseId(page);
                }
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
