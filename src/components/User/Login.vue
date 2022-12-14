<template>
    <v-main class="body " >
        <v-container fill-height>
            <v-row>
                <v-col cols="12" sm="12" md="7" lg="8">
                    <v-carousel
                        cycle
                        height="400"
                        hide-delimiter-background
                        show-arrows-on-hover
                    >
                        <v-carousel-item
                            v-for="(slide, i) in slides"
                            :key="i"
                        >
                            <v-row
                                class="fill-height"
                                align="center"
                                justify="center"
                            >
                            <div class="text-h2">
                                <v-img :src="slide" width="100%" contain height="400" ></v-img>
                            </div>
                            </v-row>
                        </v-carousel-item>
                    </v-carousel>
                </v-col>
                <v-col cols="12" sm="12" md="5" lg="4">
                    <v-card elevation="3" 
                        class="mx-auto" 
                        rounded
                        align-center 
                        justify-center>


                        <v-card-title class="text-h6 text-center d-block pb-0">
                            <v-img :src="require('@/assets/UAJY.png')" contain max-height="30"
                                style="-webkit-filter: drop-shadow( 2px 2px 2px #FFF);"></v-img>
                            Welcome to Atma Jaya Social
                        </v-card-title>

                        
                        <v-divider></v-divider>
                        <v-card-text class="text-center pb-0">
                            <!-- <v-form> -->
                                <v-text-field v-model="user.username" label="Username/Email" type="text" prepend-inner-icon="mdi-account" color="blue" outlined :error-messages="validation.username"></v-text-field>
                                <v-text-field v-model="user.password" label="Password" prepend-inner-icon="mdi-lock" color="blue" outlined :error-messages="validation.password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
                                    
                                    ></v-text-field>
                            <!-- </v-form> -->
                        </v-card-text>
                        <v-card-actions>
                            <!-- <v-row align="center" justify="end"> -->
                                <!-- <v-spacer></v-spacer> -->
                                <v-btn width="100%" color="primary" class="d-block" @click="Login()" >Login</v-btn>
                                <!-- <v-spacer></v-spacer> -->
                            <!-- </v-row> -->
                        </v-card-actions>
                        <v-card-actions >
                            <v-btn :to="{name: 'Register'}"  color="primary"  text class="mx-auto"  @click="Register()"  >Register</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            
        </v-container>

        <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2000" center bottom>
            <v-icon left>{{ snackbar.icon }}</v-icon>
            {{ snackbar.message }}
            <template v-slot:action="{ attrs }">
            <v-btn
                icon
                v-bind="attrs"
                @click="(snackbar.show = false)"
            >
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
        const slides= [
            'https://neilpatel.com/wp-content/uploads/2014/06/social-media-sites-blog.jpg',
            'https://www.ebu.ch/files/live/sites/ebu/files/Events/Media/Digital%20Media%20Days%202020/Digital%20Media%20Days%202020%20-%20Online%20edition/social-media_resize_md.jpg',
            'https://images.indianexpress.com/2022/05/social-media-crop.jpg',
            'https://phlearn.com/wp-content/uploads/2019/02/social-media-planning-header.jpg?fit=1600%2C1104&quality=99&strip=all',
            'https://www.managementsite.nl/resized/2011/03/Social-media.jpg_2000x2000_nocrop.webp',  
        ]

        const user = reactive({
            username: "",
            password: "",
        });

        const snackbar = reactive({
            show: false,
            message: "",
            color: "",
            icon: "",
        });
        const showPassword = ref(false);
        //state validation
        const validation = ref([]);

        function Login(){
            axios.post(Api.BASE_URL + "/login", {
                username: user.username,
                password: user.password
            })
            .then((response) =>{
                let session_token = response.data.data.token;
                $cookies.set("SESSION", session_token);
                this.$router.push({
                    name: 'Home',
                })
            }).catch((error) => {
                validation.value.username = error.response.data.data;
                validation.value.password = error.response.data.data;
                snackbar.show = true;
                snackbar.icon = "mdi-alert";
                snackbar.message = "Username atau password salah!";
                snackbar.color = "red";
            });
        }


        return{
            showPassword,
            slides,
            user,
            validation,
            Login,
            snackbar
        }

    }
}

</script>
<style>
.body{
    background-color: brown; /* For browsers that do not support gradients */
    background-image: linear-gradient( 135deg, #d7dde8 10%, #9cb4da 100%);
    /* background-image: linear-gradient(to bottom right, rgb(20, 75, 30) 50%, rgb(97, 62, 6)); */
}
</style>