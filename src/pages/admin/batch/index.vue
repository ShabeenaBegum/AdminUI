<template>
    <div class="card card-default table-card">
        <div class="card-header">
            <div class="d-flex align-items-center">
                <button class="btn btn-primary btn-sm mr-2" @click="showFilter = !showFilter">
                    <i class="fa fa-filter" aria-hidden="true"></i>
                    &nbsp;Filter&nbsp <span v-if="appliedFilters">{{ appliedFilters}}</span>
                </button>
                <div v-if="showFilter" class="filter">
                    <div class="bs-FilterControl-flyout-header">
                        <button @click="clearFilters()" class="btn btn-filter btn-sm">Clear</button>
                        <h2 style="font-size: 15px;"><span>Filters</span></h2>
                        <button @click="applyFilter()" class="btn btn-filter btn-sm">Done</button>
                    </div>
                    <div class="bs-FilterControl-list">
                        <div class="bs-FilterControl-item--expanded" v-for="(filter, index) in filters" :key="index">
                            <label class="bs-FilterControl-item-label">
                                <input type="checkbox" class="mr-2" value="amount" v-model="filter.enable">
                                <span>{{ filter.display_name}}</span>
                            </label>
                            <div class="bs-FilterControl-item-content" v-if="filter.enable">
                                <div class="bs-FilterControl-item-children">
                                    <select style="font-size: 12px" class="mb-1" v-model="filter.operator">
                                        <option v-for="option in filter.options" :value="option.operator">{{option.display_name}}</option>
                                    </select>
                                    <div class="bs-FilterControl-input-container">
                                        <span>
                                            <input v-model="filter.value" type="text" class="form-control filter-input mb-1" value="">
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>






                <multiselect
                        class="mr-4"
                        v-model="selectedCourse"
                        track-by="name"
                        label="name"
                        placeholder="Select Course"
                        :options="courses">
                    <template slot="singleLabel" slot-scope="{ option }">
                        <span :class="{inactiveCourse: !option.active}">
                            {{ option.name }}
                        </span>
                    </template>
                    <template slot="option" slot-scope="props">
                        <span :class="{inactiveCourse: !props.option.active}">
                            {{ props.option.name }}
                        </span>
                    </template>
                </multiselect>
                <!--<button class="btn btn-filter mr-2">-->
                    <!--<i class="fa fa-download" aria-hidden="true"></i>-->
                    <!--&nbsp;Export-->
                <!--</button>-->
            </div>
        </div>
        <div class="card-body">
            <table class="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">course id</th>
                    <th scope="col">course id</th>
                    <th scope="col">course id</th>
                    <th scope="col">course id</th>
                    <th scope="col">course id</th>
                    <th scope="col">course id</th>
                    <th scope="col">course id</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="batch in batches.data">
                    <td>{{batch.name}}</td>
                    <td>{{batch.course_id}}</td>
                    <td>{{batch.course_id}}</td>
                    <td>{{batch.course_id}}</td>
                    <td>{{batch.course_id}}</td>
                    <td>{{batch.course_id}}</td>
                    <td>{{batch.course_id}}</td>
                    <td>{{batch.course_id}}</td>
                </tr>
                </tbody>
            </table>
            <div class="bottom-table  mb-3">
                <paginator :dataSet="batches" @changed="getBatchesByCourseId"/>
            </div>
        </div>
    </div>
</template>
<style>
    span.inactiveCourse {
        text-decoration: line-through;
        color: red;
    }

</style>
<script>
    import paginator from './../../../components/Paginator';
    export default {
        components:{paginator},
        data() {
            return {
                batches:[],
                // filters: {
                //     batchname:{
                //         "enable":false,
                //         "name": "name",
                //         "operator": "eq",
                //         "value": ""
                //     }
                // },
                filters: [
                    {
                        "display_name": "Batch Name",
                        "enable":false,
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
                filterAmount:false,
                courses:[],
                showFilter:false,
                finalFilters:"",
                appliedFilters:0,
                selectedCourse:null
            }
        },
        watch:{
            selectedCourse(){
                let page = this.$route.query.page;
                if(!page){
                    page = 1;
                }
                if(this.selectedCourse){
                    this.getBatchesByCourseId(page);
                }
            }
        },
        methods:{
            clearFilters(){
                _.each(this.filters, function (filter) {
                    filter.enable = false;
                })
            },
            applyFilter(){
                let vm = this;
                var tempFilters = []
                vm.filters.forEach(function(a){
                    if(a.enable){
                        tempFilters.push("filter"+a.key+"["+a.operator+"]="+a.value);
                    }
                });
                vm.finalFilters = tempFilters.join("&");
                vm.appliedFilters = _.sumBy(this.filters, function(o) {
                    return o.enable ? 1 : 0;
                });
                log(vm.finalFilters);
                if(vm.finalFilters){
                    var prevSearch = window.location.search;
                    if(prevSearch){
                        history.pushState(null, null, prevSearch+"&"+vm.finalFilters)
                    }else{
                        history.pushState(null, null,"?"+vm.finalFilters)
                    }
                    //history.pushState(null, null, '?'+vm.finalFilters);
                }else{
                    //get filters
                    var withOutFilters = [];
                    for (var att in vm.$route.query){
                        if(!att.includes("filter")){
                            var st = att+"="+vm.$route.query[att];
                            withOutFilters.push(st);
                        }
                    }
                    if(withOutFilters.length){
                        history.pushState(null, null,"?"+withOutFilters.join("&"));
                    }
                    //get filter filters
                }
                vm.showFilter = false;
            },
            courseStatus(data){
                let s = data.active ? '' : ' (in active)';
                return data.name + s;
            },
            async getBatchesByCourseId(page = 1){
                try{
                    let response = await axios.get(window.baseUrl+"/batches?id="+this.selectedCourse._id+"&page="+page);
                    this.batches = response.data;
                    history.pushState(null, null, '?id='+this.selectedCourse._id+'&page='+page);
                }catch (error){
                    log(error);
                }
            },
            setData(courses){
                this.courses = courses;
                let id = this.$route.query.id;
                if(id){
                    this.selectedCourse = _.find(this.courses, ['_id', id]);
                }
            }

        },
        async beforeRouteEnter (to, from, next) {
            let vm = this;
            try{
                let response = await axios.get(window.baseUrl+"/courses");
                next(function (vm) {
                    return vm.setData(response.data);
                })
            }catch (error){
                log(error);
                flash(error.response.data.data.message, "danger");
                next();
            }
        },

    }
</script>