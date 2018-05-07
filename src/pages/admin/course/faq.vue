<template>
    <div class="row">
          <div class="col-md-5">
            <label for="question"> Question<sup style="color:red">*</sup></label>
            <textarea v-model="faq.question"  id="question" name="question" class="form-control" :disabled="edit === 0"></textarea>
          </div>
          <div class="col-md-5">
            <label for="answer"> Answer<sup style="color:red">*</sup></label>
           <textarea v-model="faq.answer"  id="answer" name="answer" class="form-control" :disabled="edit === 0"></textarea>
          </div>
          <div class="col pad">
             <button class="btn btn-success" @click="save" :disabled="edit === 0">Save Faq</button>
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
                    faq : {
                        
                        question:'',
                        answer:''
                    },
                    edit:1
                     

                }
    },
    methods: {

    	save(){
           
          this.edit=0;
          this.$emit('oneFaq',this.faq);

        }
    }

  }
</script>
