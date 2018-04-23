<template>
	<div>
		<div class="card card-default">
                    <div class="card-body">
                    	<div class="row">
                    		<div class="col">
                    			<h2>Course Plan Details</h2>
                    		</div>
                    		<div class="col">
                    		</div>
                    		<div class="col">
                    			<button type="button" class="btn btn-primary" @click="editcourseplan()">Edit Course Plan
								</button>
								<button type="button" class="btn btn-success" @click="savecourseplan()">Save Course Plan
								</button>
                    		</div>
                    	</div>
                    	
                    	<div class="row">
		                            <div class="col">
		                                 <label for="planname">Plan Name<sup style="color:red">*</sup></label>
		                                
		                                 <input v-model="planname" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="planname" name="planname" class="form-control"  :disabled="edit === 0" >
		                                  <span v-show="errors.has('planname')"
		                                          class="help text-danger">
		                                        {{ errors.first('planname') }}
		                                  </span>
                                    </div>
                                    <div class="col">
                                    </div>
                                    
                                 </div>
                                 <div class="row">
		                            <div class="col">
		                                 <label for="totalsession">Total Session<sup style="color:red">*</sup></label>
		                                 
		                                 <input v-model="totalsession" v-validate="{ required: true, regex: /^[0-9][0-9]*$/ }" type="text" id="totalsession" name="totalsession" class="form-control" :disabled="edit === 0" >
		                                  <span v-show="errors.has('totalsession')"
		                                          class="help text-danger">
		                                        {{ errors.first('totalsession') }}
		                                  </span>
                                    </div>
                                    <div class="col">
                                    </div>
                                    
                                 </div>
                                 <div class="row">
		                            <div class="col">
		                                 <label for="sessionduration">Session Duration<sup style="color:red">*</sup></label>
		                                
		                                 <input v-model="sessionduration" v-validate="{ required: true, regex: /^[0-9][0-9]*$/ }" type="text" id="sessionduration" name="sessionduration" class="form-control" :disabled="edit === 0">
		                                  <span v-show="errors.has('name')"
		                                          class="help text-danger">
		                                        {{ errors.first('sessionduration') }}
		                                  </span>
                                    </div>
                                    <div class="col">
                                    </div>
                                    
                                 </div>
                                 <div class="row">
                                 	<div class="col">
                                 		
                                 		 <label for="active"> Active</label>
		                                <select id="course_active" v-model="planactive" name="active" class="form-control" :disabled="edit === 0">
		                                    <option value="0">yes</option>
		                                    <option value="1">no</option>
		                                </select>
                                    </div>
                                    <div class="col">
                                    </div>
                                    

                                 </div>
                             </div>
                    	
                    </div>
	</div>
</template>

<script>

 export default {
  name: 'courseplancomponent',
  props: ['planid'],
  async created(){
            console.log(this.planid);
            try{
                let response = await axios.get(window.contentUrl+"/course-plan/"+this.planid);
                this.plan=response.data.data;
                this.planname=this.plan.name;
                this.sessionduration=this.plan.session_duration;
                this.totalsession=this.plan.total_sessions;
                this.planactive=this.plan.status;
           
            }catch (error){
            		
                    console.log("error happened ");
            }

           
    },

    data() {
            return{

            	planname:'',
            	sessionduration:0,
            	totalsession:0,
            	planactive:0,
            	plan:[],
            	edit:0
            	

                }
    },
    methods: {

    	editcourseplan(){
           
           this.edit=1;
    	},
    	savecourseplan(){
           log(this.planid);
           log(this.planname);
           log(this.sessionduration);
           log(this.totalsession);
           log(this.planactive);
           log(".....");

    	}
    }

  }
</script>