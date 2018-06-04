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
                <input v-model="profile.sub_heading" v-validate="{ required: true}" type="text" id="sub_heading" name="sub_heading" class="form-control">
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
                 <tinymce :id="'sp_sp' + index"  v-model="profile.descripion" v-validate="'required'"
                 name="description"
                 :has-error="errors.has('description')"></tinymce>
            </div>
            
          </div>
          <div class="row">
            <p></p>
          </div>
          <div class="row">
                 <div class="col">
                   <button class="btn btn-success" type="button" @click="save" :disabled="edit === 0">Save Sub Headings</button>
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
    // tinymce.init({
    //     menubar: false,
    //     statusbar: false,
    //     toolbar: false
    // });
</script>
<script>
 import tinymce from 'vue-tinymce-editor';
 export default {
  name:"editsubheading",
  props: ['index','one','currentindex'],
  components: {
            tinymce
        },
  created(){
    // log(this.index)
    log(this.one)
  } ,     
  data() {
            return{
                    profile : {
                        
                        sub_heading:this.one.sub_heading,
                        descripion:this.one.descripion
                       
                    },
                    edit:1
                     

                }
    },
    methods: {
    	async save(){
          let result=await this.$validator.validateAll();
          if(result){
             this.edit=0;
             console.log(this.profile.descripion);
             this.$emit('editHeading',this.profile,this.currentindex);
           }
          else
             sflash('Please fill all the fields','error');

        }
    }

  }
</script>
