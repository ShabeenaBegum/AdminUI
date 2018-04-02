<template>
    <div>
        <div class="card">
            <div class="card-header flex space-between">
                Filter's &nbsp;<span v-if="appliedFilters">{{ appliedFilters}}</span>
                <button class="btn btn-link btn-sm" @click="clearFilters">Reset</button>
                <button class="btn btn-outline-dark btn-sm" @click="applyFilter">Apply</button>
            </div>
            <div class="card-body">
                <div class="filter mb-2" v-for="filter in filters">
                <span style="cursor: pointer;display: block" data-toggle="collapse" :data-target="'#'+filter.key">
                    {{ filter.display_name}}
                </span>
                    <div class="collapse" :id="filter.key">
                        <select class="form-control form-control-sm">
                            <option :value="option.operator" v-for="option in filter.options">
                                {{ option.display_name}}
                            </option>
                        </select>
                        <input v-model="filter.value" type="text" class="form-control form-control-sm">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default {
        name: "data-filter",
        props: ["filters"],
        data() {
            return {
                showFilter: false,
                finalFilters: "",
                appliedFilters: 0,
            }
        },
        watch: {
            finalFilters() {
                this.$emit("input", this.finalFilters);
            }
        },
        methods: {
            clearFilters() {
                _.each(this.filters, function (filter) {
                    filter.value = null;
                });
                this.appliedFilters = _.sumBy(this.filters, function (o) {
                    return o.value ? 1 : 0;
                });
                $('.collapse').collapse('hide');
            },
            applyFilter() {
                let vm = this;
                var tempFilters = [];
                vm.filters.forEach(function (a) {
                    if (a.value) {
                        tempFilters.push("filter" + a.key + "[" + a.operator + "]=" + a.value);
                    }
                });
                vm.finalFilters = tempFilters.join("&");
                vm.appliedFilters = _.sumBy(this.filters, function (o) {
                    return o.value ? 1 : 0;
                });
                log(vm.finalFilters);
                if (vm.finalFilters) {
                    var prevSearch = window.location.search;
                    if (prevSearch) {
                        history.pushState(null, null, prevSearch + "&" + vm.finalFilters)
                    } else {
                        history.pushState(null, null, "?" + vm.finalFilters)
                    }
                    //history.pushState(null, null, '?'+vm.finalFilters);
                } else {
                    var withOutFilters = [];
                    for (var att in vm.$route.query) {
                        if (!att.includes("filter")) {
                            var st = att + "=" + vm.$route.query[att];
                            withOutFilters.push(st);
                        }
                    }
                    if (withOutFilters.length) {
                        history.pushState(null, null, "?" + withOutFilters.join("&"));
                    }
                }
                vm.showFilter = false;
            },
        }
    }
</script>