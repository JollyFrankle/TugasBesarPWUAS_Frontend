<template>
    <v-container fluid class="body">
        <!-- side bar Kiri -->
        <v-navigation-drawer app v-model="drawer" width="15%" max-width="300px" min-width="200px" color="#93A9D1" hide-overlay>
            <v-list-item>
                <v-list-item-content>
                   
                    <v-img :src="require('@/assets/UAJY.png')" contain max-height="60"></v-img>
                    <h1 style="font-family: Poppins; color: #FFFFFF; font-size: 150.5%; font-weight: 600;" class="text-center">Atma Jaya Social</h1>
                </v-list-item-content>
            </v-list-item>
            
            <v-divider></v-divider>
            <v-list nav>
                <v-list-item class="my-5" v-for="menu in menus" :key="menu.title" link tag="router-link" :to="menu.to">
                    <v-list-item-icon>
                        <v-icon color="#394252">{{ menu.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title
                            style="font-family: Poppins; color: #FFFFFF; font-size: 110.5%; font-weight: 600;">{{
                                    menu.title
                            }}</v-list-item-title>

                            
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
</style>

<script>
export default {
    name: 'LayoutTemplate',
    data() {
        return {
            drawer: true,
            menus: [
                { title: 'Home', icon: 'mdi-home', to: '/' },
                { title: 'Explore', icon: 'mdi-compass', to: '/explore' },
                { title: 'MarketPlace', icon: ' mdi-store', to: '/market' },
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
    mounted() {
        this.$root.$on('snackbar', this.snackbar)
    },
}
</script>
<style>
.body{
    background-color: #d3d9e1; /* For browsers that do not support gradients */

}
</style>