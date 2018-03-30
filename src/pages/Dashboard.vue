<template>
    <div class="container-fluid">
    <div class="row">
        <div class="col-md-2">
            <ul class="list-unstyled side-bar-nav">
                <li class="nav-main">
                    <router-link active-class="sidebar-active" class="nav-link" :to="{name :'management.batch.index'}"><i class="fa fa-bookmark"></i>&nbsp;Batch Management</router-link>
                </li>
                <li class="nav-main">
                    <router-link active-class="sidebar-active" class="nav-link" :to="{name :'management.mentor.index'}"><i class="fa fa-bookmark"></i>&nbsp;Mentor Management</router-link>
                </li>
                <li class="nav-main">
                    <router-link active-class="sidebar-active" class="nav-link" :to="{name :'management.student.index'}"><i class="fa fa-users"></i>&nbsp;Student Management</router-link>
                </li>
                <li class="nav-main">
                    <router-link active-class="sidebar-active" class="nav-link" to="/about"><i class="fa fa-cube"></i>&nbsp;Course Management</router-link>
                </li>
                <li class="nav-main">
                    <router-link active-class="sidebar-active" class="nav-link" to="/about"><i class="fa fa-money"></i>&nbsp;Coupon Management</router-link>
                </li>
                <li class="nav-main">
                    <router-link active-class="sidebar-active" class="nav-link" to="/about"><i class="fa fa-cog"></i>&nbsp;Referral Management</router-link>
                </li>
                <li class="nav-main">
                    <router-link active-class="sidebar-active" class="nav-link" to="/about"><i class="fa fa-star"></i>&nbsp;Review Management</router-link>
                </li>
                <li class="nav-main">
                    <router-link active-class="sidebar-active" class="nav-link" to="/about"><i class="fa fa-life-ring"></i>&nbsp;Session Tracking</router-link>
                </li>
            </ul>
        </div>
        <div class="col-md-10">
            <transition name="fade" mode="out-in">
                <router-view/>
            </transition>
        </div>
    </div>
    </div>
</template>
<style>
    a.nav-link.sidebar-active {
        color: #6772E5 !important;
        text-decoration: underline;
    }
</style>
<script>
    export default {
        metaInfo: {
            title: 'Dashboard',
        },
        mounted() {
            console.log('Component mounted.')
        },
        data(){
            return {

            }
        }
    }
</script>