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
                                        {{ course(batch.course_id).name}}
                                </span>
                                <span
                                        v-else-if="col === 'status'"
                                        :class="{
                                            completed: row.status === 'completed',
                                            cancelled: row.status === 'cancelled'
                                            }"
                                >
                                    {{ row.status }}
                                </span>
                                <span v-else-if="col === 'rating'">
                                    4.1
                                </span>
                                <span v-else-if="col === 'date_time'">
                                    {{ formatDate(row.date, "DD MMM YY")}} @ {{ row.time}} IST
                                </span>
                                <!-- Rating -->
                                <span v-else-if="col === 'attendance'">
                                    21/30
                                </span>
                                <span v-else-if="col === 'recording'">
                                    View
                                </span>
                                <span v-else-if="col === 'no_of_students'">
                                    61
                                </span>

                                <span v-else-if="col === 'session'" title="View Sessions"
                                      v-tippy>
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
