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
                                        <option value="group">Group</option>
                                     </select>
                                </div>
                            </div>
                            <div class="col">
                            </div>
                            <div class="col">
                            </div>
                        </div>
                        <div v-if="type==='group' ">
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
                                </div>
                                <div class="col">
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <!-- only for course  -->
                <div v-if="type==='course' || type==='bundle'">
                    <div class="card card-default">
                        <div class="card-header">Selection</div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <label for="course_group">Group</label>
                                    <select id="course_group" name="course_group" v-model="course_group" @change="coursegroupchange()" class="form-control" >
                                        <option value="android">Android</option>
                                        <option value="bigdata">Big Data</option>
                                     </select>
                                </div>
                                <div class="col">
                                    <label for="mode_of_training">Mode of traning</label>
                                    <select id="mode_of_training" name="mode_of_training" v-model="mode_of_training" @change="modetrainingchange()" class="form-control" >
                                        <option value="online">Online</option>
                                        <option value="offline">Offline</option>
                                        <option value="selfpaced">Self Paced</option>
                                     </select>
                                </div>
                                <div class="col">
                                    <label for="certificate">Certificate</label>
                                    <select id="certificate" name="certificate" v-model="certificate" @change="certificatechange()" class="form-control" >
                                        <option value="cert">Cert</option>
                                        <option value="noncert">Non Cert</option>
                                     </select>
                                </div>
                                
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label for="bu">University</label>
                                    <select id="bu" name="bu" v-model="bu" @change="" class="form-control" >
                                        <option value="">AG</option>
                                        <option value="">BDU</option>
                                     </select>
                                </div>
                                <div class="col">
                                    <label for="sub_bu">Sub University</label>
                                    <select id="sub_bu" name="sub_bu" v-model="sub_bu" @change="" class="form-control" >
                                        <option value="">AG_CENTRAL</option>
                                        <option value="">AG_BMTC</option>
                                     </select>
                                </div>
                                <div class="col">
                                    <label for="region">Region</label>
                                    <select id="region" name="region" v-model="region" @change="regionchange()" class="form-control" >
                                        <option value="in">IN</option>
                                        <option value="usa">USA</option>
                                        <option value="row">ROW</option>
                                     </select>
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr>
                </div>
                <!--  -->
                <div class="card card-default">
                    <div class="card-header">Basic Info.</div>
                    <div class="card-body">

                        <div class="row">
                            <div class="col">
                                 <label for="name"> Product Name<sup style="color:red">*</sup></label>
                                 <input v-model="productname" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="course_name" name="name" class="form-control" :disabled="disabled_name === 0">
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
                                    <label for="certificationlink">Certification Link<sup style="color:red">*</sup></label>
                                    <input type="text" v-model="certificationlink" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" id="certificationlink" name="description" class="form-control">
                                     <span v-show="errors.has('certificationlink')"
                                              class="help text-danger">
                                            {{ errors.first('certificationlink') }}
                                     </span>    
                                 </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <!-- metainfo section -->
                <div v-if="type==='parent' || type==='group' || type==='course' || type==='bundle'">
                    <hr>
                    <div class="card card-default">
                    <div class="card-header">Metadata Info.</div>    
                    <div class="card-body">
                        <div class="row">
                           <div class="col">
                                <label for="metadata">Metadata Name</label>
                                 <input v-model="meta_name"  type="text" id="metadata" name="metadata" class="form-control">
                            </div>
                            <div class="col">
                                <label for="metadata">Metadata Description</label>
                                 <input v-model="meta_description"  type="text" id="metadata_desc" name="metadata" class="form-control">
                            </div>
                            <div class="col">
                                <label for="h1">h1</label>
                                 <input v-model="meta_h1"  type="text" id="h1" name="h1" class="form-control">
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="h2">h2</label>
                                 <input v-model="meta_h2"  type="text" id="h2" name="h2" class="form-control">
                            </div>
                            <div class="col">
                                <label for="title">Title</label>
                                 <input v-model="meta_title"  type="text" id="title" name="title" class="form-control">
                            </div>
                            <div class="col">
                            </div>
                           
                        </div>
                    </div>
                </div>
                </div>
                <!-- end of metainfo section -->
                
                <div v-if="type==='course' || type==='bundle'">
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
                                 <vue-slider :min=3 :max=5 :interval=0.1 v-model="learner_increament"></vue-slider>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="rating_increament">Rating Increament<sup style="color:red">*</sup></label>
                                 <vue-slider :min=3 :max=5 :interval=0.1 v-model="rating_increament"></vue-slider>
                            </div>
                            <div class="col">   
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
                <div v-if="type==='course' || type==='bundle'">
                    <hr>
                    <div class="card card-default">
                        <div class="card-header">Course Plan
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <label for="totalsession">Total Session<sup style="color:red">*</sup></label>
                                         
                                     <input v-model="totalsession" v-validate="{ required: true, regex: /^[0-9][0-9]*$/ }" type="text" id="totalsession" name="totalsession" class="form-control">
                                      <span v-show="errors.has('totalsession')"
                                              class="help text-danger">
                                            {{ errors.first('totalsession') }}
                                      </span>

                                </div>
                                <div class="col">
                                    <label for="sessionduration">Session Duration<sup style="color:red">*</sup></label>
                                        
                                     <input v-model="sessionduration" v-validate="{ required: true, regex: /^[0-9][0-9]*$/ }" type="text" id="sessionduration" name="sessionduration" class="form-control">
                                      <span v-show="errors.has('name')"
                                              class="help text-danger">
                                            {{ errors.first('sessionduration') }}
                                      </span>

                                </div>
                                <div class="col"></div>
                                <div class=""></div>

                            </div>
                            <div class="row">
                                <div class="col">
                                    <label for="codinghours">Coding Hours<sup style="color:red">*</sup></label>
                                        
                                     <input v-model="codinghours" v-validate="{ required: true, regex: /^[0-9][0-9]*$/ }" type="text" id="codinghours" name="codinghours" class="form-control">
                                      <span v-show="errors.has('name')"
                                              class="help text-danger">
                                            {{ errors.first('codinghours') }}
                                      </span>

                                </div>
                                <div class="col">
                                    <label for="projectcount">Project Count<sup style="color:red">*</sup></label>
                                        
                                     <input v-model="projectcount" v-validate="{ required: true, regex: /^[0-9][0-9]*$/ }" type="text" id="projectcount" name="projectcount" class="form-control">
                                      <span v-show="errors.has('name')"
                                              class="help text-danger">
                                            {{ errors.first('projectcount') }}
                                      </span>

                                </div>
                                <div class="col">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
               
                 <div v-if="type==='course' || type==='bundle'">
                     <hr>
                     <div class="card card-default">
                           <div class="card-header">
                              <div class="row">
                                  <div class="col-md-5">
                                    <h4>Faq</h4>
                                  </div>
                                  <div class="col-md-5">
                                  </div>
                                  <div class="col">
                                     <button class="btn btn-primary" @click="addFaqRow()">Add Row</button>
                                  </div>
                              </div>
                               
                           </div>

                           <div class="card-body">
                                  <faq @oneFaq="addFaq" v-for="n in faqrange" :key="n"></faq>
                           </div>
                     </div>
                 </div>
                
                 <div v-if="type==='course' || type==='bundle'">
                     <hr>
                     <div class="card card-default">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-md-5">
                                    <h4>Review</h4>
                                </div>
                                <div class="col-md-5">
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary" @click="addReviewRow()">Add Row</button>

                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <!--  -->
                            <review @oneReview="addReview" v-for="n in reviewrange" :key="n"></review>
                        </div>
                     </div>
                </div>
                <!--  -->
               
                <div v-if="type==='course' || type==='bundle'">
                     <hr>
                     <div class="card card-default">
                        <div class="card-header">
                            <div class="row">
                                <div class="col-md-5">
                                    <h4>Syllabus</h4>
                                </div>
                                <div class="col-md-5">
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary" @click="addsyllabusrow()">Add Syllabus</button>

                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <syllabus @oneSyllabus="addSyllabus" v-for="n in syllabusrange" :key="n"></syllabus>
                        </div>
                     </div>
                </div>
                <!--  -->
                <div v-if="type==='bundle'">
                    <hr>
                    <div class="card card-default">
                       <div class="card-header">Bundle  Info.</div>
                       <div class="card-body">
                            <div class="row">
                                <div class="col">
                                      <label for="bundlecourse">Bundle Courses</label>
                                    <multiselect
                                            class="mr-4"
                                            v-model="selected"
                                            placeholder="Select Course"
                                            :options="course"
                                            :multiple="true"
                                            label="name" track-by="name"
                                            v-validate="'required'" data-vv-value-path="innerValue" data-vv-name="course">
                                        <template slot="singleLabel" slot-scope="{ option }">
                                            <span :class="{inactiveOption: !option.active}">
                                                {{ option.name }}
                                            </span>
                                        </template>
                                        <template slot="option" slot-scope="props">
                                            <span :class="{inactiveOption: !props.option.active}">
                                                {{ props.option.name }}
                                            </span>
                                        </template>
                                    </multiselect>
                                      
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
                    <button id="course-update" type="submit" class="btn btn-lg btn-primary">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
    import vueSlider from 'vue-slider-component';
    import faq from './faq';
    import review from './review';
    import syllabus from './syllabus';
    export default {
       components: {
               vueSlider,faq,review,syllabus
        },
       data() {
            return{
                type: '',
                parent_course:'',
                course_group:'',
                certificate:'',
                mode_of_training:'',
                bu:'',
                sub_bu:'',
                region:'',
                productname:'',
                description:'',
                shortname:'',
                active:false,
                free_course:false,
                disabled_name:1,
                course_info:'',
                learner:'',
                certificationlink:'',
                selected:[],
                course:[],
                meta_title:'',
                meta_h1:'',
                meta_h2:'',
                meta_description:'',
                meta_name:'',
                selected_bundle_course:[],
                rating_increament:[3,5],
                learner_increament:[3,5],
                planname:'',
                sessionduration:'',
                totalsession:'',
                codinghours:'',
                projectcount:'',
                faqQuestionAnswer:[],
                faqrange:1,
                reviewrange:1,
                reviewQuestionAnswer:[],
                syllabusrange:1,
                allsyllabus:[]


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
            addFaqRow(){

             this.faqrange++;

            },
            addFaq(data){
                let vm = this;
                vm.faqQuestionAnswer.push(data);
            },
            addReviewRow(){
              this.reviewrange++;
            },
            addReview(data){

              this.reviewQuestionAnswer.push(data);
              log(this.reviewQuestionAnswer);

            },
            addSyllabus(data){
               
               this.allsyllabus.push(data);

            },
            addsyllabusrow(){
               this.syllabusrange++;
               this.learner++;
               log("");
            },
            coursegroupchange(){
               let group=this.course_group;
               this.productname=this.productname+group+'-';
            },
            modetrainingchange(){
               let mode=this.mode_of_training;
               this.productname=this.productname+mode+'-';
            },
            certificatechange(){
               let cert=this.certificate;
               this.productname=this.productname+cert+'-';
            },
            regionchange(){
               let region=this.region;
               this.productname=this.productname+region;
            },
            async  checkForm(e) {
                    let result=await this.$validator.validateAll();
                    // log(result);
                    var j=0;
                    for(var i=0;i<this.selected.length;i++){
                           this.selected_bundle_course[j]=this.selected[i]._id;
                           j++;
                    }       
                    // log(this.selected_bundle_course);
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
                    // console.log(response);
                  })
                  .catch(function (error) {
                    // console.log(error);
                    
                  });
              
            },
            async typeSelection(){
                
                if(this.type==='course'){
                    this.disabled_name=0;
                }
                if(this.type==='parent' || this.type==='category' || this.type==='bundle' || this.type==='group'){
                    this.disabled_name=1;
                    this.productname='';
                    log(this.type);
                    log(this.type);
                }

                if(this.type==='bundle' || this.type==='course' ){
                    try{
                        let response = await axios.get(window.contentUrl+"/course");
                        this.course=response.data.data;
                        
                    }catch (error){
                        // console.log("error happened ");
                    }
                }
            }

            }
            
        }

    
</script>

