<template>
    <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="mainNavDropDown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dashboard
            </a>
            <div class="dropdown-menu" aria-labelledby="mainNavDropDown">
                <router-link active-class="sidebar-active" class="dropdown-item" :to="{name :'management.batch.index'}"><i class="fa fa-bookmark"></i>&nbsp;Batch Management</router-link>
                <div class="dropdown-divider"></div>
                <router-link active-class="sidebar-active" class="dropdown-item" :to="{name :'management.mentor.index'}"><i class="fa fa-bookmark"></i>&nbsp;Mentor Management</router-link>
                <div class="dropdown-divider"></div>
                <router-link active-class="sidebar-active" class="dropdown-item" :to="{name :'management.student.index'}"><i class="fa fa-users"></i>&nbsp;Student Management</router-link>
                <div class="dropdown-divider"></div>
                <router-link active-class="sidebar-active" class="dropdown-item" to="/about"><i class="fa fa-life-ring"></i>&nbsp;Session Tracking</router-link>
                <div class="dropdown-divider"></div>
            </div>
        </li>
        <li class="nav-item">
            <a href="#"
               class="nav-link" @click.prevent="$emit('shownotification')">
                <i class="fa fa-bell" aria-hidden="true" style="font-size: 20px;margin-top: 5px;"></i>
            </a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
                <span class="avatar">{{ authUser.name[0] }}</span>
                <span>{{ authUser.name }}</span>
                <span class="caret"></span>
            </a>
            <ul role="menu" class="dropdown-menu user-nav">
                <li class="dropdown-header">Settings</li>
                <li>
                    <router-link
                            to="/settings"
                            class="dropdown-item">
                        <i class="fa fa-fw fa-btn fa-cog"></i>
                        Settings
                    </router-link>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                    <a class="dropdown-item" href="#" @click.prevent="logout()">
                        <i class="fa fa-fw fa-btn fa-sign-out"></i>Logout
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "authMenus",
        methods:{
            logout() {
                localStorage.removeItem("authUser");
                window.location = "/login";
            }
        }
    }
</script>

<style scoped>

</style>