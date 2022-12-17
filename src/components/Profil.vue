<template>
    <v-main >
        <v-container>
            <v-card class="mx-auto" max-width="auto" :loading="loadingProfile" :disabled="loadingProfile">
                <v-card-text>
                    <v-list-item>
                        <v-list-item-avatar class="mt-1" size="240" @click="User.isAuth == true ? dialogPreview = true : false">
                            <v-img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="Foto profil">
                                <v-overlay
                                    v-if="User.isAuth == true"
                                    absolute
                                    opacity="0.5"
                                    value="true"
                                    class="overlay-change-pp"
                                >
                                    <v-icon class="white--text" large>mdi-camera-plus</v-icon>
                                </v-overlay>
                            </v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="nama">{{User.name}}</v-list-item-title>
                            <v-list-item-subtitle class="username mb-3">@{{User.username}}</v-list-item-subtitle>
                            <p class="createAt" v-if="User.created_at != null">
                                <v-btn icon>
                                    <v-icon>mdi-calendar-range</v-icon>
                                </v-btn>
                                加入 {{ Api.getDateTimeID(User.created_at, 'month') }}
                            </p>
                            <p class="tanggalLahir" v-if="User.tanggal_lahir != null">
                                <v-btn icon>
                                    <v-icon>mdi-cake-variant</v-icon>
                                </v-btn>
                                出生 {{ User.tanggal_lahir ? Api.getDateTimeID(User.tanggal_lahir, 'fulldate') : '-' }}
                            </p>        
                            <p class="bio nl2br">{{User.bio}}</p>
                        </v-list-item-content>
                        <div v-if="User.isAuth == true">
                            <v-btn color="success" class="editUser"  depressed @click="UpdateUser" style="margin-bottom: 200px;">
                            Edit Profil <v-icon right> mdi-account-edit</v-icon>
                            </v-btn>
                        </div>
                    </v-list-item>
                </v-card-text>
            </v-card>
        </v-container>
        
        <!-- Content ya -->
        <v-container>
            <v-card class="mb-6 hover" v-for="post in posts" :key="post.id" tile>
                <v-card-text class="d-flex justify-between">
                    <v-list-item-avatar class="mt-5" size="64">
                        <v-img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title"><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: User.id } }">{{ User.name }}</router-link></v-list-item-title>
                        <v-list-item-subtitle><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: User.id } }">@{{ User.username }}</router-link></v-list-item-subtitle>
                    </v-list-item-content>
                    <!-- <div>
                        <template> -->
                            <div class="text-center">
                                <v-menu offset-y>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-bind="attrs" v-on="on">
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list dense>
                                        <v-list-item-group>
                                            <v-list-item v-if="post.is_owner">
                                                <v-list-item-title @click="editPost(post.id)">
                                                    <v-icon left>mdi-pencil</v-icon>
                                                    Edit
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item v-if="post.is_owner">
                                                <v-list-item-title @click="deletePost(post.id)">
                                                    <v-icon left>mdi-delete</v-icon>
                                                    Delete
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- Report button -->
                                            <v-list-item v-if="!post.is_owner">
                                                <v-list-item-title>
                                                    <v-icon left>mdi-flag</v-icon>
                                                    Report
                                                </v-list-item-title>
                                            </v-list-item>
                                            <!-- Get link to post -->
                                            <v-list-item>
                                                <v-list-item-title @click="copyLink(post.id)">
                                                    <v-icon left>mdi-link</v-icon>
                                                    Copy Link
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-menu>
                            </div>
                        <!-- </template>
                    </div> -->
                </v-card-text>

                <div :class="`post-content nl2br px-5 py-5 ${post.image ? '' : 'post-content-large'}`">{{ post.content }}</div>

                <div class="img-area" v-if="post.image">
                    <v-img :src="Api.BASE_NONAPI + '/storage/images/posts/' + post.image" aspect-ratio="1.66" style="filter: blur(16px)"></v-img>
                    <v-img class="img-area-main" :src="Api.BASE_NONAPI + '/storage/images/posts/' + post.image" contain height="100%" width="100%"></v-img>
                </div>
                
                <v-card-actions>
                    <div>
                        <v-btn v-if="post.liked" color="red darken-2" text icon x-large @click="unlike(post.id)">
                            <v-icon>mdi-cards-heart</v-icon>
                        </v-btn>
                        <v-btn v-else="post.liked" color="red darken-2" text icon x-large @click="like(post.id)">
                            <v-icon>mdi-cards-heart-outline</v-icon>
                        </v-btn>
                        <span>{{post.total_likes}}</span>

                        <v-btn color="blue darken-2" text icon x-large @click="showComment(post.id)">
                            <v-icon>mdi-chat-outline</v-icon>
                        </v-btn>
                        <span>{{post.total_comments}}</span>

                        <v-btn color="green darken-2" text icon x-large>
                            <v-icon>mdi-share-all</v-icon>
                        </v-btn>
                    </div>
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

        
            </v-card>
            </v-container>

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
                                type="password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
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
                    <v-card-title class="headline mb-3">Ganti Foto Profil</v-card-title>
                    <v-card-text>
                        <v-img :src="tempUser.avatarLink != null ? tempUser.avatarLink : (User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg')" aspect-ratio="1" class="mb-3" @click="onImageClicked">
                            <v-overlay
                                absolute
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
        <v-dialog v-model="editPostDialog" max-width="600px">
            <v-card>
                <v-card-title class="headline mb-3">Edit Post</v-card-title>
                <v-card-text>
                    <v-img v-if="editPostContent.image" :src="Api.BASE_NONAPI + '/storage/images/posts/' + editPostContent.image" aspect-ratio="1" class="mb-3"></v-img>
                    <v-textarea
                        v-model="editPostContent.content"
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

        <v-dialog v-model="editCommentDialog" max-width="600px">
            <v-card >
                <v-card-title class="headline">
                    <span>Edit Comment</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="editCommentDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-textarea
                        v-model="editCommentContent.content"
                        label="Comment Content"
                        placeholder="What's on your mind?"
                        outlined
                        rows="5"
                    ></v-textarea>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="updateComment">
                        <v-icon class="mr-2">mdi-send</v-icon> Posting
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Comment Dilaog -->
        <v-dialog v-model="commentDialog" max-width="600px">
            <v-card  color="grey lighten-4">
                <v-toolbar color="blue darken-1" dark class="headline">   
                    <span>Comments</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="commentDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>

                <div class="d-flex justify-between py-4 px-5">
                    <v-list-item-avatar size="48">
                        <v-img :src="UserLog.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + UserLog.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title"><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: UserLog.id } }">{{ UserLog.name }}</router-link></v-list-item-title>
                        <v-list-item-subtitle><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: UserLog.id } }">@{{ UserLog.username }}</router-link></v-list-item-subtitle>
                    </v-list-item-content>
                </div>
                <div class="px-5 pt-2">
                    <v-text-field rounded filled label="Tambahke Komentar kowe" required v-model="newComment.content"></v-text-field>
                </div>
                <v-card-actions>
                    <v-list-item>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1 " style="margin-top: -60px" text @click="createComment()">
                            <v-icon class="mr-2">mdi-comment</v-icon> Comment
                        </v-btn>
                    </v-list-item>
                </v-card-actions>

                <v-card class="hover" v-for="com, i in comments" color="grey l lighten-3">
                    <div class="d-flex justify-between pt-4 px-5">
                        <v-list-item-avatar size="64">
                            <v-img :src="com.user.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + com.user.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content class="py-1">
                            <v-list-item-title class="d-flex align-center" width="100%">
                                <div class="mb-2">
                                    <router-link style="text-decoration: none; color: black;" class="d-block" :to="{ name: 'OtherProfil', params: { id: com.user.id } }">
                                        <strong>{{ com.user.name }}</strong>                                
                                        <span class="text--lighten-2"> @{{com.user.username}}</span>
                                    </router-link>
                                    <v-tooltip bottom transition="none">
                                        <template v-slot:activator="{ on, attrs }">
                                            <span
                                                v-bind="attrs"
                                                v-on="on" class="mt-1 text--lighten-2 text-caption"
                                            >{{ Api.getHTMLTimestamp(com.created_at) }}</span>
                                        </template>
                                        <span>{{ new Date(com.created_at).toLocaleString() }}</span>
                                    </v-tooltip>
                                </div>
                                <div class="text-center">
                                    <v-menu offset-y v-if="com.is_owner">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn icon v-bind="attrs" v-on="on">
                                                <v-icon>mdi-dots-vertical</v-icon>
                                            </v-btn>
                                        </template>
                                        <v-list dense>
                                            <v-list-item-group>
                                                <v-list-item>
                                                    <v-list-item-title @click="editComment(com.id, com.content)">
                                                        <v-icon left>mdi-pencil</v-icon>
                                                        Edit
                                                    </v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-title @click="deleteComment(com.id)">
                                                        <v-icon left>mdi-delete</v-icon>
                                                        Delete
                                                    </v-list-item-title>
                                                </v-list-item>                      
                                            </v-list-item-group>
                                        </v-list>
                                    </v-menu>
                                </div>
                            </v-list-item-title>
                            <span class="nl2br">{{ com.content }}</span>
                        </v-list-item-content>
                    </div>
                </v-card>
            </v-card>
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
import { onMounted  } from "vue";
import axios from "axios";
import { useRoute } from 'vue2-helpers/vue-router';
export default {
    setup() {
        // get id from route
        const route = useRoute();
        const id = ref(route.params.id);

        let dialogUpdate = ref(false);
        let dialogPreview = ref(false);
        let editPostDialog = ref(false);
        let commentDialog = ref(false);

        const User = ref({});
        const UserLog = ref({});
        const tempUser = ref({});
        const showPassword = ref(false);
        const posts = ref([]);
        const comments = ref([]);
        const loadingProfile = ref(true);

        //state validation
        const validation = ref([]);

        const snackbar = reactive({
            show: false,
            color: '',
            icon: '',
            message: ''
        })

        const editPostContent = ref({
            id: 0,
            content: "",
            image: null
        });

        const newComment = ref({
            content: "",
        });
        
        const editCommentContent = ref({
            id: 0,
            content: "",
        });

        function getUserLog() {
            axios.get(Api.BASE_URL + "/user", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                UserLog.value = response.data.data;
            }).catch((error) => {
                console.log(error)
            });
        }

        // function get User
        function getUser() {
            let url = Api.BASE_URL + "/user";
            if(id.value !== undefined) {
                url = Api.BASE_URL + "/user/" + id.value;
            }

            axios.get(url, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                User.value = response.data.data;
                let tgl = new Date(User.value.tanggal_lahir);
                tgl.setHours(tgl.getHours() + 7);
                if(User.value.tanggal_lahir !== null) {
                    User.value.tanggal_lahir = tgl.toISOString().substr(0, 10);
                }
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
                
                // 
                loadingProfile.value = false;
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                // isPosting.value = false;
            });
        }

        function editPost(id) {
            axios.get(Api.BASE_URL + "/post/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                editPostContent.value = response.data.data;
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
            axios.put(Api.BASE_URL + "/post/" + editPostContent.value.id, {
                    content: editPostContent.value.content
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

        // copy link
        function copyLink(id) {
            let link = Api.BASE_THIS + "/post/" + id;
            navigator.clipboard.writeText(link).then(function() {
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil menyalin link';
                snackbar.show = true;
            }, function(err) {
                snackbar.color = 'error';
                snackbar.icon = 'mdi-close';
                snackbar.message = 'Gagal menyalin link';
                snackbar.show = true;
            });
        }

        let post_id = 0;
        function showComment(id){
            post_id = id;
            axios.get(Api.BASE_URL + "/comment/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                commentDialog.value = true;
                comments.value = response.data.data;
                
                for(let i = 0; i < comments.value.length; i++){
                    comments.value[i].showEditCommentForm = false;
                }
            }).catch((error) => {
                console.log(error)
            })
        }

        function createComment(){
            // isPosting.value = true;
            axios.post(Api.BASE_URL + "/comment/" + post_id, {
                    content: newComment.value.content
                }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                newComment.value.content = "";
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil Menambah Komentar';
                snackbar.show = true;
                posts.value.find(post => post.id == post_id).total_comments++;
                showComment(post_id);
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
                    snackbar.message = 'Gagal menambahkan komentar: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }
            });
        }

        const editCommentDialog = ref(false);
        function editComment(id, comment){
            editCommentDialog.value = true;
            editCommentContent.value.content = comment;
            editCommentContent.value.id = id;
        }

        function updateComment(){
            let id = editCommentContent.value.id;
            axios.put(Api.BASE_URL + "/comment/" + id, {
                    content: editCommentContent.value.content
                }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil Mengubah Komentar';
                snackbar.show = true;
                showComment(post_id);

                editCommentDialog.value = false;
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
                    snackbar.message = 'Gagal mengubah komentar: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }
            });
        }

        function deleteComment(id){
            axios.delete(Api.BASE_URL + "/comment/" + id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil Menghapus Komentar';
                snackbar.show = true;
                posts.value.find(post => post.id == post_id).total_comments--;
                showComment(post_id);
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
                    snackbar.message = 'Gagal menghapus komentar: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }
            });
        }
        
        function like(id){
            axios.post(Api.BASE_URL + "/like/" + id, {
                // body: tidak ada
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            })
            .then((response) => {
                posts.value.find(post => post.id == id).liked = true;
                posts.value.find(post => post.id == id).total_likes++;
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
                    snackbar.message = 'Gagal memberi like: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }
                console.log(validation)
            });
        }

        function unlike(id){
            axios.delete(Api.BASE_URL + "/like/" + id,{
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            })
            .then((response) => {
                posts.value.find(post => post.id == id).liked = false;
                posts.value.find(post => post.id == id).total_likes--;
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
                    snackbar.message = 'Gagal memberi like: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }
                console.log(validation)
            });
        }

        getUser();
        getUserLog();

        // Return
        return {
            Api,
            User,
            getUser,
            dialogUpdate,
            dialogPreview,
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
            editPostDialog,
            editPostContent,
            onimageSelected,
            dialogUpdate,
            editPost,
            updatePost,
            deletePost,
            showPassword,
            copyLink,
            commentDialog,
            showComment,
            comments,
            like,
            unlike,
            newComment,
            createComment,
            editComment,
            updateComment,
            deleteComment,
            editCommentContent,
            editCommentDialog,
            UserLog,
            loadingProfile
        };
    },
    watch: { 
        '$route' (to, from){
            if(to != from)
                this.$router.go();
        },
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
.img-area {
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    overflow: hidden;
}
.img-area .img-area-main {
    position: absolute;
    top: 0;
}
</style>