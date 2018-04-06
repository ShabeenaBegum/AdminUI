<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Login</div>
                    <div class="card-body">
                        <form @submit.prevent="doLogin()">
                            <div class="form-group row">
                                <label for="email" class="col-sm-4 col-form-label text-md-right">E-Mail Address</label>
                                <div class="col-md-6">
                                    <input v-validate="'required|email'"
                                           id="email" type="email"
                                           class="form-control" name="email"
                                           v-model="login.email">
                                    <span v-show="errors.has('email')"
                                          class="help text-danger">
                                        {{ errors.first('email') }}
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input v-validate="'required'"
                                           id="password" type="password"
                                           class="form-control"
                                           name="password" v-model="login.password">
                                    <span v-show="errors.has('password')"
                                          class="help text-danger">
                                        {{ errors.first('password') }}
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name="remember" v-model="login.remember"> Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" class="btn btn-primary" :class="{ loader:isLoading }">Login
                                    </button>
                                    <a class="btn btn-link" href="#">
                                        Forgot Your Password?
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isLoading: false,
                login: {
                    email: '',
                    password: '',
                    remember: false
                }
            }
        },
        methods: {
            async doLogin() {
                this.isLoading = true;
                try {
                    let result = await this.$validator.validateAll();
                    if (result) {
                        let user = JSON.stringify({
                            "_id": "e30a2348-f8ed-42a6-b3fc-1b7661e540bd",
                            "name": "AcadGild admin",
                            "email": "admin@acadgild.com",
                            "updated_at": "2018-03-26 14:32:21",
                            "created_at": "2018-03-26 14:32:21",
                            "type": "ADMIN",
                            "access_token": "ha_ha_dummy_access_token"
                        });
                        localStorage.setItem("authUser", user);
                        this.isLoading = false;
                        window.location = "/dashboard";
                    } else {
                        this.isLoading = false;
                    }
                } catch (e) {
                    this.isLoading = false;
                }
            }
        }
    }
</script>