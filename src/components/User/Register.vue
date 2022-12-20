<template>
    <v-main class="body ">
        <v-container fill-height>
            <v-card 
                elevation="3" 
                class="mx-auto" 
                rounded
                max-width="374" 
                align-center justify-center
                :loading="loading" :disabled="loading">

                <v-card-title class="text-h6 text-center d-block pb-0">
                    <v-img :src="require('@/assets/UAJY.png')" contain max-height="50"
                    style="-webkit-filter: drop-shadow( 2px 2px 2px #FFF);"></v-img>
                    Register AJS
                </v-card-title>
                <v-divider></v-divider>

                <v-form @submit.prevent="Register()">
                    <v-card-text class="text-center">
                        <!-- Input Name -->
                        <v-text-field v-model="user.name" label="Name" type="text" prepend-inner-icon="mdi-account" color="blue" outlined :error-messages="validation.name"></v-text-field>

                        <!-- Input Username -->
                        <v-text-field v-model="user.username" label="Username" type="text" prepend-inner-icon="mdi-account" color="blue" outlined :error-messages="validation.username"></v-text-field>

                        <!-- Input Email -->
                        <v-text-field v-model="user.email" label="Email" type="text" prepend-inner-icon="mdi-mail" color="blue" outlined :error-messages="validation.email"></v-text-field>

                        <!-- Input Password -->
                        <v-text-field v-model="user.password" label="Password" prepend-inner-icon="mdi-lock" color="blue" outlined :error-messages="validation.password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                        ></v-text-field> 

                        <!-- Input Confrim Password -->
                        <v-text-field v-model="user.confirmPassword" label="Confirm Password" prepend-inner-icon="mdi-lock" color="blue" outlined :error-messages="validation.password"
                            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            @click:append="(showConfirmPassword = !showConfirmPassword)"
                        ></v-text-field>
                    </v-card-text>
                    
                    <!-- Card Action -->
                    <v-card-actions class="d-block">
                        <v-btn width="100%" color="primary" type="submit">Register</v-btn>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn :to="{name: 'Login'}" text type="button" color="primary" class="mx-auto">Login</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-container>

        <!-- Snackbar -->
        <v-snackbar v-model="snackbar.show" text :color="snackbar.color" timeout="2000" center bottom>
            <v-icon left>{{ snackbar.icon }}</v-icon>
            {{ snackbar.message }}
            <template v-slot:action="{ attrs }">
                <v-btn icon v-bind="attrs" @click="(snackbar.show = false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </v-main>
</template>

<script>
import { reactive, ref } from "vue";
// import { useRouter } from "vue-router";
import * as Api from "../ApiHelper";

import axios from "axios";
export default {
    setup() {
        const user = reactive({
            name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        const snackbar = reactive({
            show: false,
            message: "",
            color: "",
            icon: "",
        });

        const loading = ref(false);
        //state validation
        const validation = ref([]);
        //vue router
        // const router = useRouter();
        const showPassword = ref(false);
        const showConfirmPassword = ref(false);
        
        // function register
        function Register(){
            loading.value = true;
            axios.post(Api.BASE_URL + "/register", {
                name: user.name,
                username: user.username,
                email: user.email,
                password: user.password,
                password_confirmation: user.confirmPassword,
            })
            .then((response) =>{
                this.$router.push({
                    name: 'Login',
                })
                snackbar.show = true;
                snackbar.message = "Register Success";
                snackbar.color = "success";
                snackbar.icon = "mdi-check";
            }).catch((error) => {
                validation.value = error.response.data.data;

                snackbar.show = true;
                snackbar.message = "Register Failed";
                snackbar.color = "error";
                snackbar.icon = "mdi-close";

                console.log(validation)
            }).finally(() => {
                loading.value = false;
            });
        } 
        
        // Return
        return {
            Register, 
            user, 
            validation, 
            showPassword,
            showConfirmPassword,
            snackbar,
            loading
        };
    }
    
}

</script>
<style scoped>
.body{

    background-image: linear-gradient( 100deg, #c1eded 10%, #58acec 100%);
    /* background-image: linear-gradient(to bottom right, rgb(20, 75, 30) 50%, rgb(97, 62, 6)); */
}
</style>