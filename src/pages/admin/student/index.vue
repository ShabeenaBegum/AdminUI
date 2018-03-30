<template>
    <div>
        <div class="card card-default table-card">
            <div class="card-header">
                <div class="d-flex align-items-center">
                    <data-filter v-model="appliedFilters" :filters="filters"></data-filter>
                </div>
            </div>
            <div class="card-body">
                <data-grid :data="students" :columns="cols" @changed="getStudents">
                    <!-- <template slot-scope="{ row, col }">
                        <span v-if="col == 'action'">
                            <button @click="deleteStudent(row._id)" class="btn btn-danger">Delete</button>
                        </span>
                        <span v-else>{{ row[col] }}</span>
                    </template> -->
                </data-grid>
            </div>
        </div>
    </div>
</template>
<style>
</style>
<script>
    export default {
        created(){
          this.getStudents();
        },
        data(){
            return {
                appliedFilters:"",
                cols:['name', 'email', 'role', 'phone', 'action'],
                filters: [
                    {
                        "display_name": "Batch Name",
                        "enable":true,
                        "key": "name",
                        "operator": "eq",
                        "value": "",
                        options:[
                            {
                                display_name:"is equal to",
                                operator: "eq",
                            },
                            {
                                display_name:"contains",
                                operator: "contains",
                            }
                        ]
                    },
                    {
                        "display_name": "batch id",
                        "enable":false,
                        "operator": "eq",
                        "key": "_id",
                        "value": "",
                        options:[
                            {
                                display_name:"is equal to",
                                operator: "eq",

                            },
                            {
                                display_name:"contains",
                                operator: "contains",
                            }
                        ]
                    }
                ],
                students:{},
            }
        },
        methods:{
            deleteStudent(id){
                alert(id);
            },
            async getStudents(page = 1){
                try{
                    let response = await axios.get(window.baseUrl+"/students?page="+page);
                    this.students = response.data;
                }catch (error){
                    log(error);
                }
            }
        }
    }
</script>