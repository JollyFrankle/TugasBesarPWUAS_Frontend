<template>
    <v-container fluid class="body">
        <!-- side bar Kiri -->
        <v-navigation-drawer app v-model="drawer" width="15%" max-width="300px" min-width="200px" color="#93A9D1" class="sideNav" hide-overlay>
            <v-list-item>
                <v-list-item-content>
                   
                    <v-img :src="require('@/assets/UAJY.png')" contain max-height="60"></v-img>
                    <h1 class="text-center" style="color:#FFFFFF">Atma Jaya Social</h1>
                </v-list-item-content>
            </v-list-item>
            
            <v-divider></v-divider>
            <v-list nav>
                <v-list-item class="my-5 sidebar-menu-item" v-for="menu in menus" :key="menu.title" link tag="router-link" :to="menu.to">
                    <v-list-item-icon>
                        <v-icon>{{ menu.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title >{{ menu.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item @click="Logout()" class="my-5 sidebar-menu-item">
                    <v-list-item-icon>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <!-- <v-app-bar app fixed height="80%" color="#FFFF">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-spacer></v-spacer>

        </v-app-bar> -->


        <div style="min-height: 100vh !important;">
            <router-view></router-view>
        </div>

        <!-- Side bar Kanan -->
        <!-- <v-navigation-drawer app v-model="drawer"  absolute right width="16%" color="#93A9D1" hide-overlay>
            <template v-slot:prepend>
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <img src="https://randomuser.me/api/portraits/women/81.jpg">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>Jane Smith</v-list-item-title>
                        <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <v-divider></v-divider>
        </v-navigation-drawer> -->
        
        <!-- toast -->
        <!-- <vtoast ref="vtoast" /> -->
        <!-- Snackbar -->
        <v-snackbar v-model="sb.show" :color="sb.color" timeout="2000" center bottom>
            <v-icon left>{{ sb.icon }}</v-icon>
            {{ sb.message }}
            <template v-slot:action="{ attrs }">
                <v-btn icon v-bind="attrs" @click="(sb.show = false)">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-snackbar>
    </v-container>

</template>

<!-- <style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@500&display=swap');

.navbartext {
    font-family: Poppins;
    font-style: bold;
    color: black;
    font-size: 20px;
}

.textfield {
    font-family: Poppins !important;
    color: black;
}
</style> -->

<style>
.nl2br {
    white-space: pre-wrap;
}

.post-content {
    line-height: 1.5;
    font-size: 1rem;
    opacity: 1;
}

.post-content-large {
    font-size: 1.5rem;
}

.sideNav{
   background-image: linear-gradient(  #58acec 50%, #b1eded 100%);
}
.body{
    background-image: linear-gradient( 100deg, #64b2ee 10%, #b1eded 100%);
    /* overlay background */
}
.sidebar-menu-item {
    font-weight: bold;
    color: #2c2c2c;
}
.sidebar-menu-item .v-icon {
    color: #2c2c2c;
}

.sidebar-menu-item.v-list-item--active {
    color: #fff;
}
.sidebar-menu-item.v-list-item--active .v-icon {
    color: #fff;
}
</style>

<script>
import axios from "axios";
import * as Api from "./ApiHelper";
export default {
    name: 'LayoutTemplate',
    data() {
        return {
            drawer: true,
            menus: [
                { title: 'Home', icon: 'mdi-home', to: '/' },
               // { title: 'Explore', icon: 'mdi-compass', to: '/explore' },
                { title: 'Marketplace', icon: ' mdi-store', to: '/market' },
                { title: 'Profil', icon: ' mdi-account', to: '/profil' },
            ],
            sb: {
                show: false,
                message: '',
                color: '',
                icon: ''
            }
        }
    },
    methods: {
        snackbar: function ({ message, color, icon }) {
            this.sb.show = true
            this.sb.message = message
            this.sb.color = color
            this.sb.icon = icon
        }
    },
    setup(){
        function Logout(){
            axios.post(Api.BASE_URL + "/logout",{
                // body: tidak ada
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            })
            .then((response) =>{
                $cookies.remove("SESSION");
                this.$router.push('/login');
            }).catch((error) => {
                this.sb.icon = "mdi-alert";
                this.sb.message = error.response.data;
                this.sb.color = "red";
                this.sb.show = true;
            });
        }
        return {
            Logout,
        }
    },
    mounted() {
        if($cookies.get("SESSION") == null){
            this.$router.push('/login')
        }
        this.$root.$on('snackbar', this.snackbar)
    },
}
</script>
