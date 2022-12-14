<template>
        <v-main>
            
            
            <v-container> 
                <!-- search and add   -->
            <v-card elevation="3" class="mt-5 mx-6" style="border-radius: 6px;">
                    <v-row justify="center" align="center" style="margin:3px auto;">
                 <v-col>
                    <v-text-field 
                    class="font-weight-bold" 
                    color="black" 
                    style="width: 70%;font-family: Poppins; font-size: 20px; font-style:bold; border-radius: 10px;" 
                    rounded append-icon="mdi-magnify" 
                    outlined placeholder="Search..." 
                    hide-details></v-text-field>
                    </v-col>
                <v-col>
                    <v-btn 
                    class="font-weight-bold" 
                    style="margin:10px 
                    auto; font-size: 20px; 
                    text-transform: capitalize; 
                    float:right; color: #FFFFFF" 
                    x-large color="#93A9D1" 
                    @click="dialog = true">Sell Product</v-btn>
                </v-col>
                
                </v-row>
      
            </v-card> 
        </v-container>
        
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
            <v-row dense>
                <v-col cols="12">
                <v-card class="mx-auto" max-width="auto">
                                <v-text>
                                    <v-list-item>
                                        <v-list-item-avatar class="mt-5" size="60"><img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John"></v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title class="title">Daniel Ricky</v-list-item-title>
                                            <v-list-item-subtitle>@Riq</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                        <v-card-title class="text-h3 mb-1">
                                        Nama Product 
                                        </v-card-title>
                                        <v-card-text class="text-h4 mb-1">
                                        Harga Product
                                        </v-card-text>

                                        <v-card-text class="text-h5 mb-1">
                                        Tanggal nya 
                                        </v-card-text>

                                        <v-card-text class="text-h7 mb-1">
                                        Deskripsi Product
                                        </v-card-text>

                                        <v-img 
                                        style="margin-left: 10px;"
                                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="400px"
                                        width="500px"
                                        ></v-img>
                                </v-text>
                        </v-card>
                </v-col>
            </v-row>
      </v-tab-item>
      <v-tab-item>
        <!-- View Buat MY Product -->
        <v-row dense>
            <v-col  cols="6">
                <v-card class="mx-auto" max-width="auto">
                    <v-app-bar
                    flat
                    color="#FFFFFF"
                        >
                    <v-toolbar-title class="text-h6 black--text pl-0">
                    My Product
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn
                    icon
                    >
                    <v-icon color="blue" @click="update" >mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                    icon
                    >
                    <v-icon color="red" @click="hapus">mdi-delete</v-icon>
                    </v-btn>


                </v-app-bar>


                <v-text>
                    <v-card-title 
                    class="text-h3 mb-1">
                    Nama Product 
                    </v-card-title>
                    <v-card-text class="text-h4 mb-1">
                     Harga Product
                    </v-card-text>

                    <v-card-text class="text-h5 mb-1">
                    Tanggal nya 
                    </v-card-text>


                    <v-card-text class="text-h7 mb-1">
                            Deskripsi Product
                    </v-card-text>

                    <v-img 
                        style="margin-left: 10px;"
                                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="400px"
                                        width="500px"
                                        ></v-img>
                </v-text>
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
        <v-card>
            <v-toolbar color="blue darken-1" dark class="headline"
            >Add Product</v-toolbar
            >
            <v-card-text>
            <v-container>

                <v-text-field
                label="Nama"
                required
                outlined
                ></v-text-field>

                <v-text-field
                label="Harga"
                prefix="Rp."
                required
                outlined
                ></v-text-field>

                <v-textarea
                label="Deskripsi"
                required
                outlined
                ></v-textarea>
            <v-file-input
                outlined
                v-model="image"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an image"
                prepend-icon="mdi-camera"
                @change="selectImage"
                @click:clear="clearImagePreview()"
                label="Image"
                counter
                show-size
            ></v-file-input>
            <v-img
                :src="image ? 
                imagePreview : 'https://picsum.photos/id/11/500/300'"
                lazy-src="https://picsum.photos/id/11/10/6"
                height="30vh"
            ></v-img>

            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>

            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        
        </v-main>
</template>
<script>



import { reactive, ref } from "vue";
import * as Api from "./ApiHelper";
import { onMounted  } from "vue";
import axios from "axios";



export default{
    setup() {




        return{
            dialog:false,
            image: "",
            imagePreview: "",
        }

    },
    methods: {
        save() {

        this.dialog = false;
        this.cancel();
        },

        cancel() {
        this.dialog = false;
        },


        async selectImage(e) {


        const file = e;
        if (!file) return;
        const readData = (f) =>
            new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(f);
            });
        const data = await readData(file);
        this.imagePreview = data;
        },


        async clearImagePreview() {
        this.imagePreview = "";
        },
    }
}
</script>