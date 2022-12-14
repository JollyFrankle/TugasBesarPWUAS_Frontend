<template>
    <v-main >
        <v-container >
        <v-card class="mx-auto" max-width="auto">
                <v-card-text>
                    <v-list-item>
                        <v-list-item-avatar class="mt-1" size="240" @click="dialogPreview = true">
                            <v-img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Foto profil">
                                <!-- <v-overlay
                                    absolute="true"
                                    opacity="0.5"
                                    value="true"
                                    class="overlay-change-pp"
                                >
                                    <v-icon class="white--text" large>mdi-camera-plus</v-icon>
                                </v-overlay> -->
                            </v-img>
                            
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="nama">{{User.name}}</v-list-item-title>
                            <v-list-item-subtitle class="username mb-3">@{{User.username}}</v-list-item-subtitle>
                            <p class="createAt">
                                <v-btn icon>
                                    <v-icon>mdi-calendar-range</v-icon>
                                </v-btn>
                                加入 {{ Api.getDateTimeID(User.created_at, 'month') }}
                            </p>
                            <p class="tanggalLahir" >
                                <v-btn icon>
                                    <v-icon>mdi-cake-variant</v-icon>
                                </v-btn>
                                出生 {{ User.tanggal_lahir ? Api.getDateTimeID(User.tanggal_lahir, 'fulldate') : '-' }}
                            </p>        
                                <p class="bio nl2br">{{User.bio}}</p>
                        </v-list-item-content>
                        <div>
                            <template >
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="success" class="editUser"  depressed @click="UpdateUser" style="margin-bottom: 200px;">
                                        Edit Profil <v-icon right> mdi-account-edit</v-icon>
                                        </v-btn>
                                    </template>
                                </v-menu>
                            </template>
                        </div>
                    </v-list-item>
                </v-card-text>
            </v-card>
        </v-container>
        
        <v-container>
             <v-row dense>
                <v-col cols="12">
                    <v-card class="mx-auto mb-5" max-width="auto" v-for="post in posts" :key="post.id">
                        <v-card-text>
                            <v-list-item>
                                <v-list-item-avatar class="mt-5" size="60">
                                     <v-img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title class="title">{{User.name}}</v-list-item-title>
                                    <v-list-item-subtitle>@{{User.username}}</v-list-item-subtitle>
                                </v-list-item-content>
                                <div>
                                    <template>
                                        <div class="text-center" v-if="post.is_owner">
                                            <v-menu offset-y>
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-btn icon v-bind="attrs" v-on="on">
                                                        <v-icon>mdi-dots-vertical</v-icon>
                                                    </v-btn>
                                                </template>
                                                <v-list dense>
                                                    <v-list-item-group>
                                                        <v-list-item>
                                                            <v-list-item-title @click="editPost(post.id)">
                                                                <v-icon left>mdi-pencil</v-icon>
                                                                Edit
                                                            </v-list-item-title>
                                                        </v-list-item>
                                                        <v-list-item>
                                                            <v-list-item-title @click="deletePost(post.id)">
                                                                <v-icon left>mdi-delete</v-icon>
                                                                Delete
                                                            </v-list-item-title>
                                                        </v-list-item>
                                                    </v-list-item-group>
                                                </v-list>
                                            </v-menu>
                                        </div>
                                        </template>
                                </div>
                            </v-list-item>

                            <v-card-title title>
                                {{ post.content }}
                            </v-card-title>

                            <v-img v-if="post.image" :src="Api.BASE_NONAPI + '/storage/images/posts/' + post.image" aspect-ratio="2" class="mx-0" ></v-img>
                            
                                <v-card-actions>
                                    <v-btn color="red darken-2" text icon x-large>
                                        <v-icon>mdi-cards-heart-outline</v-icon>
                                    </v-btn>

                                    <v-btn color="blue darken-2" text icon x-large>
                                        <v-icon>mdi-chat-outline</v-icon>
                                    </v-btn>

                                    <v-btn color="green darken-2" text icon x-large>
                                        <v-icon>mdi-share-all</v-icon>
                                    </v-btn>
                                    <div class="ml-auto">
                                        <v-tooltip bottom transition="none">
                                            <template v-slot:activator="{ on, attrs }">
                                                <span
                                                    v-bind="attrs"
                                                    v-on="on"
                                                >{{ Api.getHTMLTimestamp(post.created_at) }}</span>
                                            </template>
                                            <span>{{ new Date(post.created_at).toLocaleString() }}</span>
                                        </v-tooltip>
                                    </div>
                                </v-card-actions>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-dialog transition="dialog-top-transition" v-model="dialogUpdate" persistent max-width="600px">
                <v-card>
                    <v-toolbar color="blue darken-1" dark class="headline">Update User</v-toolbar>
                    <v-card-text>
                        <v-container>
                            <v-text-field
                                v-model="tempUser.name"
                                label="Name"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                v-model="tempUser.username"
                                label="Username"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                v-model="tempUser.email"
                                label="Email"
                                outlined
                            ></v-text-field>

                            <v-menu v-model="fromDateMenu" :close-on-content-click="false" nudge-bottom="64" transition="scale-transition"
                                max-width="290px" min-width="290px" >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field outlined label="Tanggal Lahir" readonly v-model="tempUser.tanggal_lahir" v-on="on" v-bind="attrs"></v-text-field>
                                </template>
                                <v-date-picker v-model="tempUser.tanggal_lahir" show-adjacent-months locale="en-in" @input="fromDateMenu = false"></v-date-picker>
                            </v-menu>

                            <v-textarea
                                v-model="tempUser.bio"
                                label="Bio"
                                outlined
                            ></v-textarea>

                            <v-text-field
                                v-model="tempUser.password"
                                label="Password"
                                outlined
                            ></v-text-field>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialogUpdate = false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog transition="dialog-top-transition" v-model="dialogPreview" max-width="600px">
                <v-card>
                    <v-card-title class="headline mb-3">Edit Post</v-card-title>
                    <v-card-text>
                        <v-img :src="tempUser.avatarLink != null ? tempUser.avatarLink : (User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg')" aspect-ratio="1" class="mb-3" @click="onImageClicked">
                            <v-overlay
                                absolute="true"
                                opacity="0.5"
                                value="true"
                                class="overlay-change-pp"
                            >
                                <v-icon class="white--text" large>mdi-camera-plus</v-icon>
                            </v-overlay>
                        </v-img>
                        <v-file-input id="uploader" class="d-none" accept="image/*" v-model="tempUser.avatar" @change="onimageSelected"></v-file-input>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="grey" text @click="dialogPreview = false; tempUser.avatarLink = null">Cancel</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="red" text :disabled="!User.avatar">
                            <v-icon class="mr-2">mdi-delete</v-icon> Hapus
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="uploadAvatar" :disabled="!tempUser.avatarLink">
                            <v-icon class="mr-2">mdi-send</v-icon> Ganti
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
             <v-dialog v-model="editPostDialog" max-width="500px">
            <v-card>
                <v-card-title class="headline mb-3">Edit Post</v-card-title>
                <v-card-text>
                    <v-img v-if="posts.image" :src="Api.BASE_NONAPI + '/storage/images/posts/' + posts.image" aspect-ratio="1" class="mb-3"></v-img>
                    <v-textarea
                        v-model="posts.content"
                        label="Post Content"
                        placeholder="What's on your mind?"
                        outlined
                        rows="5"
                    ></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="updatePost">
                        <v-icon class="mr-2">mdi-send</v-icon> Posting
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </v-container>

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
import { onMounted  } from "vue";
import axios from "axios";
export default {
    setup() {
        //let id = this.$router.params.id;
        let dialogUpdate = ref(false);
        let dialogPreview = ref(false);
        let editPostDialog = ref(false);

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
        const tempUser = ref({
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
        //state validation
        const validation = ref([]);

        const snackbar = reactive({
            show: false,
            color: '',
            icon: '',
            message: ''
        })

        // function get User
        function getUser() {
            axios.get(Api.BASE_URL + "/user", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                User.value = response.data.data;
                let tgl = new Date(User.value.tanggal_lahir);
                tgl.setHours(tgl.getHours() + 7);
                User.value.tanggal_lahir = tgl.toISOString().substr(0, 10);
                console.log(User)
                getPosts();
            }).catch((error) => {
                console.log(error)
            });
        }
        // function get Posts
        function UpdateUser() {
            dialogUpdate.value = true;
            tempUser.value = JSON.parse(JSON.stringify(User.value));
        }
        // Save User
        function save(){
            axios.put(Api.BASE_URL + "/user", tempUser.value, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
                }).then((response) => {
                    console.log(response)
                    snackbar.show = true;
                    snackbar.color = 'success';
                    snackbar.icon = 'mdi-check';
                    snackbar.message = 'Berhasil Update User';
                    User.value = JSON.parse(JSON.stringify(tempUser.value));
                    dialogUpdate.value = false;
                    getUser();  
                }).catch((error) => {
                    console.log(error)
                    snackbar.show = true;
                    snackbar.color = 'error';
                    snackbar.icon = 'mdi-close';
                    snackbar.message = 'Gagal Update User';
                });
        }
        // get Post
        function getPosts() {
            console.log(User.value.id)
            // isPosting.value = true;
            axios.get(Api.BASE_URL + "/post/user/" + User.value.id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                posts.value = response.data.data;
                console.log(posts)
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                // isPosting.value = false;
            });
        }

        function cancel(){
            dialogUpdate.value = false;
        }

        function onImageClicked() {
            document.getElementById("uploader").click();
            dialogPreview.value = true;
        }

        function onimageSelected(event) {
            let file = document.getElementById("uploader").files[0];
            if(file) {
                tempUser.value.avatarLink = URL.createObjectURL(file);
            }
        }

        function uploadAvatar(){
            let formData = new FormData();

            // console.log(tempUser.value.avatar);

            if(tempUser.value.avatar != null) {
                formData.append('avatar', tempUser.value.avatar);
                console.log("Uploaddingggg");
                axios.post(Api.BASE_URL + "/user/pp", 
                    formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + $cookies.get("SESSION")
                    }
                }).then((response) =>{
                    User.value = response.data.data;
                    dialogPreview.value = false;

                    snackbar.show = true;
                    snackbar.color = 'success';
                    snackbar.icon = 'mdi-camera';
                    snackbar.message = 'Berhasil memperbarui foto profil!';
                }).catch((error)=>{
                    console.log(error)
                })
            }   
        }

        function editPost(id) {
            axios.get(Api.BASE_URL + "/post/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                posts.value = response.data.data;
                console.log(response.data.data)
                editPostDialog.value = true;
            }).catch((error) => {
                console.log(error)
                snackbar.color = 'error';
                snackbar.icon = 'mdi-close';
                snackbar.message = 'Gagal mengambil data post';
                snackbar.show = true;
            });
        }
        
        function updatePost() {
            axios.put(Api.BASE_URL + "/post/" + posts.value.id, {
                    content: posts.value.content
                }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil mengubah post';
                snackbar.show = true;
                getPosts();
                editPostDialog.value = false;
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
                    snackbar.message = 'Gagal mengubah post: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }
            });
        }   

        function deletePost(id) {
            axios.delete(Api.BASE_URL + "/post/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil menghapus post';
                snackbar.show = true;
                getUser();
                getPosts();
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
                    snackbar.message = 'Gagal menghapus post: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }

            });
        }

        getUser();

        // Return
        return {
            Api,
            User,
            getUser,
            dialogUpdate,
            dialogPreview,
            editPostDialog,
            UpdateUser,
            validation,
            show: false,
            snackbar,
            save,
            cancel,
            tempUser,
            fromDateMenu: false,
            onImageClicked,
            uploadAvatar,
            posts,
            onimageSelected,
            dialogUpdate,
            editPost,
            updatePost,
            deletePost,
            
        };
    }

}
</script>
<style>


.v-file-input {
    margin-left: 8px;
}
.nama, .username, .createAt, .tanggalLahir, .bio{
    margin-left: 30px;
}
.username, .createAt, .tanggalLahir, .bio{
    font-size: 16px;
}

.nama{
    font-size: 48px;
    font-weight: bold;
}


.bio{
    margin-top: 10px;
    padding-left: 10px;
}

.editUser{
   float: right;
}

.overlay-change-pp {
    opacity: 0;
    cursor: pointer;
}

.overlay-change-pp:hover {
    opacity: 1;
}
</style>