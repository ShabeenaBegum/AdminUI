<template>
    <div class="container">
        <div class="container justify-content-center">
            <h2>Create Webinar</h2>
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
                             <label for="event_type">Event type<sup style="color:red">*</sup></label>
                             <select id="event_type" name="event_type" v-model="event_type" class="form-control" v-validate="{ required: true}" >
                                        <option disabled value="">Please select one</option>
                                        <option value="webinar">Webinar</option>
                                        <option value="seminar">Seminar</option>
                                        <option value="workshop">Workshop</option>
                             </select>
                          </div>
                          <div class="col">
                            <label for="event_category">Event category<sup style="color:red">*</sup></label>
                             <select id="event_category" name="event_category" v-model="event_category" class="form-control" v-validate="{ required: true}" >
                                        <option disabled value="">Please select one</option>
                                        <option value="technology">Technology</option>
                                        <option value="career">Career</option>
                             </select>
                          </div>
                          <div class="col">
                            <label for="product_category">Product category<sup style="color:red">*</sup></label>
                             <select id="product_category" name="product_category" v-model="product_category" class="form-control" v-validate="{ required: true}" >
                                        <option disabled value="">Please select one</option>
                                        <option value="bigdata">Big Data</option>
                                        <option value="datascience">Data Science</option>
                             </select>
                          </div>
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
                                    <label for="from_date">From Date</label>
                                    <date-picker v-model="from_date" :config="{minDate: 'today'}"
                                                 class="form-control form-control-sm"
                                                 v-validate="'required'"
                                                 name="from_date"
                                                 data-vv-value-path="innerValue"
                                                 :has-error="errors.has('from_date')">
                                    </date-picker>
                                </div>
                            </div>
                            <div class="col">
                                <label for="from_time">From Time</label>
                                <date-picker v-model="from_time"
                                             :config="{enableTime: true,noCalendar: true,dateFormat: 'H:i'}"
                                             class="form-control form-control-sm"
                                             v-validate="'required'"
                                             name="from_time"
                                             :has-error="errors.has('selectedDay.day')">
                                </date-picker>
                            </div>
                            <div class="col">
                                <div class="form-group">
                                    <label for="to_date">To Date</label>
                                    <date-picker v-model="to_date" :config="{minDate: 'today'}"
                                                 class="form-control form-control-sm"
                                                 v-validate="'required'"
                                                 name="to_date"
                                                 data-vv-value-path="innerValue"
                                                 :has-error="errors.has('to_date')">
                                    </date-picker>
                                </div>
                            </div>
                            <div class="col">
                                <label for="to_time">To Time</label>
                                <date-picker v-model="to_time"
                                             :config="{enableTime: true,noCalendar: true,dateFormat: 'H:i'}"
                                             class="form-control form-control-sm"
                                             v-validate="'required'"
                                             name="to_time"
                                             :has-error="errors.has('selectedDay.day')">
                                </date-picker>
                            </div>
                         </div>
                         <div v-if="event_type==='seminar' || event_type==='workshop'">
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                        <label for="location">Location</label>
                                        <geolocation id="map" v-model="city" class="form-control form-control-sm" v-validate="{ required: true}"/>
                               </div>
                            </div>
                            <div class="col">
                                 <label for="address">Address<sup style="color:red">*</sup></label>
                                 <input v-model="address" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="address" name="address" class="form-control">
                                  <span v-show="errors.has('address')"
                                          class="help text-danger">
                                        {{ errors.first('address') }}
                                  </span>
                            </div>
                            <div class="col">
                                <label for="google_link">Google Link<sup style="color:red">*</sup></label>
                                 <input v-model="google_link" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="google_link" name="google_link" class="form-control">
                                  <span v-show="errors.has('google_link')"
                                          class="help text-danger">
                                        {{ errors.first('google_link') }}
                                  </span>
                            </div>
                          </div>
                         </div>
                         <div class="row">
                            <div class="col">
                                <label for="about_the_event">About the {{event_type}}<sup style="color:red">*</sup></label>
                                <tinymce id="d1"  v-model="about_the_event" v-validate="'required'"
                                             name="About_the_seminar"
                                             :has-error="errors.has('about_the_event')"></tinymce>
                            </div>
                         </div>
                    </div>
                </div>
                <hr>
                <div class="card card-default">
                           <div class="card-header">
                              <div class="row">
                                  <div class="col-md-5">
                                    <h4>Sub headings</h4>
                                  </div>
                                  <div class="col-md-5">
                                  </div>
                                  <div class="col">
                                     <button type="button" class="btn btn-primary" @click="addSubEvent()">Add Sub heading</button>
                                  </div>
                              </div>
                               
                           </div>

                           <div class="card-body">
                                  <subheading @oneheading="addSubHeading" v-for="n in subrange" :key="n" :index="n"></subheading>
                           </div>
                     </div>
               <!--  <hr>
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
                 </div> -->
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
     import subheading from './subheading';
     import tinymce from 'vue-tinymce-editor';
     import datePicker from 'vue-flatpickr-component';
     import geolocation from '@/components/geolocation';
      export default {
       components: {
               mentorrr,tinymce,datePicker,geolocation,subheading
        },
        data() {
            return{
                
                event_type:'',
                event_category:'',
                product_category:'',
                title:'',
                topic:'',
                description:'',
                from_date:'',
                from_time:'',
                to_date:'',
                to_time:'',
                city:'',
                address:'',
                google_link:'',
                about_the_event:'',
                sub_heading_array:[],
                subrange:0,
                mentorProfiles:[],
                mentorrange:1
            }
        },
        methods: {
            addSubEvent(){
               this.subrange++;
            },
            addSubHeading(data){
               this.sub_heading_array.push(data);
            },
            addMentorRow(){

             this.mentorrange++;

            },
            addMentor(data){
                let vm = this;
                vm.mentorProfiles.push(data);
            },
            async checkForm(){
              let result=await this.$validator.validateAll();
              // console.log(this.sub_heading_array);
              if(result && this.mentorProfiles.length){

                // axios.post('http://127.0.0.1:5000/add', {
                //     "title":this.title,
                //     "topic":this.topic,
                //     "description":this.description,
                //     "start_time":this.start_time,
                //     "duration":this.duration,
                //     "course":this.course,
                //     "category":this.category,
                //     "requirement":this.requirement,
                //     "address":this.address.city,
                //     "mentor":this.mentorProfiles,
                //     "about_the_seminar":this.about_the_seminar,
                //     "seminar_date":this.date

                //   })
                //   .then(function (response) {
                //     if(response.data.message==='valid'){
                //        sflash('Webinar created');
                //     }
                //     else if(response.data.message==='invalid'){
                //       sflash('Please try again','error');
                //     }
                //   })
                //   .catch(function (error) {
                //     console.log(error);
                    
                //   });

              }
              else
                sflash('Please fill up all the fields','error');
            }
        }
    }
</script>

