<template>
    <v-main>

        <!-- Side Bar kanan  -->
        <v-container>
                       <v-card height="600px">
                <v-navigation-drawer
                absolute

                right
                >
                <template v-slot:prepend>
                    <v-list-item >
                    <v-list-item-avatar>
                        <v-img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>

                        <v-list-item-title>Nama User</v-list-item-title>
                        <v-list-item-subtitle>@ </v-list-item-subtitle>
                        <v-list-item-subtitle>Jumlah Follwer</v-list-item-subtitle>
                    </v-list-item-content>


                    </v-list-item>
                </template>

                <v-divider></v-divider>

                <v-list dense>
        
                </v-list>
                </v-navigation-drawer>
            </v-card>
        </v-container>

 
            <!-- isi Content Pos -->
            <v-container>




            </v-container> 
    
    </v-main>
</template>
<script>
import { reactive, ref } from "vue";
import * as Api from "./ApiHelper";
import { onMounted  } from "vue";
import axios from "axios";
import { useRoute } from 'vue2-helpers/vue-router';
export default {
    setup() {
        const route = useRoute();
        const id = ref(route.params.id);
        const User = ref({});

        const validation = ref([]);

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



        // Return
        getUser();


        return {
            Api,
            User,
            getUser,
            show: false,
            snackbar,
            validation
        };
    }
}
</script>