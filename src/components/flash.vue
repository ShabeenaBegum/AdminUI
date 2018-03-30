<template>
    <transition name="slide-fade">
    <div :class="'alert alert-'+this.type+' alert-flash'" role="alert" v-show="show">
        <strong v-if="type === 'success'">Success!</strong>
        <strong v-if="type === 'danger'">Oops!</strong>
        {{ body }}
    </div>
    </transition>
</template>

<script>
    export default {
        props: ['message'],
        data() {
            return {
                body: '',
                show: false,
                type: 'success'
            }
        },
        created() {
            if (this.message) {
                this.flash(this.message);
            }
            this.eventHub.$on('flash', message => this.flash(message.message, message.type));
        },
        methods: {
            flash(message, type = "success") {
                this.body = message;
                this.show = true;
                this.type = type;
                this.hide();
            },
            hide() {
                setTimeout(() => {
                    this.show = false;
                }, 3000);
            }
        }
    };
</script>

<style scoped>
    /*.alert-flash {*/
        /*position: fixed;*/
        /*right: 25px;*/
        /*bottom: 25px;*/
        /*border-left: 8px solid;*/
        /*border-right: 8px solid;*/
        /*z-index: 9999;*/
    /*}*/
    /*.slide-fade-enter-active {*/
        /*transition: all .3s ease;*/
    /*}*/
    /*.slide-fade-leave-active {*/
        /*transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*}*/
    /*.slide-fade-enter, .slide-fade-leave-to*/
        /*!* .slide-fade-leave-active below version 2.1.8 *! {*/
        /*transform: translateX(10px);*/
        /*opacity: 0;*/
    /*}*/


    .alert-flash {
        position: fixed;
        top: 0;
        right: 44%;
        z-index: 9999;
        border-bottom: 2px solid;
    }
</style>