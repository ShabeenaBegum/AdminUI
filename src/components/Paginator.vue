<template>
    <div v-if="shouldPaginate">
        <strong class="ml-2">{{dataSet.total}} Results | showing {{dataSet.current_page}} of {{ dataSet.last_page}} pages</strong>
        <div class="pagination-table float-right" >
            <button :disabled="!prevUrl" class="btn btn-primary btn-sm mr-3" @click.prevent="page--">
                Previous
            </button>

            <button  :disabled="!nextUrl" class="btn btn-primary btn-sm mr-3" @click.prevent="page++">
                Next
            </button>
        </div>
    </div>



</template>

<script>
    export default {
        props: ['dataSet'],

        data() {
            return {
                page: 1,
                prevUrl: false,
                nextUrl: false
            };
        },

        watch: {
            dataSet() {
                this.page = this.dataSet.current_page;
                this.prevUrl = this.dataSet.prev_page_url;
                this.nextUrl = this.dataSet.next_page_url;
            },
            page() {
                this.$emit('changed', this.page);
            }
        },

        computed: {
            shouldPaginate() {
                return !!this.prevUrl || !!this.nextUrl;
            }
        },
    };
</script>