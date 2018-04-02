<template>
    <div class="container-fluid">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import 'flatpickr/dist/flatpickr.css';
    export default {
    }
</script>