<template>
  <div>
    <div class="row">

          <div class="col">
            <label for="name"> Name<sup style="color:red">*</sup></label>
            <input type="text" v-model="review.name"  id="name" name="nmae" class="form-control" :disabled="edit === 0">
          </div>
          <div class="col">
            <label for="designation"> Designation<sup style="color:red">*</sup></label>
           <input type="text" v-model="review.designation"  id="designation" name="designation" class="form-control" :disabled="edit === 0">
          </div>
          <!-- <div class="col pad">
             <button class="btn btn-success" @click="save">Save Faq</button>
          </div> -->
          <div class="col">
            <label for="company">Company<sup style="color:red">*</sup></label>
           <input type="text" v-model="review.company"  id="company" name="company" class="form-control" :disabled="edit === 0">
          </div>
    </div>
    <div class="row">
      <div class="col-md-4">
           <label for="review"> Review<sup style="color:red">*</sup></label>
           <textarea v-model="review.description"  id="review" name="review" class="form-control" :disabled="edit === 0"></textarea>
      </div>
      <div class="col-md-6">
      </div>
      <div class="col pad">
        <button class="btn btn-success" @click="save" :disabled="edit === 0">Save Review</button>
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
  props: [''],
  async created(){

           
    },

    data() {
            return{
                    review : {
                        
                        name:'',
                        designation:'',
                        company:'',
                        description:''
                    },
                    edit:1
                     

                }
    },
    methods: {

    	save(){
           
          this.edit=0; 
          this.$emit('oneReview',this.review);

        }
    }

  }
</script>
