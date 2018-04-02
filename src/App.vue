<template>
        <div class="main">
            <navigation-bar/>
            <div class="content-body">
                <transition name="fade" mode="out-in">
                    <router-view/>
                </transition>
            </div>
            <flash/>
        </div>
</template>

<script>
    import navigationBar from './layout/nav';
    export default {
        name: 'App',
        components: {navigationBar}
    }
</script>

<style lang="scss">
    @import './assets/sass/app.scss';
    .content-body {
        margin-top: 80px;
    }
</style>
