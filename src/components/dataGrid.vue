<template>
    <div>
        <table class="table table-hover">
            <thead>
            <tr>
                <th scope="col" v-for="(column, index) in cols" :key="index">
                    {{ typeof column === 'object' ? column.name : column }}
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in data.data" :key="index" @click="$emit('rowClicked', row)">
                    <td v-for="(key, index1) in cols" :key="index1">
                        <slot :row="row" :col="typeof row === 'object' ? key.key : key">
                            {{typeof row === 'object' ? row[key.key] : row[key]}}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>


        <div class="bottom-table  mb-3">
            <paginator :dataSet="data" @changed="pageChanged"/>
        </div>
    </div>

</template>

<script>
    import paginator from './Paginator';

    export default {
        name: "data-grid",
        components:{paginator},
        props:{
            data: {
                type: Object,
                required: true
            },
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        computed:{
            cols(){
                if(!this.columns.length){
                    var columns = [];
                    var max = 0;
                    let data = this.data.data ? this.data.data : [];
                    _.forEach(data, function(value) {
                        var col = _.keys(value);
                        if(col.length > max){
                            max = col.length;
                            columns = col;
                        }
                    });
                    return columns;
                }else{
                    return this.columns
                }
            }
        },
        methods:{
            pageChanged(page){
                this.$emit("changed", page);
            }
        }
    }
</script>

<style scoped>

</style>