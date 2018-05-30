<template>
  <div>
          <div v-if="errors.items.length" class="alert alert-danger">
                                <strong>Oops !!  There are some validation error</strong>
                                <ul>
                                    <li v-for="error in errors.items" v-text="error.msg"></li>
                                </ul>
                            </div>
          <div class="row">
          <div class="col">
            <label for="mentorname"> Mentor Name<sup style="color:red">*</sup></label>
            <input v-model="profile.mentor_name" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="mentor_name" name="mentor_name" class="form-control">
          </div>
          <div class="col">
            <label for="mentordesignation"> Mentor Designation<sup style="color:red">*</sup></label>
            <input v-model="profile.mentor_designation" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="mentor_designation" name="mentor_designation" class="form-control">
          </div>
          <div class="col">
            <label for="mentorcompany"> Mentor Company<sup style="color:red">*</sup></label>
            <input v-model="profile.mentor_company" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="mentor_company" name="mentor_company" class="form-control">
          </div>
    </div>
    <div class="row">
            <div class="col-md">
              <label for="mentorlinkedinurl"> Mentor LinkedIn URL<sup style="color:red">*</sup></label>
              <input v-model="profile.mentor_linkedin" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="mentor_linkedin" name="mentor_linkedin" class="form-control">
            </div>
            <div class="col-md">
              <label for="mentorprofile"> Mentor Profile<sup style="color:red">*</sup></label>
              <textarea v-model="profile.mentor_profile" v-validate="{ required: true}" id="mentor_profile" name="mentor_profile" class="form-control" ></textarea>
            </div>
            <div class="col">
              <label for="mentorimage"> Mentor Image<sup style="color:red">*</sup></label>
              <input class="form-control"  v-validate="{ required: true}" id="mentor_image" name="mentor_image" type="file" @change="fileChanged">
            </div>
    </div>
    <div class="row">
           <div class="col">
             <button class="btn btn-success" type="button" @click="save1" :disabled="edit === 0">Save Mentor</button>
           </div>
           <div class="col">
           </div>
           <div class="col">
           </div>
    </div>
    <hr>
  </div>
</template>
<style>

   .pad{
    padding-top: 30px;
   }

</style>
<script>

 export default {
  name:"Mentorrrrr",
  props: [''],
  data() {
            return{
                    profile : {
                        
                        mentor_name:'',
                        mentor_company:'',
                        mentor_designation:'',
                        mentor_linkedin:'',
                        mentor_profile:'',
                        mentor_image:''
                    },
                    edit:1
                     

                }
    },
    methods: {
      fileChanged(event){
          this.profile.mentor_image=event.target.files[0].name;
      },
    	async save1(){
          let result=await this.$validator.validateAll();
          if(result)
             this.$emit('oneMentor',this.profile);
          else
             sflash('Please fill all the fields','error');

        }
    }

  }
</script>
