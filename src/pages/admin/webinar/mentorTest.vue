<template>
  <div>
      <div class="row">
          <div class="col">
            <label for="mentorname"> Mentor Name<sup style="color:red">*</sup></label>
            <input v-model="profile.mentor_name" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="heading1" name="heading1" class="form-control">
          </div>
          <div class="col">
            <label for="mentordesignation"> Mentor Designation<sup style="color:red">*</sup></label>
            <input v-model="profile.mentor_designation" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="heading1" name="heading1" class="form-control">
          </div>
          <div class="col">
            <label for="mentorcompany"> Mentor Company<sup style="color:red">*</sup></label>
            <input v-model="profile.mentor_company" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="heading1" name="heading1" class="form-control">
          </div>
    </div>
    <div class="row">
            <div class="col-md">
              <label for="mentorlinkedinurl"> Mentor LinkedIn URL<sup style="color:red">*</sup></label>
              <input v-model="profile.mentor_linkedin" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="heading1" name="heading1" class="form-control">
            </div>
            <div class="col-md">
              <label for="mentorprofile"> Mentor Profile<sup style="color:red">*</sup></label>
              <textarea v-model="profile.mentor_profile"  id="answer" name="answer" class="form-control" :disabled="edit === 0"></textarea>
            </div>
            <div class="col">
              <label for="mentorimage"> Mentor Image<sup style="color:red">*</sup></label>
              <input class="form-control" type="file" @change="fileChanged">
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
    	save1(){
           
          this.edit=0;
          // console.log(this.profile);
          this.$emit('oneMentor',this.profile);

        }
    }

  }
</script>
