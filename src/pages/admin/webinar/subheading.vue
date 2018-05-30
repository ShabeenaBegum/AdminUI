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
                <label for="sub_heading"> Subheading title<sup style="color:red">*</sup></label>
                <input v-model="profile.sub_heading" v-validate="{ required: true, regex: /^[a-zA-Z][a-zA-Z0-4.,--, ,_,$;]*$/ }" type="text" id="sub_heading" name="sub_heading" class="form-control">
              </div>
              <div class="col">
              </div>
              <div class="col">
              </div>
          </div>
          <div class="row">
            <p></p>
          </div>
          <div class="row">
            <div class="col">
                 <tinymce :id="'sp_' + index"  v-model="profile.descripion" v-validate="'required'"
                 name="description"
                 :has-error="errors.has('description')"></tinymce>
            </div>
            
          </div>
          <div class="row">
            <p></p>
          </div>
          <div class="row">
                 <div class="col">
                   <button class="btn btn-success" type="button" @click="save1">Save Sub Headings</button>
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
<script type="text/javascript">
    tinymce.init({
        menubar: false,
        statusbar: false,
        toolbar: false
    });
</script>
<script>
 import tinymce from 'vue-tinymce-editor';
 export default {
  name:"subheading",
  props: ['index'],
  components: {
            tinymce
        },
  created(){
    log(this.index)
  } ,     
  data() {
            return{
                    profile : {
                        
                        sub_heading:'',
                        descripion:''
                       
                    }
                     

                }
    },
    methods: {
    	async save1(){
          let result=await this.$validator.validateAll();
          if(result)
             this.$emit('oneheading',this.profile);
          else
             sflash('Please fill all the fields','error');

        }
    }

  }
</script>
