<template>
    <div>
        <button class="btn btn-filter btn-sm mr-2" @click="showFilter = !showFilter">
            <i class="fa fa-filter" aria-hidden="true"></i>
            &nbsp;Filter&nbsp; <span v-if="appliedFilters">{{ appliedFilters}}</span>
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
                                <option v-for="(option, index) in filter.options" :value="option.operator" :key="index">
                                    {{option.display_name}}
                                </option>
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
    </div>

</template>
<style scoped>
    .bs-FilterControl-flyout-header {
        align-items: center;
        background-color: #f6f9fc;
        border-bottom: 1px solid #e6ebf1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 6px;
    }
    .filter {
        position: absolute;
        z-index: 200;
        width: 250px;
        top: 60px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 0 1px rgba(136,152,170,.1), 0 15px 35px 0 rgba(49,49,93,.1), 0 5px 15px 0 rgba(0,0,0,.13);
        padding: 0;
    }
    .bs-FilterControl-list {
        background-color: #fff;
        border-radius: 3px;
        box-shadow: inset 0 0 2px rgba(0,0,0,.28);
    }
    .bs-FilterControl-item-label {
        border-bottom: 1px solid #e6ebf1;
        color: #525f7f;
        display: block;
        font-size: 12px;
        font-weight: 500;
        padding: 10px;
    }
    .bs-FilterControl-item-content {
        border-bottom: 1px solid #e6ebf1;
        max-height: 110px;
        padding: 10px;
        background-color: #f6f9fc;
        box-sizing: border-box;
        overflow: hidden;
        padding: 0 10px;
        transition: max-height .3s,padding .3s;
    }
    .filter-input {
        border: 1px solid #aaa;
        border-radius: 1px;
        border-bottom-color: #ccc;
        border-right-color: #ccc;
        box-shadow: inset 0 1px 0 rgba(0,0,0,.1);
        font-size: 12px;
        line-height: 12px;
        padding: 3px 4px;
        transition: box-shadow .1s ease-in-out;
        width: 100%;
    }
</style>
<script>
    export default {
        name: "data-filter",
        props:["filters"],
        data(){
            return {
                showFilter:false,
                finalFilters:"",
                appliedFilters:0,
            }
        },
        watch:{
            finalFilters(){
                this.$emit("input", this.finalFilters);
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
                }
                vm.showFilter = false;
            },
        }
    }
</script>