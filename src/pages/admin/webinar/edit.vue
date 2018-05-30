<template>
    <div class="container">
        <div class="container justify-content-center">
            <h2>Edit Webinar</h2>
            <hr>
            <form id="webinar_form" @submit.prevent="checkForm()">           
                <div class="card card-default">
                    <div class="card-header">General Info.</div>
                    <div class="card-body">
                      <div v-if="errors.items.length" class="alert alert-danger">
                            <strong>Oops !!  There are some validation error</strong>
                            <ul>
                                <li v-for="error in errors.items" v-text="error.msg"></li>
                            </ul>
                        </div>
                         <div class="row">
                            <div class="col">
                                <label for="title">Title<sup style="color:red">*</sup></label>
                                 <input v-model="title" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="title" name="title" class="form-control">
                                  <span v-show="errors.has('title')"
                                          class="help text-danger">
                                        {{ errors.first('title') }}
                                  </span>
                            </div>
                            <div class="col">
                                <label for="topic">Topic<sup style="color:red">*</sup></label>
                                 <input v-model="topic" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="topic" name="topic" class="form-control">
                                  <span v-show="errors.has('topic')"
                                          class="help text-danger">
                                        {{ errors.first('topic') }}
                                  </span>
                            </div>
                            <div class="col">
                               <label for="descrption">Descrption<sup style="color:red">*</sup></label>
                                 <input v-model="description" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="descrption" name="descrption" class="form-control">
                                  <span v-show="errors.has('descrption')"
                                          class="help text-danger">
                                        {{ errors.first('descrption') }}
                                  </span>
                            </div>
                         </div>
                         <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="date">Seminar Date</label>
                                    <date-picker v-model="date" 
                                                 class="form-control form-control-sm"
                                                 v-validate="'required'"
                                                 name="start_date"
                                                 data-vv-value-path="innerValue"
                                                 :has-error="errors.has('date')">
                                    </date-picker>
                                </div>
                            </div>
                            <div class="col">
                                <label for="start_time">Start Time</label>
                                <date-picker v-model="start_time"
                                             :config="{enableTime: true,noCalendar: true,dateFormat: 'H:i'}"
                                             class="form-control form-control-sm"
                                             v-validate="'required'"
                                             :has-error="errors.has('selectedDay.day')">
                                </date-picker>
                            </div>
                            <div class="col">
                                <label for="duration">Duration</label>
                                <select id="duration" name="duration" v-model="duration"  class="form-control" v-validate="{ required: true}" >
                                        <option value="30">30 min.</option>
                                        <option value="1.30">1.30 hours.</option>
                                        <option value="2.00">2.00 hours</option>
                                        <option value="2.30">2.30 hours</option>
                                        <option value="3.00">3.00 hours</option>
                                </select>
                            </div>

                         </div>
                         <div class="row">
                            <div class="col">
                                <label for="course">Course</label>
                                <select id="course" name="course" v-model="course" class="form-control" v-validate="{ required: true}">
                                        <option value="bigdata">BigData</option>
                                        <option value="datascience">Data Science</option>
                                </select>
                            </div>
                            <div class="col">
                                <label for="category">Category</label>
                                <select id="category" name="category" v-model="category" class="form-control" v-validate="{ required: true}" >
                                        <option value="online">Online</option>
                                        <option value="offline">Offline</option>
                                </select>
                                
                            </div>
                            <div class="col">
                               <div v-if="category==='offline'">     
                                    <div class="form-group">
                                        <label for="location">Location</label>
                                        <geolocation id="map" v-model="address" class="form-control form-control-sm" v-validate="{ required: true}"/>
                                    </div>
                               </div>
                            </div>
                         </div>
                         <div class="row">
                            <div class="col">
                                <label for="">About the seminer<sup style="color:red">*</sup></label>
                                <tinymce id="d1"  v-model="about_the_seminar"></tinymce>
                            </div>
                         </div>
                         <div class="row">
                            <div class="col">
                                <label for="">What do you need to bring?<sup style="color:red">*</sup></label>
                                <tinymce id="d2" v-model="requirement"></tinymce>
                            </div>
                         </div>
                    </div>
                </div>
                <hr>
                     <div class="card card-default">
                           <div class="card-header">
                              <div class="row">
                                  <div class="col-md-5">
                                    <h4>Mentor Profile</h4>
                                  </div>
                                  <div class="col-md-5">
                                  </div>
                                  <div class="col">
                                     <button type="button" class="btn btn-primary" @click="addMentorRow()">Add Mentor</button>
                                  </div>
                              </div>
                               
                           </div>

                           <div class="card-body">
                                  <mentorrrr @deleteMentor="deletementor" @editoneMentor="function (a, b) { editMentor( a, b) }" :one="mentors" v-for="(mentors,index) in mentorProfiles" :currentindex="index" :key="mentors.name"></mentorrrr>
                                  <mentorrr @oneMentor="addMentor" v-if="shwAddMentor"></mentorrr>
                           </div>
                     </div>
                <hr>
                <div class="col-sm-4"></div>
                <div class="col-sm-8">
                    <button id="course-update" type="submit" class="btn btn-lg btn-success">Update webinar</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script type="text/javascript">
    tinymce.init({
        menubar: false,
        statusbar: false,
        toolbar: false
    });
</script>
<script>
     import mentorrrr from './mentoredit';
     import mentorrr from './mentorTest';
     import tinymce from 'vue-tinymce-editor';
     import datePicker from 'vue-flatpickr-component';
     import geolocation from '@/components/geolocation';
      export default {
       components: {
               mentorrr,mentorrrr,tinymce,datePicker,geolocation
        },
        props:['webinar_id'],
        data() {
            return{
                
                title:'',
                topic:'',
                description:'',
                date:'',
                start_time:'',
                duration:'',
                category:'',
                course:'',
                address:'',
                requirement:'',
                about_the_seminar:'',
                mentorProfiles:[],
                mentorrange:1,
                select_webinar:'',
                mentorrange:0,
                all_webiners:[],
                shwAddMentor:false
            }
        },
        async created() {
           let vm = this;
           log(this.webinar_id)
           axios.get('http://127.0.0.1:5000/get/'+this.webinar_id, {
   
                  })
                  .then(function (response) {
                    
                    console.log(response.data.data);
                    vm.title=response.data.data.title;
                    vm.topic=response.data.data.topic;
                    vm.description=response.data.data.description;
                    vm.date=response.data.data.seminar_date;
                    vm.start_time=response.data.data.start_time;
                    vm.duration=response.data.data.duration;
                    vm.category=response.data.data.category;
                    vm.course=response.data.data.course;
                    vm.requirement=response.data.data.requirement;
                    vm.about_the_seminar=response.data.data.about_the_seminar;
                    vm.mentorProfiles=response.data.data.mentor;
                  })
                  .catch(function (error) {
                    console.log(error);
                    
                  });
        },
        methods: {
            addMentorRow(){

             this.shwAddMentor = true;

            },
            addMentor(data){
                let vm = this;
                vm.mentorProfiles.push(data);
                vm.shwAddMentor = false;
            },
            editMentor(data, id){
                let vm = this;
                // vm.mentorProfiles.push(data);
                this.mentorProfiles[id]=data;
            },
            deletementor(index){
                this.mentorProfiles.splice(index, 1);
            },
            async webinarchange(){
              let vm = this;
              axios.get('http://127.0.0.1:5000/get/'+this.select_webinar, {

                  })
                  .then(function (response) {
                    
                    // console.log(response.data.data);
                    vm.title=response.data.data.title;
                    vm.topic=response.data.data.topic;
                    vm.description=response.data.data.description;
                    vm.date=response.data.data.seminar_date;
                    vm.start_time=response.data.data.start_time;
                    vm.duration=response.data.data.duration;
                    vm.category=response.data.data.category;
                    vm.course=response.data.data.course;
                    vm.requirement=response.data.data.requirement;
                    vm.about_the_seminar=response.data.data.about_the_seminar;
                    vm.mentorProfiles=response.data.data.mentor;

                  })
                  .catch(function (error) {
                    console.log(error);
                    
                  });
            },
            async checkForm(){
              let result=await this.$validator.validateAll();
              if(result && this.mentorProfiles.length){

                axios.put('http://127.0.0.1:5000/update/'+this.select_webinar, {
                    "title":this.title,
                    "topic":this.topic,
                    "description":this.description,
                    "start_time":this.start_time,
                    "duration":this.duration,
                    "course":this.course,
                    "category":this.category,
                    "requirement":this.requirement,
                    "address":this.address.city,
                    "mentor":this.mentorProfiles,
                    "about_the_seminar":this.about_the_seminar,
                    "seminar_date":this.date

                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                    
                  });

              }
              
            }
        }
    }
</script>

