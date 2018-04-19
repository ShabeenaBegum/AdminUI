<template>
    <div>
        <div class="row">
            <div class="col-md-2" style="padding-right: 0;">
                <data-filter :filters="filters"/>
            </div>
            <div class="col-md-10">
                <div class="card card-default table-card">
                    <div class="card-body">
                        <data-grid :data="sessions" :columns="cols" @rowClicked="showSessionModal">
                            <template  slot-scope="{ row, col }" >
                                <span v-if="col === 'heading'">
                                    {{ row[col] }}
                                </span>
                                <span  v-else-if="col === 'course_id'" >
                                        {{ course(batch.course_id) ? course(batch.course_id).name : ''}}
                                </span>
                                <span  v-else-if="col === 'batch_name'" >
                                    {{ batch ? batch.batch_name : ''}}
                                </span>
                                <span
                                        v-else-if="col === 'status'"
                                        class="text-center d-block"
                                        :class="{
                                            completed: row.status === 'completed',
                                            cancelled: row.status === 'cancelled'
                                            }"
                                >
                                    <i
                                            class="fa fa-check-circle-o session-status-icon completed"
                                            title="Completed"
                                            v-tippy
                                            v-if="row.status === 'completed'"></i>
                                    <i
                                            class="fa fa-times-circle-o session-status-icon cancelled"
                                            title="Cancelled"
                                            v-tippy
                                            v-if="row.status === 'cancelled'"></i>
                                    <i
                                            class="fa fa-pause-circle-o session-status-icon pending"
                                            title="Pending"
                                            v-tippy
                                            v-if="row.status === 'pending'"></i>
                                </span>
                                <span @click.stop="showcurrentStudentRatingAttendanceModal(row)" class="text-center d-block cursor-pointer" v-else-if="col === 'rating'">
                                    4.1
                                </span>
                                <span v-else-if="col === 'date_time'">
                                    {{ formatDate(row.date, "DD MMM YY")}} @ {{ row.time}} IST
                                </span>
                                <!-- Rating -->
                                <span @click.stop="showcurrentStudentRatingAttendanceModal(row)" class="text-center d-block cursor-pointer" v-else-if="col === 'attendance'">
                                    21/30
                                </span>
                                <span

                                        v-tippy="{
                                            html: '#temp-'+converId(row._id),
                                            reactive : true,
                                            interactive : true,
                                            theme : 'light',
                                            trigger: 'click',
                                            animateFill : false }"
                                        class="text-center cursor-pointer d-block" v-else-if="col === 'recording'">
                                    2 Recordings

                                    <session-video-list
                                            :id="'temp-'+converId(row._id)"
                                            :recordings="[{ name: 'Recording 1'}, {name : 'Recording 2'}]">
                                    </session-video-list>

                                </span>
                                <span v-else-if="col === 'action'">
                                    <button @click="showActionModal(row)" class="btn btn-outline-info btn-sm">Action</button>
                                </span>
                                <span v-else>{{ row[col] }}</span>
                            </template>
                        </data-grid>
                    </div>
                </div>
            </div>
        </div>

        <student-rating-attendance
                @closed="currentStudentRatingAttendance = null"
                v-if="currentStudentRatingAttendance"></student-rating-attendance>
        <!-- Just for demo, move to component , and fix width issue-->
        <div class="modal fade" id="action-modal"
             tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">

                        <h4 class="modal-title" id="myModalLabel">Action on Batch </h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="currentSessionId" id="currentSessionId" value="29641">
                        <input type="hidden" name="currentBatchId" id="currentBatchId" value="3061">
                        <div class="form-group">
                            <label>Reason Type</label>
                            <select class="form-control">
                                <option value="0">
                                    Session Cancelled
                                </option><option value="1">
                                Session Delayed
                            </option><option value="2">
                                Others
                            </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Message</label>
                            <textarea class="form-control" rows="3">Today's Session has been cancelled</textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button id="notifyActionBtn" class="btn btn-primary">
<span>
<i class="fa fa-btn fa-check"></i>Notify Students
</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    /*tr:has(> td > span.completed){*/
        /*background: green;*/
    /*}*/
    span.completed {
        color: green;
    }
    span.cancelled {
        color: red;
    }
    .session-status-icon{
        font-size: 20px;
    }
    .session-status-icon.cancelled{
        color: red;
    }
    .session-status-icon.pending{
        color: orange;
    }
    .session-status-icon.completed{
        color: green;
    }
</style>
<script>
    import datePicker from 'vue-flatpickr-component';
    import constants from '@/constants/session/grid';
    import batchModal from '@/pages/admin/batch/view';
    import sessionVideoList from '@/components/Session/sessionVideoList';
    import StudentRatingAttendance from "@/components/Session/studentRatingAttendance";

    export default {
        name: "session-index",
        components: {StudentRatingAttendance, datePicker, batchModal, sessionVideoList},
        created() {
            let vm = this;
            let batchId = this.$route.query.batch_id;
            if(batchId){
                axios.get(window.batchUrl + "/batch/"+batchId)
                    .then(success => {
                        vm.batch = success.data.data;
                    })
                    .catch(error => {
                        log(error);
                    });
            }


        },
        data() {
            return {
                batch:null,
                batches: {},
                courses: [],
                cols: constants.cols,
                filters: constants.filters,
                currentActionModal:null,
                currentStudentRatingAttendance:null
            }
        },
        methods:{
            showSessionModal(data){
                log(data);
            },
            showActionModal(row){
                this.currentActionModal = row;
                $("#action-modal").modal();
            },
            showcurrentStudentRatingAttendanceModal(row){
                this.currentStudentRatingAttendance = row
            },
            course(id){
                return this.$store.getters.getCourseById(id);
            },
        },
        computed:{
            sessions(){
                if(this.batch){
                    return { data: this.batch.sessions};
                }
                return {data: []};
            }
        }
    }
</script>
