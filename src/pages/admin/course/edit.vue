<template>
    <div class="container JDL">
        <div class="container justify-content-center">
			<ul  class=" nav nav-tabs " id="myTab" role="tablist">
    			  <li class="nav-item">
    			    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Overview</a>
    			  </li>
    			  <li class="nav-item">
    			    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Seo</a>
    			  </li>
    			  <li class="nav-item">
    			    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Course Plan</a>
    			  </li>
			</ul>
			<div class="tab-content" id="myTabContent">
			    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                     <div class="card card-default">
                        <div class="card-body">
                        	<div class="row">
                                <div class="col">
                                	<label for="name">Name</label>
                                     <input class="form-control"  id="name" name="name" v-model="name" :disabled="nameedit === 0">
                                </div>
                                <div class="col">
                                </div>
                                <div class="col editbutton">
                                    <button type="button" class="btn btn-primary" @click="edit('nameedit')">Edit</button>
                                    <button type="button" class="btn btn-success" @click="update('name')">Save</button>
                                   
                                </div>

                            </div>
                            <div class="row">
                                <div class="col">
                                <label for="description">URI<sup style="color:red">*</sup></label>
                                <input type="text" v-model="description" id="course_description" name="description" class="form-control" :disabled="editdescription === 0">
                                </div>
                                <div class="col">
                                </div>
                                <div class="col editbutton">
                                    <button type="button" class="btn btn-primary" @click="edit('editdescription')">Edit</button>
                                    <button type="button" class="btn btn-success" @click="update('description')">Save</button>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <label for="active"> Active</label>
                                    <select id="course_active" v-model="active" name="active" class="form-control" :disabled="activeedit === 0">
                                        <option value="true">yes</option>
                                        <option value="false">no</option>
                                    </select>
                                </div>
                                <div class="col">
                                </div>
                                <div class="col editbutton">
                                    <button type="button" class="btn btn-primary" @click="edit('activeedit')">Edit</button>

                                    <button type="button" class="btn btn-success" @click="update('active')">Save</button>
                                </div>
                            </div>
                            <div v-if="type==='course' || type==='bundle'">
                            <div class="row">
                               <div class="col">
                                <label for="free_course"> Free Course</label>
                                <select id="course_free" v-model="free" name="free" class="form-control" :disabled="freeedit === 0">
                                    <option value="false">no</option>
                                    <option value="true">yes</option>
                                </select>
                               </div>
                               <div class="col">
                                </div>
                                <div class="col editbutton">
                                    <button type="button" class="btn btn-primary" @click="edit('freeedit')">Edit</button>
                                    <button type="button" class="btn btn-success" @click="update('free')">Save</button>
                                </div>
                            </div>
                            </div>
                        </div>
                      </div>
                  </div>
			  <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
			  	<div class="card card-default">
                    <div class="card-body">
                        <div class="row">
                           <div class="col">
                                <label for="metadata">Metadata Name</label>
                                 <input v-model="meta_name"  type="text" id="metadata" name="metadata" class="form-control" :disabled="metadataedit === 0">
                            </div>
                            <div class="col">
                            </div>
                            <div class="col editbutton">
                                <button type="button" class="btn btn-primary" @click="edit('metadataedit')">Edit</button>
                                <button type="button" class="btn btn-success" @click="update('meta_name')">Save</button>
                            </div> 
                        </div>
                        <div class="row">
                           <div class="col">
                                <label for="metadata">Metadata Description</label>
                                 <input v-model="meta_description"  type="text" id="metadata_desc" name="metadata" class="form-control" :disabled="metadatadescedit === 0">
                            </div>
                            <div class="col">
                            </div>
                            <div class="col editbutton">
                                <button type="button" class="btn btn-primary" @click="edit('metadatadescedit')">Edit</button>
                                <button type="button" class="btn btn-success" @click="update('meta_description')">Save</button>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="h1">h1</label>
                                 <input v-model="h1"  type="text" id="h1" name="h1" class="form-control":disabled="h1edit === 0">
                            </div>
                            <div class="col">
                            </div>
                            <div class="col editbutton">
                                <button type="button" class="btn btn-primary" @click="edit('h1edit')">Edit</button>
                                <button type="button" class="btn btn-success" @click="update('h1')">Save</button>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="h2">h2</label>
                                 <input v-model="h2"  type="text" id="h2" name="h2" class="form-control":disabled="h2edit === 0">
                            </div>
                            <div class="col">
                            </div>
                            <div class="col editbutton">
                                <button type="button" class="btn btn-primary" @click="edit('h2edit')">Edit</button>
                                <button type="button" class="btn btn-success" @click="update('h2')">Save</button>
                            </div> 
                        </div>
                        <div class="row">
                            <div class="col">
                                <label for="title">Title</label>
                                 <input v-model="title"  type="text" id="title" name="title" class="form-control" :disabled="titleedit === 0">
                            </div>
                            <div class="col">
                            </div>
                            <div class="col editbutton">
                                <button type="button" class="btn btn-primary" @click="edit('titleedit')">Edit</button>
                                <button type="button" class="btn btn-success" @click="update('title')">Save</button>
                            </div> 
                        </div>
                    </div>
                </div>
                  
			  </div>
			  <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
			  	
			  </div>
			</div>
        </div>
    </div>
</template>
<style>
    .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link{
        background-color: #f6f9f7 !important;
    }
    a {
        color: #212323;
    }
    a:hover {
        color: #212323;
    }
    .editbutton{
        padding-top: 30px;
    }
</style>
<script>
   export default {
   	   props: ['course_id'],
   	   async created(){
            
            try{
                let response = await axios.get(window.contentUrl+"/course/"+this.course_id);
                this.course=response.data.data;
                this.course_original=response.data.data;
                this.name=this.course.name;
                //this.type=this.course.type;
                this.term=this.course.term;
                this.description=this.course.description;
                this.active=this.course.active;
                this.free=this.course.free;
                this.h1=this.course.meta_info ? this.course.meta_info.h1 :'';
                this.h2=this.course.meta_info ? this.course.meta_info.h2 :'';
                this.title=this.course.meta_info ? this.course.meta_info.title :'';
                this.meta_name=this.course.meta_info ? this.course.meta_info.meta_name:'';
                this.meta_description=this.course.meta_info?this.course.meta_info.meta_description:'';
                this.parent_course=this.course.parent_course;
                if(this.course.bundle_courses){
                  this.bundle_courses=this.course.bundle_courses;	
                }
                this.course_category=this.course.course_category;
                console.log(this.type);
    
            }catch (error){
            		
                    console.log("error happened ");
            }
   	   },
       data() {
            return{
                
                nameedit:0,
                typeedit:0,
                editdescription:0,
                activeedit:0,
                freeedit:0,
                metadataedit:0,
                metadatadescedit:0,
                h1edit:0,
                h2edit:0,
                titleedit:0,
                name:'',
                type:'category',
                description:'',
                active:false,
                free:false,
                meta_name:'',
                meta_description:'',
                h1:'',
                h2:'',
                title:'',
                course:[],
                course_original:[],
                parent_course:'',
                course_category:'',
                bundle_courses:[]
            }
        },
        methods: {
            
           
            edit(parameter){

            	var v1='this.'.concat(parameter);
            	var v2=eval(v1.concat('=1'));
               
            },
            update(parameter){
               
               if(this.active==="true"){
                    this.active=true;
                }
                if(this.active==="false"){
                    this.active=false;
                }
                 if(this.free==="true"){
                    this.free=true;
                }
                if(this.free==="false"){
                    this.free=false;
                }

               var meta_info={};
               if(this.course_original.meta_info){
                 meta_info=this.course_original.meta_info;
               }
  
               if(parameter==='h1'||parameter==='h2'||parameter==='title'||parameter==='meta_name'||parameter==='meta_description'){
	         
      	        	var object={[parameter]:eval('this.'.concat(parameter))};
               	    var new_object=$.extend({}, meta_info, object);
               	    var metaobject={"meta_info":new_object};
               	    var new_object=$.extend({}, this.course_original, metaobject);
               	    this.course_original=new_object;
                    // console.log(new_object);
               }
               else
               {
                     var object={[parameter]:eval('this.'.concat(parameter))};
                     var new_object=$.extend({}, this.course_original, object);
                     this.course_original=new_object;
                     // console.log(new_object);
               }
               
                axios.put(window.contentUrl+"/course/"+this.course_id, new_object)
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                    
                  });


            }
            
        }
    }
</script>