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
                                <span  v-if="col === 'course_id'" >
                                        {{ course(batch.course_id) ? course(batch.course_id).name : ''}}
                                </span>
                                <span
                                        v-else-if="col === 'status'"
                                        class="text-center d-block"
                                        :class="{
                                            completed: row.status === 'completed',
                                            cancelled: row.status === 'cancelled'
                                            }"
                                >
                                    <i class="fa fa-check-circle-o session-status-icon completed" v-if="row.status === 'completed'"></i>
                                    <i class="fa fa-times-circle-o session-status-icon cancelled" v-if="row.status === 'cancelled'"></i>
                                    <i class="fa fa-pause-circle-o session-status-icon pending" v-if="row.status === 'pending'"></i>
                                </span>
                                <span class="text-center d-block" v-else-if="col === 'rating'">
                                    4.1
                                </span>
                                <span v-else-if="col === 'date_time'">
                                    {{ formatDate(row.date, "DD MMM YY")}} @ {{ row.time}} IST
                                </span>
                                <!-- Rating -->
                                <span class="text-center d-block" v-else-if="col === 'attendance'">
                                    21/30
                                </span>
                                <span class="text-center d-block" v-else-if="col === 'recording'">
                                    View
                                </span>
                                <span class="text-center d-block" v-else-if="col === 'no_of_students'">
                                    61
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

    export default {
        name: "session-index",
        components: {datePicker, batchModal},
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
            }
        },
        methods:{
            showSessionModal(data){
                log(data);
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
