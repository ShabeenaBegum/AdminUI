<template>
    <div class="container">
        <div class="container justify-content-center">
            <h2>Create Course</h2>
            <hr>
            <form id="course_form" @submit.prevent="checkForm()">
                <div class="card card-default">
                    <div class="card-header">Type Info.</div>
                    <div class="card-body">

                        <div class="row">
                            <div class="col">
                                <div class="form-group">
                                    <label for="type">Type</label>
                                    <select id="type" name="type" v-model="type" @change="typeSelection()" class="form-control" >
                                        <option value="bundle">Bundle</option>
                                        <option value="parent">Parent</option>
                                        <option value="course">Course</option>
                                        <option value="category">Category</option>
                                     </select>
                                </div>
                            </div>
                            <div class="col">
                            </div>
                            <div class="col">
                            </div>
                        </div>
                        <div v-if="type==='bundle' || type==='course'">
                            <div class="row">
                                <div class="col">
                                    <label for="parentcourse">Parent Course</label>

                                    <select name="parentcourse" v-model="parent_course" class="form-control">
                                          <option v-for="item in parentcourse" v-bind:value="item._id" :key="item._id">
                                            
                                              {{item.name}}
                                            
                                          </option> 
                                    </select>
                                </div>
                                <div class="col">
                                    <label for="course_catergory">Course Category</label>
                                    <select id="course_catergory" v-model="course_catergory" name="course_catergory" class="form-control" >
                                    <option value="big data and analytics">Big Data and Analytics</option>
                                    <option value="technical courses">Technical Courses</option>
                                    <option value="project management">Project Management</option>
                                    <option value="certification courses">Certification Courses</option>
                                    <option value="self paced courses">Self Paced Courses</option>
                                </select>
                                </div>
                                <div class="col">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="card card-default">
                    <div class="card-header">Basic Info.</div>
                    <div class="card-body">

                        <div class="row">
                            <div class="col">
                                 <label for="name">Name<sup style="color:red">*</sup></label>
                                 <input v-model="name" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="course_name" name="name" class="form-control" >
                                  <span v-show="errors.has('name')"
                                          class="help text-danger">
                                        {{ errors.first('name') }}
                                  </span>
                            </div>
                            <div class="col">
                                <label for="description">URI<sup style="color:red">*</sup></label>
                                <input type="text" v-model="description" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" id="course_description" name="description" class="form-control">
                                 <span v-show="errors.has('description')"
                                          class="help text-danger">
                                        {{ errors.first('description') }}
                                 </span>
                            </div>
                            <div class="col">
                                <div v-if="type==='course'">
                                <label for="shortname">Short Name<sup style="color:red">*</sup></label>
                                <input type="text" v-model="shortname" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" id="short_name" name="short_name" class="form-control">
                                <span v-show="errors.has('short_name')"
                                          class="help text-danger">
                                        {{ errors.first('short_name') }}
                                </span>
                                </div>
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="active"> Active</label>
                                <select id="course_active" v-model="active" name="active" class="form-control" >
                                    <option value="true">yes</option>
                                    <option value="false">no</option>
                                </select>
                            </div>
                            
                            <div class="col">
                                <div v-if="type==='course'|| type==='bundle'">
                                <label for="free_course"> Free Course</label>
                                <select id="course_free" v-model="free_course" name="free" class="form-control" >
                                    <option value="false">no</option>
                                    <option value="true">yes</option>
                                </select>
                            </div>
                            </div>
                            <div class="col">
                                <div v-if="type==='course'">
                                <label for="mod_of_training">Mode Of Training</label>
                                <select id="mod_of_training" v-model="mod_of_training" name="mod_of_training" class="form-control" >
                                    <option value="online">Online</option>
                                    <option value="offline">Offline</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <!--  -->
                        <div v-if="type==='course'">
                        <div class="row">
                            <div class="col">
                            <label for="certificationlink">Certification Link<sup style="color:red">*</sup></label>
                            <input type="text" v-model="certificationlink" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" id="certificationlink" name="description" class="form-control">
                             <span v-show="errors.has('certificationlink')"
                                      class="help text-danger">
                                    {{ errors.first('certificationlink') }}
                             </span>
                             </div>
                             <div class="col">
                             </div>
                             <div class="col">
                             </div>
                        </div>
                        </div>
                        <!--  -->
                    </div>
                </div>
                <div v-if="type==='course' || type==='bundle'" >
                <hr>
                <div class="card card-default">
                    <div class="card-header">University Info</div>
                    <div class="card-body">  
                        <div class="row">
                            <div class="col">
                                <label for="university_category">Course Category</label>
                                <select id="university_category" v-model="university_category" name="university_category" class="form-control" >
                                <option value="acadgild">Acadgild</option>
                                <option value="bdu">BDU</option>
                                <option value="pu">PU</option>
                                <option value="nmims">NMIMS</option>
                                <option value="aima">AIMA</option>
                               </select>
                            </div>
                            <div class="col">
                                <label for="certification_category">Certification Category</label>
                                 <div v-if="university_category ==='acadgild'">
                                    <select id="certification_category" v-model="certification_category" name="certification_category" class="form-control" >
                                    <option value="certification">Certification</option>
                                    <option value="nonocertification">Non Certification</option>
                                    </select>
                                 </div>
                                 <div v-else-if="university_category ===''">
                                    <select id="certification_category" v-model="certification_category" name="certification_category" class="form-control" >
                                    <option value="certification">Certification</option>
                                    <option value="nonocertification">Non Certification</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="masters">Masters</option>
                                    </select>
                                 </div>
                                 <div v-else>
                                    <select id="certification_category" v-model="certification_category" name="certification_category" class="form-control" >
                                    <option value="diploma">Diploma</option>
                                    <option value="masters">Masters</option>
                                    </select>
                                 </div>

                            </div>
                        </div>
                    </div>
                </div> 
                </div>
                <div v-if="type==='course'">
                <hr>
                 <div class="card card-default">
                    <div class="card-header">Display Info</div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col">
                               <label for="course_info">Course Info<sup style="color:red">*</sup></label>
                                <input type="text" v-model="course_info" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" id="course_info" name="course_info" class="form-control">
                                <span v-show="errors.has('course_info')"
                                          class="help text-danger">
                                        {{ errors.first('course_info') }}
                                </span>
                            </div>
                            <div class="col">
                                <label for="learner">Learner<sup style="color:red">*</sup></label>
                                <input type="text" v-model="learner" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" id="learner" name="learner" class="form-control">
                                <span v-show="errors.has('learner')"
                                          class="help text-danger">
                                        {{ errors.first('learner') }}
                                </span>
                            </div>
                            <div class="col">
                                <label for="learner_increament">Learner Increament<sup style="color:red">*</sup></label>
                                 <vue-slider v-model="learner_increament"></vue-slider>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="rating_increament">Rating Increament<sup style="color:red">*</sup></label>
                                 <vue-slider v-model="rating_increament"></vue-slider>
                            </div>
                            <div class="col">
                                
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div v-if="type==='bundle'">
                    <hr>
                    <div class="card card-default">
                       <div class="card-header">Bundle  Info.</div>
                       <div class="card-body">
                            <div class="row">
                                <div class="col">
                                      <label for="bundlecourse">Bundle Courses</label>
                                      <select name="bundlecourse" v-model="selected" multiple>
                                         
                                          <option v-for="item in course" v-bind:value="item._id" :key="item._id">
                                            {{ item.name }}
                                          </option>
                                      </select>
                                      
                                </div>
                                <div class="col">
                                   
                                </div>
                                <div class="col">

                                </div>
                                
                            </div>

                       </div>
                   </div>
                </div>
                <hr>
                <div class="col-sm-4"></div>
                <div class="col-sm-8">
                    <button id="course-update" type="submit" class="btn btn-lg btn-primary" :disabled="errors.items.length">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import vueSlider from 'vue-slider-component';
    export default {
       components: {
    vueSlider
  },
       data() {
            return{
                type: '',
                name:'',
                description:'',
                shortname:'',
                active:false,
                free_course:false,
                course_freemium:false,
                course_degree:'',
                course_type:'',
                parent_course:'',
                course_catergory:'',
                university_category:'',
                certification_category:'',
                selected:[],
                course:[],
                rating_increament:[1,5],
                learner_increament:[1,5]

            }
        },
        computed:{
            parentcourse(){
                var parentcourse=[];
                var i=0;
                this.course.forEach(function(element) {
                  if(element.type==='parent'){
                    parentcourse[i]=element;
                    i++;
                  }

                });
                return parentcourse;
            }
        },
        methods: {
            checkForm(e) {
                    if(this.active==="true"){
                        this.active=true;
                    }
                    if(this.active==="false"){
                        this.active=false;
                    }
                     if(this.free_course==="true"){
                        this.free_course=true;
                    }
                    if(this.free_course==="false"){
                        this.free_course=false;
                    }
                    axios.post(window.contentUrl+'/course', {
                    "type": this.type,
                    "name": this.name,
                    "description": this.description,
                    "short_name":this.shortname,
                    "free":this.free_course,
                    "active":this.active,
                    "parent_course":this.parent_course,
                    "course_category":this.course_catergory,
                    "term":this.course_type,
                    "bundle_courses":this.selected
                  })
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                    
                  });
              
            },
            async typeSelection(){
                if(this.type==='bundle' || this.type==='course' ){
                    try{
                        let response = await axios.get(window.contentUrl+"/course");
                        this.course=response.data.data;
                        
                    }catch (error){
                        console.log("error happened ");
                    }
                }
            }

            }
            
        }

    
</script>

