<template>
    <div class="container">
        <div class="container justify-content-center">
            <h2>Create Webinar</h2>
            <hr>
            <form id="webinar_form" @submit.prevent="checkForm()">           
                <div class="card card-default">
                    <div class="card-header">General Info.</div>
                    <div class="card-body">
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
                                    <date-picker v-model="date" :config="{minDate: 'today'}"
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
                                  <mentorrr @oneMentor="addMentor" v-for="n in mentorrange" :key="n"></mentorrr>
                           </div>
                     </div>
                <hr>
                <div class="col-sm-4"></div>
                <div class="col-sm-8">
                    <button id="course-update" type="submit" class="btn btn-lg btn-primary">Save</button>
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
     import mentorrr from './mentorTest';
     import tinymce from 'vue-tinymce-editor';
     import datePicker from 'vue-flatpickr-component';
     import geolocation from '@/components/geolocation';
      export default {
       components: {
               mentorrr,tinymce,datePicker,geolocation
        },
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
                mentorrange:1
            }
        },
        methods: {
            addMentorRow(){

             this.mentorrange++;

            },
            addMentor(data){
                let vm = this;
                vm.mentorProfiles.push(data);
            },
            async checkForm(){
              let result=await this.$validator.validateAll();
              axios.post('http://127.0.0.1:5000/add', {
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
              // console.log(this.mentorProfiles)
            }
        }
    }
</script>

