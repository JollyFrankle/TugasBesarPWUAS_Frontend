<template>
    <v-main>
        <v-container>
            <!-- sidebar kanan  -->
            <v-card height="500px">
                <v-navigation-drawer absolute permanent right>

                    <template v-slot:prepend>
                        <v-list-item two-line>
                            <v-list-item-avatar>
                                <img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'"
                                    alt="PP" />
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title class="judul">cek</v-list-item-title>

                            </v-list-item-content>
                        </v-list-item>
                    </template>

                    <v-divider></v-divider>

                </v-navigation-drawer>
            </v-card>


        </v-container>


    </v-main>
</template>
<script>
import { reactive, ref } from "vue";
import * as Api from "./ApiHelper";

import axios from "axios";
export default {
    setup() {
        const User = ref({
            id: 0,
            username: "",
            name: "",
            password: "",
            email: "",
            bio: "",
            tanggal_lahir: "",
            avatar: null,
            created_at: "",
        });

        const posts = ref([]);

        onMounted(() => {
            getUser()
            console.log(User)
        });
        function getUser() {
            axios.get(Api.BASE_URL + "/user", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                User.value = response.data.data;
                User.value.created_at = new Date(User.value.created_at).getFullYear();
                let tgl = new Date(User.value.tanggal_lahir);
                tgl.setHours(tgl.getHours() + 7);
                User.value.tanggal_lahir = tgl.toISOString().substr(0, 10);
                console.log(User)
            }).catch((error) => {
                console.log(error)
            });
        }


        function getPosts() {

            isPosting.value = true;

            axios.get(Api.BASE_URL + "/post/explore", {

                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                posts.value = response.data.data;
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                isPosting.value = false;
            });
        }

        getPosts();
        getUser();
        return {
            Api,
            User,
            getUser,
            User,
            isPosting,
            posts,
        }
    }
}
</script>