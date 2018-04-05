<template>
    <div>
        <div class="row">
            <div class="col-md-2" style="padding-right: 0;">
                <data-filter :filters="filters"/>
            </div>
            <div class="col-md-10">
                <div class="card card-default table-card">
                    <div class="card-header">
                        <div class="d-flex align-items-center">
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

                            <button class="btn btn-primary">Create Batch</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <data-grid :data="batches" :columns="cols" @changed="getBatchesByCourseId"/>
                    </div>
                </div>
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
    import datePicker from 'vue-flatpickr-component';
    import courseApi from '@/services/course';
    import constants from '@/constants/Batch/grid';

    export default {
        components: {datePicker},
        created() {
            let vm = this;
            courseApi.getAllCourses(courses => vm.courses = courses);
        },
        data() {
            return {
                date: null,
                batches: {},
                courses: [],
                selectedCourse: null,
                cols: constants.cols,
                filters: constants.filters
            }
        },
        watch: {
            selectedCourse() {
                let page = this.$route.query.page;
                if (!page) {
                    page = 1;
                }
                if (this.selectedCourse) {
                    this.getBatchesByCourseId(page);
                }
            }
        },
        methods: {
            async getBatchesByCourseId(page = 1) {
                try {
                    let response = await axios.get(window.baseUrl + "/batches?id=" + this.selectedCourse._id + "&page=" + page);
                    this.batches = response.data;
                    history.pushState(null, null, '?id=' + this.selectedCourse._id + '&page=' + page);
                } catch (error) {
                    log(error);
                }
            }
        }
    }
</script>