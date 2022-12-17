<template>
        <v-main>         
            <!-- <v-container fluid>  -->
                <!-- search and add   -->
                <v-card elevation="3" class="mt-5 mx-6" style="border-radius: 6px;">
                    <v-row justify="center" align="center" style="margin:3px auto;">
                 <v-col>
                    <h2>Selamat Datang Di Market AJS</h2>
                    <p style="font-family: 'Times', serif; font-size: " class="mb-0"><em>Marketplace Terbaik Dari AJS</em></p>
                </v-col>
                <v-col>
                    <v-btn 
                    class="font-weight-bold" 
                    style="margin:10px auto; font-size: 20px; text-transform: capitalize; float:right; color: #FFFFFF" 
                    x-large color="blue darken-1" 
                    @click="dialog = true">Add Product</v-btn>
                </v-col>
                
                </v-row>
      
            </v-card> 
        <!-- </v-container> -->
        
        <!-- Container Card  -->
        <v-container>         
                <v-tabs
                background-color="#FFFFFF"
                grow
                >
                <!-- Tab All dan Tab My Product -->
                    <v-tab>
                        All Product
                    </v-tab>

                    <v-tab>
                        My Product
                    </v-tab>



                <v-tab-item>
                    <!-- Card Buat View All Product -->
                    <v-row class="px-3 py-3">
                        <v-col cols="4" v-for="product in Products" :key="product.id">
                            <v-card class="mx-auto hover" max-width="auto" tile>
                                <v-card-text>
                                    <v-list-item>
                                         <v-list-item-avatar size="64">
                                            <v-img :src="product.user.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + product.user.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title class="title">{{product.user.name}}</v-list-item-title>
                                            <v-list-item-subtitle>@{{product.user.username }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                         <div class="text-center">
                                </div>
                                    </v-list-item>
                                    <v-list-item-content>
                                        <v-list-item class="text-h4"> {{product.name}} </v-list-item>
                                        <v-list-item class="text-h6"> Rp {{product.price}},00 </v-list-item>
                                        <v-list-item class="text-h6"> Tanggal Dibuat: {{product.created_at}} </v-list-item>
                                        <v-list-item class="text-h6"> Deskripsi Product: {{product.description}} </v-list-item>
                                    </v-list-item-content>

                                    <v-img 
                                        style="margin-left: 10px;"
                                        :src="Api.BASE_NONAPI + '/storage/images/marketplace/' + product.image" aspect-ratio="1" contain
                                    ></v-img>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
            </v-tab-item>


            <v-tab-item>
                <!-- View Buat MY Product -->
                <v-row class="px-3 py-3">
                    <v-col cols="4" v-for="product in myProducts" :key="product.id">
                        <v-card class="mx-auto hover" max-width="auto" tile>
                            <v-card-text>
                                <v-list-item>
                                        <v-list-item-avatar size="64">
                                        <v-img :src="product.user.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + product.user.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="title">{{product.user.name}}</v-list-item-title>
                                        <v-list-item-subtitle>@{{product.user.username }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-menu offset-y>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon>mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list dense>
                                            <v-list-item-group>
                                                <v-list-item>
                                                    <v-list-item-title @click="editMarket(product.id)" color="green">
                                                        <v-icon left  color="green">mdi-pencil</v-icon>
                                                        Edit
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-title @click="deleteMarket(product.id)" color="red">
                                                        <v-icon left color="red"    >mdi-delete</v-icon>
                                                        Delete
                                                    </v-list-item-title>
                                                </v-list-item>                      
                                            </v-list-item-group>
                                        </v-list>
                                    </v-menu>
                                </v-list-item>
                                <v-list-item-content>
                                    <v-list-item class="text-h4"> {{product.name}} </v-list-item>
                                    <v-list-item class="text-h6"> Rp {{ product.price }},00 </v-list-item>
                                    <v-list-item class="text-h6"> Tanggal Dibuat: {{product.created_at}} </v-list-item>
                                    <v-list-item class="text-h6"> Deskripsi Product: {{product.description}} </v-list-item>
                                </v-list-item-content>

                                <v-img 
                                    style="margin-left: 10px;"
                                    :src="Api.BASE_NONAPI + '/storage/images/marketplace/' + product.image" aspect-ratio="1" contain
                                ></v-img>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            
            </v-tab-item>

        </v-tabs>  
    
    </v-container> 
        <!-- Dialog Add Product -->
        <v-dialog 
            v-model="dialog" 
            persistent max-width="600px">
            <v-form @submit.prevent="createMarket">
                <v-card class="hover">
                    <v-toolbar color="blue darken-1" dark class="headline">Add Product</v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-text-field
                                label="Nama"
                                v-model="newProduct.name"
                                :error-messages="validation.name"
                                required
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Harga"
                                v-model="newProduct.price"
                                :error-messages="validation.price"
                                prefix="Rp."
                                required
                                outlined
                            ></v-text-field>

                            <v-textarea
                                label="Deskripsi"
                                v-model="newProduct.description"
                                :error-messages="validation.description"
                                required
                                outlined
                            ></v-textarea>

                            <v-file-input
                                outlined
                                id="uploader"
                                v-model="newProduct.image"
                                :error-messages="validation.image"
                                accept="image/png, image/jpeg, image/bmp"
                                placeholder="Pick an image"
                                prepend-icon="mdi-camera"
                                @change="onimageSelected"
                                label="Image"
                                counter
                                show-size
                                ></v-file-input>
                            <v-img
                                :src="newProduct.imageLink != null ? newProduct.imageLink : 'https://cdn.vuetifyjs.com/images/cards/sunshine.jpg'" aspect-ratio="1" contain
                            ></v-img>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer> 
                        <v-btn color="gray lighten-2" text type="button" @click="dialog = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text type="submit">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>

        <v-dialog 
            v-model="editProductDialog" 
            persistent max-width="600px">
            <v-form @submit.prevent="UpdateMarket">
                <v-card>
                    <v-toolbar color="blue darken-1" dark class="headline">Update Product</v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-text-field
                                label="Nama"
                                v-model="editProductContent.name"
                                :error-messages="validation.name"
                                required
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Harga"
                                v-model="editProductContent.price"
                                :error-messages="validation.price"
                                prefix="Rp."
                                required
                                outlined
                            ></v-text-field>

                            <v-textarea
                                label="Deskripsi"
                                v-model="editProductContent.description"
                                :error-messages="validation.description"
                                required
                                outlined
                            ></v-textarea>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="gray lighten-2" text type="button" @click="editProductDialog = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text type="submit">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        
        <!-- snacbkar -->
        <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="2000" center bottom>
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
import * as Api from "./ApiHelper";
import axios from "axios";
import { useRoute } from 'vue2-helpers/vue-router';
export default{
    setup() {
        const route = useRoute();
        const id = ref(route.params.id);
        let dialogUpdate = ref(false);
        let dialogPreview = ref(false);
        let dialog = ref(false);

        const User = ref({});
        const Products = ref([]);
        const myProducts = ref([]);
        // const isProduct = ref(false);
        const editProductDialog = ref(false);
        const editProductContent = ref({
            id: 0,
            name: "",
            description: "",
            price: ""
        });

        const newProduct = reactive({
            name:"",
            description: "",
            price: "",
            image: null,
            imageLink: null
        });

        const snackbar = reactive({
            show: false,
            color: '',
            icon: '',
            message:''
        })

        const validation = ref([]);

        function createMarket(){
            let formData = new FormData();

            formData.append('name', newProduct.name);
            formData.append('description', newProduct.description);
            formData.append('price', newProduct.price);
            formData.append('image', newProduct.image);

            // isProduct.value = true;
            axios.post(Api.BASE_URL + "/marketplace",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            })
            .then((response) => {
                newProduct.name = "";
                newProduct.description = "";
                newProduct.price = "";
                newProduct.image = null;
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil membuat produk';
                snackbar.show = true;
                dialog.value = false;
                getMarkets();
                getMyMarkets();

                dialog.value = false;
                // isProduct.value = false;
            }).catch((error) => {
                // validation.value = error.response.data.data;

                const errorCode = error.response.status;
                if (errorCode == 401) {
                    snackbar.color = 'error';
                    snackbar.icon = 'mdi-close';
                    snackbar.message = 'Anda belum log in!';
                    snackbar.show = true;
                } else {
                    snackbar.color = 'error';
                    snackbar.icon = 'mdi-close';
                    snackbar.message = 'Gagal membuat produk: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                    validation.value = error.response.data.data;
                }
                // isProduct.value = false;
            });
        }

        function editMarket(id){
            axios.get(Api.BASE_URL + "/marketplace/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                editProductContent.value = response.data.data;
                console.log(response.data.data)
                editProductDialog.value = true;
            }).catch((error) => {
                console.log(error)
                snackbar.color = 'error';
                snackbar.icon = 'mdi-close';
                snackbar.message = 'Gagal mengambil data produk Anda!';
                snackbar.show = true;
            });

        }
        function UpdateMarket(){
            // isProduct.value = true;
            axios.put(Api.BASE_URL + "/marketplace/" + editProductContent.value.id, editProductContent.value, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil mengubah produk Anda!';
                snackbar.show = true;
                getMarkets();
                getMyMarkets();
                editProductDialog.value = false;
            }).catch((error) => {
                const errorCode = error.response.status;
                if (errorCode == 401) {
                    snackbar.color = 'error';
                    snackbar.icon = 'mdi-close';
                    snackbar.message = 'Anda belum log in!';
                    snackbar.show = true;
                } else {
                    snackbar.color = 'error';
                    snackbar.icon = 'mdi-close';
                    snackbar.message = 'Gagal mengubah produk: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }

                // isProduct.value = false;
            });
        }
        
        function onimageSelected(event) {
            let file = document.getElementById("uploader").files[0];
            if(file) {
                newProduct.imageLink = URL.createObjectURL(file);
            }
        }
        
        function getMarkets(){
            // isProduct.value = true;
            axios.get(Api.BASE_URL + "/marketplace/all", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                Products.value = response.data.data;
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                // isProduct.value = false;
            });

        }
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
       function getMyMarkets(){
            // isProduct.value = true;
            axios.get(Api.BASE_URL + "/marketplace/user", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                myProducts.value = response.data.data;
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                // isProduct.value = false;
            });

        }

        function deleteMarket(id){
            axios.delete(Api.BASE_URL + "/marketplace/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil menghapus Product';
                snackbar.show = true;
                getMyMarkets();
                getMarkets();
                getUser();
            }).catch((error) => {
                const errorCode = error.response.status;
                if (errorCode == 401) {
                    snackbar.color = 'error';
                    snackbar.icon = 'mdi-close';
                    snackbar.message = 'Anda belum log in!';
                    snackbar.show = true;
                } else {
                    snackbar.color = 'error';
                    snackbar.icon = 'mdi-close';
                    snackbar.message = 'Gagal menghapus Product: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }

            });
            
        }
        getMarkets();
        getUser();
        getMyMarkets();
        return {
            dialog,
            image: "",
            imagePreview: "",
            Products,
            myProducts,
            newProduct,
            editProductContent,
            editMarket,
            createMarket,
            getMarkets,
            UpdateMarket,
            User,
            getUser,
            Products,
            // isProduct,
            editProductContent,
            editProductDialog,
            dialogUpdate,
            dialogPreview,
            snackbar,
            Api,
            validation,
            onimageSelected,
            deleteMarket,
        }
    }
}
</script>
<style>
.hover {
    transition: all 0.5s ease;
}
.hover:hover{
    outline: 3px grey solid;
    box-shadow: 5px 10px #888888;
    /* transition fade up */
    -webkit-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    transform: translateY(-5px);
}
</style>    