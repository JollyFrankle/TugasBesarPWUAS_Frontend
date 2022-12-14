<template>
    <v-main >

        <div class="mt-5 mx-6">
            <h5 class="text-h5 mb-4">Best-Selling Merchandises</h5>
            <v-row>
                <v-col cols="3" v-for="merch in merchandises" :key="merch.id">
                    <v-card :color="merch.color" dark>
                        <v-card-title class="text-h6 text-center d-block pb-0">
                            {{ merch.merchandise }}
                        </v-card-title>

                        <v-card-text class="text-center pb-0">
                            By <strong>{{ merch.artist }}</strong>
                        </v-card-text>

                        <v-card-actions>
                            <v-card-text>
                                Rp {{ merch.price }}
                            </v-card-text>
                            <v-btn icon @click="merch.reveal = !merch.reveal">
                                <v-icon>{{ merch.reveal ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>

                        <v-expand-transition>
                            <div v-show="merch.reveal">
                                <v-divider></v-divider>

                                <v-card-text>
                                    <p><strong>{{ merch.merchandise }}</strong> is a merchandise from the artist {{ merch.artist }}. It is packaged in a {{ merch.package }}.</p>
                                    <p class="mb-0">The price of this merchandise is Rp {{ merch.price }}, and it is available in {{ merch.stock }} stock.</p>
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-col>
            </v-row>
        </div>

    </v-main>
</template>

<script>
//tambahkan code untuk import database reference dan fungsi bawaan dari firebase database
// import { db } from '../firebase.js'
// import { ref, set, remove, get, push, onValue } from "@firebase/database";

// export default {
//     name: "AlbumPage",
//     data() {
//         return {
//             merchandises: [],
//         }
//     },

//     created() {
//         // tambahkan fungsi untuk retrieve data
//         this.load = true;
//         onValue(ref(db, 'merchandises'), (snapshot) => {
//             this.merchandises = [];
//             snapshot.forEach((merchandise) => {
//                 var childKey = merchandise.key;
//                 var childData = merchandise.val();
//                 let merchData = {
//                     id: childKey,
//                     color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
//                     reveal: false,
//                     ...childData
//                 };
//                 this.merchandises.push(merchData);
//             })
//             this.load = false;
//         })
//     },

//     methods: {

//     },

//     computed: {

//     },
// }
</script>
<style>

</style>
