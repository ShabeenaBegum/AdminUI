<template>
	 <div class="container" v-if="batchData" >
        <div class="container justify-content-center">
        	<!-- <form> -->
                <div class="card card-default">
                    <div class="card-header">Edit Details</div>
                    <div class="card-body">
                		<div v-if="errors.items.length" class="alert alert-danger">
		                    <strong>Oops !!  There are some validation error</strong>
		                    <ul>
		                        <li v-for="error in errors.items" v-text="error.msg"></li>
		                    </ul>
		                </div>
                    	<div class="row">
                    		<div class="col">
                    			<div class="form-group">
		                            <label for="course_plan_id">Course Plan</label>
		                            <div>
		                            	<multiselect
		                                        class="mr-4"
		                                        :disabled="batchData.status != 'yet_to_start'"
		                                        v-model="selectedCoursePlan"
		                                        label="course_plan_id"
		                                        :searchable="true"
		                                        placeholder="Select Course Plan"
		                                        :options="course_plan_ids"
		                                        v-validate="'required'" data-vv-value-path="innerValue" data-vv-name="course_plan_id">
		                                    <template slot="singleLabel" slot-scope="{ option }">
		                                        <span :class="{inactiveOption: !option.status}">
		                                            {{ option.name }}
		                                        </span>
		                                    </template>
		                                    <template slot="option" slot-scope="props">
		                                        <span :class="{inactiveOption: !props.option.status}">
		                                            {{ props.option.name }}
		                                        </span>
		                                    </template>
		                                </multiselect>
		                                <!-- <select 
		                                	v-model="batchData.course_plan_id" 
		                                	:disabled="batchData.status != 'yet_to_start'" 
		                                	class="form-control form-control-sm">

		                                	<option :value="plan.id" v-for="plan in course_plan_ids">
		                                		{{plan.name}}
		                                	</option>
		                                </select> -->
		                            </div>
		                        </div>
                    		</div>
                    		<div class="col">
		                        <div class="form-group">
		                            <label for="duration">Duration in min</label>
		                            <input v-model="batchData.duration" class="form-control form-control-sm" disabled name="duration" v-validate="'required'" />
		                        </div>
		                    </div>
		                    <div class="col">
		                        <div class="form-group">
		                            <label for="mode_of_training">Mode of Training</label>
		                            <input v-model="batchData.mode_of_training" class="form-control form-control-sm" disabled name="mode_of_training" v-validate="'required'"/>
		                        </div>
		                    </div>
                    	</div>

                    	 <div class="row">
		                    <div class="col">
		                        <div class="form-group">
		                            <label for="start_date">Start Date</label>
		                            <date-picker  v-model="batchData.start_date"
                                     :disabled="batchData.status != 'yet_to_start'"
                                     class="form-control form-control-sm"
                                     v-validate="'required'"
                                     >
                        			</date-picker>
		                        </div>
		                    </div>
		                    <div class="col">
		                        <div class="form-group">
		                            <label for="days">Days</label>
		                            <multiselect
		                                    class="mr-4"
		                                   	v-model="batchData.days" 
		                                    placeholder="Days"
		                                    :allow-empty="false"
		                                    label="day"
		                                    track-by="day"
		                                    :disabled="batchData.status != 'yet_to_start'"
		                                    :multiple="true"
		                                    :options="days"
		                                    v-validate="'required'" data-vv-value-path="innerValue" data-vv-name="day" :has-error="errors.has('day')">
		                            </multiselect>
		                        </div>
		                    </div>
		                    <div class="col">
		                        <div class="form-group">
		                            <label for="time_zone">Time Zone</label>
		                            <input v-model="this.batchData.time_zone" class="form-control form-control-sm" name="time_zone" v-validate="'required'"/>
		                        </div>
		                    </div>
		                </div>
	                    <div class="row">
		                    <div v-for="(selectedDay, index) in batchData.days" class="col-2 batch-days">
		                        <label>{{selectedDay.day}}</label>
		                        
		                        <date-picker v-validate="'required'" 
		                         	 v-model="selectedDay.time"
                                     :config="{enableTime: true,noCalendar: true,dateFormat: 'H:i'}"
                                     class="form-control form-control-sm"
                                     
                                     :data-vv-name="selectedDay.day"
                                     :has-error="errors.has('selectedDay.day')">
		                        </date-picker>
		                    </div>
		                </div>
		                <div class="row">
		                    <div class="col">
		                        <div class="form-group">
		                            <label for="location">Location</label>
		                            <geolocation id="map" v-model="batchData.location" class="form-control form-control-sm" :value="batchData.location.formatted_address" v-validate="'required'" :has-error="errors.has('batchData.location')"/>
		                            
		                        </div>
		                    </div>
		                    <div class="col">
		                        <div class="form-group">
		                            <label for="status">Status</label>
		                            <select v-model="batchData.status" class="form-control form-control-sm" name="status" v-validate="'required'">
		                                <option selected value="">Select Status</option>
		                                <option v-for="status in statuses" v-bind:value="status">{{status}}</option>
		                            </select>
		                        </div>
		                    </div>
		                    <div class="col">
		                        <div class="form-group">
		                            <label for="francise">Francise Name</label>
		                            <input  class="form-control form-control-sm"/>
		                        </div>
		                    </div>
		                </div>
		                <div class="row">
		                    <div class="col-4">
		                        <div class="form-group">
		                            <label for="mentor">Mentor</label>
		                            <select v-model="batchData.mentor" class="form-control form-control-sm" name="mentor" v-validate="'required'">
		                                <option selected value="not_assigned">Not Assigned</option>
		                                <option v-for="(mentor,index) in mentors" v-bind:value="mentor.id" :key="index">{{mentor.name}}</option>
		                            </select>
		                        </div>
		                    </div>
		                    <div class="col-4">
		                        <div class="form-group">
		                            <label for="reference_name">Reference Name</label>
		                            <input  class="form-control form-control-sm"/>
		                        </div>
		                    </div>
		                </div>
		                <button @click="editBatch()">submit</button>
                    </div>
                </div>
            <!-- </form> -->
        </div>
    </div>
</template>
<script type="text/javascript">
	import datePicker from 'vue-flatpickr-component';
	import geolocation from '@/components/geolocation';
	import moment from 'moment';
	import { ErrorBag } from 'vee-validate';

	

	export default {
		components: { datePicker, geolocation, ErrorBag },
		props: ['batch_id'],
		async created() {
			let vm = this;
			await axios.get("http://batch.local/api/batch/"+vm.batch_id)
				.then(function(response){
					vm.batchData = response.data.data;
					vm.course_plan_id = vm.batchData.course_plan_id;
					vm.start_date = vm.batchData.start_date;
				}).catch(function(error){
					log(error);
				});
			await axios.get(window.contentUrl+"/course-plan?course_id="+vm.batchData.course_id)
				.then(function(response){
					vm.coursePlans = response.data.data;
					vm.selectedCoursePlan = _.find(vm.coursePlans,function(cp){
						return vm.batchData.course_plan_id == cp._id;
					})
				}).catch(function(error){
					log(error)
				})
			
		},
		data() {
            return {
                users: [],
                batchData: null,
                batchDataCopy:[],
              	coursePlans: [],
              	selectedCoursePlan: [],
                days: [
                    {day: 'Monday', time: ''},
                    {day: 'Tuesday', time: ''},
                    {day: 'Wednesday',time: ''},
                    {day: 'Thursday', time: ''},
                    {day: 'Friday', time: ''},
                    {day: 'Saturday', time: ''},
                    {day: 'Sunday', time: ''}
                ],
                statuses: ['yet_to_start', 'pending', 'completed'],
                mentors: [
                    {id: 1, name: 'mentor1'},
                    {id: 2, name: 'mentor2'},
                    {id: 3, name: 'mentor3'},
                ],
                start_date: null,
                course_plan_id: null
           }

		},
		watch: {
            selectedCoursePlan() {
            	 
                this.batchData.course_plan_id = this.selectedCoursePlan ? this.selectedCoursePlan._id : null;
                if(this.selectedCoursePlan){
                    this.batchData.duration = this.selectedCoursePlan.weeks ? this.selectedCoursePlan.weeks : null;
                    this.batchData.mode_of_training = this.selectedCoursePlan.mode_of_training ? this.selectedCoursePlan.mode_of_training : null;
                } else {
                    this.batchData.duration = null;
                    this.batchData.mode_of_training = null;
                }
            },
            "batchData.start_date"(){
            	const bag = new ErrorBag();
            	if( this.batchData.start_date != this.start_date){
            		$('#batch-days').empty();
	                this.batchData.days = [];
            		bag.clear(); 
	                var dt = moment(this.batchData.start_date, "YYYY-MM-DD HH:mm:ss");
	                var selected_day = (dt.format('dddd'));
	                if(this.batchData.start_date)
	                this.batchData.days.push({day: selected_day, time: ""});
            	}
            }

        },
        computed: {
            course_plan_ids() {
                let vm = this;
                if (this.coursePlans) {
                    return this.coursePlans;
                }
                return [];
               
            },


        },
        methods: {
            async editBatch(){
            	let vm = this;
            	let result = await this.$validator.validateAll();
                if(result){
                    try{
                    	var batch_date = new Date(vm.batchData.start_date); //dd-mm-YYYY
						var today = new Date();
						if(batch_date > today){
		                
			                vm.batchDataCopy = {...vm.batchData};
			                if(vm.batchData.course_plan_id == vm.course_plan_id){
			                	delete vm.batchDataCopy.course_plan_id;
			                } else {
			                	delete vm.batchDataCopy.modules;
			                	delete vm.batchDataCopy.sessions;
			                	try{
				                	let coursePlan = await axios.get(window.contentUrl+"/content/csd?course_plan_id="+vm.batchData.course_plan_id);
				                    if((coursePlan.status == 200)&&(coursePlan.data.data.modules != undefined)&&(coursePlan.data.data.sessions != undefined) )
				                    {
				                        vm.batchDataCopy.modules = coursePlan.data.data.modules;
				                        vm.batchDataCopy.sessions = coursePlan.data.data.sessions;
				                    } 
			                		
			                	} catch(error){
			                		log(error);
			                        sflash('Content Not updated contact support team!', 'error');
			                    }
			                }
			                if(vm.batchData.start_date == vm.start_date){
			                	delete vm.batchDataCopy.start_date;
			                }
			                try{
			                	let upadatedBatch = await axios.put('http://batch.local/api/batch/'+vm.batchDataCopy._id, vm.batchDataCopy);
			                	sflash('Batch updated');
			                } catch(error){
			                	sflash('Batch not updated!', 'error');
			                	log(error);
			                }

		            	} else {
		            		sflash('Start data must be equal to or greater than today!','error');
		            	}	
                    }
                    catch(error){
                    	log(error);
                    }
                
                
            	}
        	}
		}
	}
</script>