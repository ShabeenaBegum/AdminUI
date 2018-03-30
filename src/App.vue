<template>
        <div class="main">
            <agnav/>
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
            <flash/>
        </div>
</template>

<script>
    import agnav from '@/layout/nav';
    export default {
        name: 'App',
        components: {agnav}
    }
</script>

<style lang="scss">
    @import './assets/sass/app.scss';
</style>
