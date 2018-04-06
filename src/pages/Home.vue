<template>
    <div class="container">
        <div class="justify-content-center">
            <center>
                <geolocation id="map" v-model="address" />
                {{ address }}
            </center>
        </div>
    </div>
</template>

<script>
    import geolocation from '@/components/geolocation'
    export default {
        components:{geolocation},
        mounted() {
            console.log('Component mounted.')
        },
        data(){
            return{
                address:''
            }
        }
    }
</script>