<template>
    <div class="row">
          <div class="col-md-5">
            <label for="heading"> Heading<sup style="color:red">*</sup></label>
            <textarea v-model="syll.heading"  id="heading" name="heading" class="form-control" :disabled="edit === 0"></textarea>
          </div>
          <div class="col-md-5">
            <label for="answer"> Description<sup style="color:red">*</sup></label>
           <textarea v-model="syll.description"  id="description" name="description" class="form-control" :disabled="edit === 0"></textarea>
          </div>
          <div class="col pad">
             <button class="btn btn-success" @click="save" :disabled="edit === 0">Save Syllabus</button>
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
                    syll : {
                        
                        heading:'',
                        description:''
                    },
                    edit:1
                     

                }
    },
    methods: {

    	save(){
           
          this.edit=0;
          this.$emit('oneSyllabus',this.syll);

        }
    }

  }
</script>
