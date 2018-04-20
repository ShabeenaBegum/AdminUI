<template>
        <div class="main">
            <navigation-bar/>
            <div class="content-body">
                <transition name="fade">
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
    .fade-enter-active, .fade-leave-active {
        transition-property: opacity;
        transition-duration: .08s;
        transition-timing-function: ease;
    }
    .fade-enter-active {
        transition-delay: .08s;
        transition-timing-function: ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
