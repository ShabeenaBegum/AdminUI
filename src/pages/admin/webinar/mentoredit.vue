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
              <textarea v-model="profile.mentor_profile"  id="answer" name="answer" class="form-control" ></textarea>
            </div>
            <div class="col">
              <label for="mentorimage"> Mentor Image<sup style="color:red">*</sup></label>
              <input class="form-control" type="file" @change="fileChanged">
            </div>
    </div>
    <div class="row">
      <div class="col">
         <label for="mentor_cost">Event Cost<sup style="color:red">*</sup></label>
         <input v-model="profile.mentor_cost" v-validate="{ required: true, regex: /^[0-9][0-9]*$/ }" type="text" id="mentor_cost" name="mentor_cost" class="form-control">
      </div>
      <div class="col">
      </div>
      <div class="col">
      </div>
    </div>
    <p></p>
    <div class="row">
           <div class="col">
             <button class="btn btn-primary" type="button" @click="save">Update Mentor</button>
           </div>
           <div class="col">
           </div>
           <div class="col">
            <button class="btn btn-danger" type="button" @click="delete1">Delete Mentor</button>
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
  name:"Mentorrrrrr",
  props: ['one','currentindex'],
  data() {
            return{
                    profile : {
                        
                        mentor_name:this.one.mentor_name,
                        mentor_company:this.one.mentor_company,
                        mentor_designation:this.one.mentor_designation,
                        mentor_linkedin:this.one.mentor_linkedin,
                        mentor_profile:this.one.mentor_profile,
                        mentor_image:this.one.mentor_image,
                        mentor_cost:this.one.mentor_cost
                    },
                    edit:1
                     

                }
    },
    methods: {
      fileChanged(event){
          this.profile.mentor_image=event.target.files[0].name;
      },
    	save(){
           
          this.edit=0;
          this.$emit('editoneMentor',this.profile, this.currentindex);
        },
        delete1(){

          this.$emit('deleteMentor', this.currentindex);

        }
    }

  }
</script>
