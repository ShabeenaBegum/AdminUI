<template>
    <div>
        <nav class="navbar navbar-expand-md navbar-light appbar fixed-top">
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/">AcadGild</router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <!--<ul class="navbar-nav mr-auto">-->
                        <!--<li class="nav-item">-->
                            <!--<router-link class="nav-link" to="/about">About</router-link>-->
                        <!--</li>-->

                        <!--<li class="nav-item" v-if="authCheck">-->
                            <!--<router-link class="nav-link" to="/dashboard">Dashboard</router-link>-->
                        <!--</li>-->
                    <!--</ul>-->

                    <auth-menus v-if="authCheck" @shownotification="showNotification = true"/>
                    <ul class="navbar-nav ml-auto" v-else>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <notifications v-if="showNotification" @closed="showNotification = false"/>
    </div>
</template>
<style>
    a.sidebar-active {
        color: #6772E5 !important;
        font-weight: bolder;
    }
    a#mainNavDropDown {
        font-weight: bolder;
        color: #000;
    }
</style>
<script>
    import notifications from './../components/notifications'
    import AuthMenus from "./authMenus";
    export default {
        components:{AuthMenus, notifications},
        data() {
            return {
                showNotification: false
            }
        },
        created(){
            this.changeMenuName();
        },
        watch:{
          '$route'(){
              this.changeMenuName();
          }
        },
        methods: {
            changeMenuName(){
                this.$nextTick(() => {
                    console.log("changeMenuName");
                    let n = $(".sidebar-active").text();
                    if(n){
                        $('#mainNavDropDown').text(n);
                    }
                });
            },
        },
    }
</script>
