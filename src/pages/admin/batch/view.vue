<template>
    <div class="modal docked docked-right in modal-slide" id="batch-view-modal"
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header ">
                    <div class="d-flex" style="width: 100%;justify-content: space-between">
                        <h5 class="modal-title " id="exampleModalLabel">
                            Batch <code>{{ batch.batch_name }}</code> details
                        </h5>
                        <button class="btn btn-primary btn-sm" @click="editBatch()">Edit Batch</button>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-4">
                            <h5>Days</h5>
                            <span class="badge badge-secondary mr-1" v-for="day in batch['days']">
                                {{ day.day }} - {{ day.time}}
                            </span>
                        </div>
                        <div class="col-md-4">
                            <h5>Mentors</h5>
                            <span v-if="batch.mentor">
                                {{ batch.mentor }}
                            </span>
                            <span v-else>
                                No Mentor Assigned
                            </span>
                        </div>
                        <div class="col-md-4">
                            <h5>location - timezone</h5>
                            {{ batch.location.formatted_address }} - {{ batch.time_zone}}
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-4">
                            <h5>course Plan</h5>
                            {{ batch.course_plan_id }}
                        </div>
                        <div class="col-md-4">
                            <h5>Course</h5>
                            {{ course.name }}
                        </div>
                        <div class="col-md-4">

                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-3">
                            <h5>Start Date</h5>
                            {{ formatDate(batch.start_date, "MMM DD YYYY") }}
                        </div>
                        <div class="col-md-3">
                            <h5>Duration</h5>
                            {{ batch.duration }}
                        </div>
                        <div class="col-md-3">
                            <h5>Mode Of Training</h5>
                            {{ batch.mode_of_training }}
                        </div>
                        <div class="col-md-3">
                            <h5>Status</h5>
                            {{ batch.status }}
                        </div>
                    </div>
                    <!--<hr>-->
                    <!--<h5>Modules</h5>-->
                    <!--<p v-for="module in batch.modules">-->
                        <!--{{ module.name }} ({{ getSessionCount(module._id) }} sessions)-->
                    <!--</p>-->
                    <hr>
                    <h5>Sessions</h5>
                    <table class="table" style="background-color: #fff">
                        <thead>
                        <tr>
                            <th scope="col">Heading</th>
                            <th scope="col">Topics</th>
                            <th scope="col">Module</th>

                            <th scope="col">Status</th>
                            <th scope="col">Date/Time</th>
                            <th scope="col">Mentor</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="session in batch.sessions">
                            <td>{{ session.heading}}</td>
                            <td>{{ session.topics.join(", ")}}</td>
                            <td>{{ getModuleName(session.module_id) }}</td>
                            <th>{{ session.status}}</th>
                            <td>{{ formatDate(session.date, "DD MMM YY")}} @ {{ session.time}} IST</td>
                            <td>{{ session.mentor}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .modal-lg {
        max-width: 70% !important;
    }
    .empty{
        align-items: center;
        justify-content: center;
    }
    .modal-slide .modal-dialog{
        animation:slide-modal 100ms ease-in;
    }
    @keyframes slide-modal{
        0%{
            opacity:0;
            transform:translate(100%,0)
        }
        100%{
            opacity:1;
            transform:translate(0,0)
        }
    }
</style>
<script>
    export default {
        name: "bview",
        props:['batch'],
        mounted() {
            let vm = this;
            let modal = $('#batch-view-modal');
            modal.modal({ keyboard: false });
            modal.on('hidden.bs.modal', function (e) {
                vm.$emit('closed');
            });
        },
        computed:{
            course(){
                return this.$store.getters.getCourseById(this.batch.course_id);
            }
        },
        methods:{
            editBatch(){
                $('#batch-view-modal').modal('hide');
                this.$router.push({ name: 'management.batch.edit', params:{batch_id:this.batch._id}})
            },
            getSessionCount(module_id){
                 let totalSessions = _.filter(this.batch.sessions, function (s) {
                     return s.module_id == module_id
                 });
                 return totalSessions? totalSessions.length : 0;
            },
            getModuleName(mid){
                let module = _.find(this.batch.modules, function(m) { return m._id === mid});
                return module ? module.name : 'N/A';
            }
        }
    }
</script>

<style scoped>
    .modal.docked .modal-body {
        background-color: #f6f9fc;
    }
    h5{
        font-weight: bold;
    }
</style>
