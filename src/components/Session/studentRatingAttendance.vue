<template>
    <div class="modal docked docked-right in modal-slide" id="studentRatingAttendance-modal"
         tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="d-flex" style="width: 100%;justify-content: space-between">
                        <h5 class="modal-title">
                            Rating and Attendance
                        </h5>
                        <!--<button class="btn btn-primary btn-sm" v-if="!editAttendance" @click="editAttendance = true">Edit Attendance</button>-->
                        <!--<button class="btn btn-success btn-sm" v-if="editAttendance" @click="editAttendance = false">Save Attendance</button>-->
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row mb-4">
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-header text-center  bg-dark text-white">
                                    Total  <br>
                                    {{ students.length }}<br>
                                    <small>Students</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-header text-center  bg-dark text-white">
                                      Attendance <br>
                                      <small>Present : {{presentStudents.length}} </small><br>
                                      <small>Absent : {{absentStudents.length}}</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-header text-center  bg-dark text-white">
                                    Video Views <br>
                                    3 <br><small>by {{ students.length }} students</small>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="card">
                                <div class="card-header text-center bg-dark text-white">
                                    Avg Rating <br>
                                    4.2 <br><small>by {{ students.length }} students</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table class="table bg-white has-shadow">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Attendance</th>
                            <th scope="col">Video View</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Comments</th>
                            <th scope="col">Parameter</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(student, index) in students" :key="index">
                            <th scope="row">{{ student.name }}</th>
                            <td>{{ student.email }}</td>
                            <td class="text-capitalize">
                                {{ student.attendance }}<br>
                                <small>
                                    <a href="#" @click.prevent="toggleAttendance(student, false)" v-if="student.attendance === 'present' ">
                                        Mark Absent
                                    </a>
                                    <a href="#" @click.prevent="toggleAttendance(student, true)" v-else>
                                        Mark Present
                                    </a>
                                </small>
                            </td>
                            <td>{{ student.video_view }}</td>
                            <td>{{ student.rating }}</td>
                            <td>{{ _dis(student.comments) }}</td>
                            <td>
                                {{ student.parameter.join(', ') }}
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    <div>
                        <h5>Feedback Parameters	</h5>
                        <table class="table bg-white has-shadow" id="feedBackTable" style="font-size:12px;">
                            <thead>
                            <tr>
                                <th>Feedback Parameters</th>
                                <th> Percentage students unhappy </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Practical exposure during session</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Mentors response to queries</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Interaction between mentor &amp; student</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Quality of session content</td>
                                <td>0%</td>
                            </tr>
                            <tr>
                                <td>Punctuality of session delivery</td>
                                <td>0%</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .modal-lg {
        max-width: 80%;
    }
    .empty{
        align-items: center;
        justify-content: center;
    }
    .modal.docked .modal-body {
        padding-top: 65px;

    }
    .modal.docked .modal-body {
        background-color: #f6f9fc;
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
        name: "studentRatingAttendance",
        mounted() {
            let vm = this;
            let modal = $('#studentRatingAttendance-modal');
            modal.modal({ keyboard: true });
            modal.on('hidden.bs.modal', function (e) {
                vm.$emit('closed');
            });
        },
        data(){
            return {
                editAttendance: false,
                students:[
                    {
                        name: 'Pankaj ',
                        email: "pankaj@acadgild.com",
                        attendance: "present",
                        video_view: false,
                        rating: 4,
                        comment: "video quality is too bad there is no audio able facility for recording.",
                        parameter:[]
                    },
                    {
                        name: 'Panwwewewekaj 1',
                        email: "pankaj@acadgild.com",
                        attendance: "absent",
                        video_view: true,
                        rating: 4,
                        comment: "video quality is too bad there is no audio able facility for recording.",
                        parameter:[]
                    },
                    {
                        name: 'asdads 2',
                        email: "pankaj@acadgild.com",
                        attendance: "absent",
                        video_view: false,
                        rating: 3,
                        comment: "video quality is too bad there is no audio able facility for recording.",
                        parameter:[
                            "Parameter 1",
                            "Parameter 2",
                        ]
                    },
                    {
                        name: 'fddfdf ',
                        email: "pankaj@acadgild.com",
                        attendance: "present",
                        video_view: false,
                        rating: 4,
                        comment: "video quality is too bad there is no audio able facility for recording.",
                        parameter:[]
                    },
                    {
                        name: 'fodfkodfl ',
                        email: "pankaj@acadgild.com",
                        attendance: "present",
                        video_view: false,
                        rating: 4,
                        comment: "video quality is too bad there is no audio able facility for recording.",
                        parameter:[]
                    },
                    {
                        name: 'klxkocxc ',
                        email: "pankaj@acadgild.com",
                        attendance: "present",
                        video_view: false,
                        rating: 4,
                        comment: "video quality is too bad there is no audio able facility for recording.",
                        parameter:[]
                    }

                ]
            }
        },
        methods:{
            toggleAttendance(student, present){
                //make ajax call
                if(present){
                    student.attendance = "present";
                }else{
                    student.attendance = "absent";
                }
            }
        },
        computed:{
            presentStudents(){
                return _.filter(this.students, function (s) {
                    return s.attendance === "present";
                })
            },
            absentStudents(){
                return _.filter(this.students, function (s) {
                    return s.attendance !== "present";
                })
            },
        }
    }
</script>

<style scoped>

</style>