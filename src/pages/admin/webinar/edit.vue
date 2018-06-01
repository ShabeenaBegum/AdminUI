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
                                    <date-picker v-model="from_date" 
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
                                    <date-picker v-model="to_date" 
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
                         <div class="row">
                            <div class="col">
                                   <label for="url">URL<sup style="color:red">*</sup></label>
                                   <input v-model="url" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="url" name="url" class="form-control">
                                    <span v-show="errors.has('url')"
                                            class="help text-danger">
                                          {{ errors.first('url') }}
                                    </span>
                            </div>
                            <div class="col">
                                   <label for="event_cost">Event Cost<sup style="color:red">*</sup></label>
                                   <input v-model="event_cost" v-validate="{ required: true, regex: /^[0-9][0-9]*$/ }" type="text" id="event_cost" name="event_cost" class="form-control">
                                    <span v-show="errors.has('event_cost')"
                                            class="help text-danger">
                                          {{ errors.first('event_cost') }}
                                    </span>
                            </div>
                            <div class="col">
                                    <label for="timezone">Time Zone<sup style="color:red">*</sup></label>
                                     <select id="timezone" name="timezone" v-model="timezone" class="form-control" v-validate="{ required: true}" >
                                                <option disabled value="">Please select one</option>
                                                <option value="ist">IST</option>
                                                <option value="pst">EST</option>
                                                <option value="est">PST</option>
                                     </select>
                            </div>
                         </div>
                         <div v-if="event_type==='seminar' || event_type==='workshop'">
                          <div class="row">
                            <div class="col">
                              <div class="form-group">
                                        <label for="location">Location</label>
                                        <geolocation id="city" name="city" v-model="city" class="form-control form-control-sm" v-validate="{ required: true}"/>
                                        <span v-show="errors.has('city')"
                                          class="help text-danger">
                                        {{ errors.first('city') }}
                                  </span>
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
                                 <input v-model="google_link" v-validate="{ required: true }" type="text" id="google_link" name="google_link" class="form-control">
                                  <span v-show="errors.has('google_link')"
                                          class="help text-danger">
                                        {{ errors.first('google_link') }}
                                  </span>
                            </div>
                          </div>
                         </div>
                        <div class="row">
                            <div class="col">
                                <label for="">About the {{event_type}}<sup style="color:red">*</sup></label>
                                <tinymce id="d1"  v-model="about_the_event"></tinymce>
                            </div>
                         </div>
                    </div>
                </div>
                <hr>
                 <div class="card card-default">
                       <div class="card-header">
                          <h4>Sub Heading</h4>
                       </div>
                       <div class="card-body">
                          <editsubheading @editHeading="function (a, b) { editsubHeadingArray( a, b) }" :one="subheading" v-for="(subheading,index) in sub_heading_array" :key="index" :index="index" :currentindex="index"></editsubheading>
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
                              <updateeventmentor @deleteMentor="deletementor" @editoneMentor="function (a, b) { editMentor( a, b) }" :one="mentors" v-for="(mentors,index) in mentor_array" :currentindex="index" :key="mentors.name"></updateeventmentor>
                              <eventmentor @oneMentor="addMentor" v-if="shwAddMentor"></eventmentor>
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
     import updateeventmentor from './mentoredit';
     import eventmentor from './mentorTest';
     import editsubheading from './editsubheading';
     import tinymce from 'vue-tinymce-editor';
     import datePicker from 'vue-flatpickr-component';
     import geolocation from '@/components/geolocation';
      export default {
       components: {
               eventmentor,updateeventmentor,tinymce,datePicker,geolocation,editsubheading
        },
        props:['webinar_id'],
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
                url:'',
                event_cost:0,
                timezone:'',
                sub_heading_array:[],
                subrange:0,
                mentor_array:[],
                mentor_search:'',
                mentorrange:0,

                ///////////////////////////
                select_webinar:'',
                mentorrange:0,
                all_webiners:[],
                shwAddMentor:false
            }
        },
        async created() {
           let vm = this;
           // log(this.webinar_id)
           axios.get('http://127.0.0.1:5000/get/'+this.webinar_id, {
   
                  })
                  .then(function (response) {
                    
                    // console.log(response.data.data);
                    vm.about_the_event=response.data.data.about_the_event
                    vm.address=response.data.data.address
                    vm.city=response.data.data.city
                    vm.description=response.data.data.description
                    vm.event_category=response.data.data.event_category
                    vm.event_cost=response.data.data.event_cost
                    vm.event_type=response.data.data.event_type
                    vm.from_date=response.data.data.from_date
                    vm.from_time=response.data.data.from_time
                    vm.google_link=response.data.data.google_link
                    vm.mentor_array=response.data.data.mentor_array
                    vm.product_category=response.data.data.product_category
                    vm.status=response.data.data.status
                    vm.sub_heading_array=response.data.data.sub_heading_array
                    vm.timezone=response.data.data.timezone
                    vm.title=response.data.data.title
                    vm.to_date=response.data.data.to_date
                    vm.to_time=response.data.data.to_time
                    vm.topic=response.data.data.topic
                    vm.url=response.data.data.url
                    // console.log(vm.sub_heading_array);
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
                log(data);
                log(id);
                // this.mentorProfiles[id]=data;
            },
            deletementor(index){
                this.mentorProfiles.splice(index, 1);
            },
            editsubHeadingArray (data,id){
                let vm = this;
                // vm.mentorProfiles.push(data);
                this.sub_heading_array[id]=data;
            },
            async checkForm(){
              let result=await this.$validator.validateAll();
              if(result && this.mentorProfiles.length){

                // axios.put('http://127.0.0.1:5000/update/'+this.select_webinar, {
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
                //     console.log(response);
                //   })
                //   .catch(function (error) {
                //     console.log(error);
                    
                //   });

              }
              
            }
        }
    }
</script>

