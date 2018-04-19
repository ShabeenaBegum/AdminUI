<template>
    <div class="text-left p-2">
        <p v-for="(recording, index) in recordingsLocal" v-text="recording.name" :key="index"></p>
        <hr>
        <h2>{{newRecording.name}}</h2>
        <input type="text" class="form-control mb-1" v-model="newRecording" placeholder="Enter Name">
        <input type="text" class="form-control" v-model="newRecording" placeholder="Enter Url">
        <button :disabled="!newRecording" class="btn btn-primary btn-sm btn-block mt-2 mb-1" @click="addRecording">
            Add Session Video link
        </button>
    </div>
</template>

<script>
    export default {
        name: "sessionVideoList",
        props:['recordings'],
        data(){
            return {
                recordingsLocal:[],
                newRecording: '',
            }
        },
        mounted(){
          this.recordingsLocal = this.recordings;
        },
        methods:{
            addRecording(){
                this.recordingsLocal.push({name: this.newRecording});
                this.newRecording  = '';
            }
        }
    }
</script>

<style scoped>

</style>