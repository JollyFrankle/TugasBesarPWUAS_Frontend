<template>
    <v-main>
        <v-container>
            <v-card tile>
                <v-card-title>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="UsernameSearch"
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                append-icon="mdi-magnify"
                                @input="searchUser()"
                            >Search</v-text-field>
                        </template>
                        <v-list dense>
                            <v-list-item v-for="user in UserSearch" :key="UserSearch.id">
                                <v-list-item-title>
                                    <router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: user.id } }">{{ user.username }}</router-link>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-title>
            </v-card>
        </v-container>
        <v-container>
            <v-card :disabled="isPosting" :loading="isPosting" tile>
                <v-card-title class="d-flex justify-space-between" width="100%">
                    <v-row>
                        <v-col cols="1">
                            <v-list-item-avatar size="64" class="mb-auto mt-4">
                                <v-img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                            </v-list-item-avatar>
                        </v-col>
                        <v-col cols="11">
                            <v-textarea rounded filled class="textfield mt-3" label="Opo sing lagi kuwe pikirke?" required v-model="newPost.content"></v-textarea>
                            <v-img v-if="showPreview" :src="previewImage.link" aspect-ratio="1.66" width="200px" class="mb-3"></v-img>
                        </v-col>
                    </v-row>
                </v-card-title>
                <!-- <v-card-text v-if="showPreview">
                    <v-img :src="previewImage.link" aspect-ratio="1.66" width="200px" class="mb-3"></v-img>
                </v-card-text> -->
                <v-card-actions>
                    <v-list-item>
                        <v-btn color="primary" depressed @click="onImageClicked" class="mr-4">
                            <v-icon left> mdi-image-plus</v-icon> Pilih Gambar
                        </v-btn>
                        <v-btn v-if="showPreview" color="error" outlined depressed @click="deleteImage">
                            <v-icon left> mdi-delete</v-icon> Hapus Gambar
                        </v-btn>
                        <v-file-input id="uploader" class="d-none" accept="image/*" v-model="newPost.image" @change="onimageSelected"></v-file-input>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="createPost">
                            <v-icon class="mr-2">mdi-send</v-icon> Posting
                        </v-btn>
                    </v-list-item>
                </v-card-actions>
            </v-card>
        </v-container>
        <!-- Content ya -->
        <v-container>
            <v-card class="mb-6 hover" v-for="post in posts" :key="post.id" tile>
                <v-card-text class="d-flex justify-between">
                    <v-list-item-avatar class="mt-5" size="64">
                        <v-img :src="post.user.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + post.user.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title"><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: post.user.id } }">{{ post.user.name }}</router-link></v-list-item-title>
                        <v-list-item-subtitle><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: post.user.id } }">@{{ post.user.username }}</router-link></v-list-item-subtitle>
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
            
        <!-- Edit Post Dialog -->
        <v-dialog v-model="editPostDialog" max-width="600px">
            <v-card >
                <v-card-title class="headline">
                    <span>Edit Post</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="editPostDialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
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

                <div class="d-flex justify-between pt-4 px-5">
                    <v-list-item-avatar size="48">
                        <v-img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title"><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: User.id } }">{{ User.name }}</router-link></v-list-item-title>
                        <v-list-item-subtitle><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: User.id } }">@{{ User.username }}</router-link></v-list-item-subtitle>
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
                    <div class="d-flex justify-between py-4 px-5">
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

<style>
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

<script>

import { reactive, ref } from "vue";
import * as Api from "./ApiHelper";

import axios from "axios";
export default {
    setup() {
        // User data
        const User = ref({});
        const UsernameSearch = ref("");
        const UserSearch = ref([]);

        const newPost = reactive({
            content: "",
            image: null
        });
        const previewImage = ref({});
        let showPreview = ref(false);
        
        const editPostContent = ref({
            id: 0,
            content: "",
            image: null
        });
        
        //state validation
        const validation = ref([]);

        const snackbar = reactive({
            show: false,
            color: '',
            icon: '',
            message: ''
        })

        // this.$root.$emit('snackbar', {
        //     color: 'success',
        //     icon: 'mdi-check',
        //     message: 'Berhasil membuat post'
        // })

        const isPosting = ref(false);
        const editPostDialog = ref(false);
        const commentDialog = ref(false);
        
        const posts = ref([]);
        const comments = ref([]);
        const newComment = ref({
            content: "",
        });
        
        const editCommentContent = ref({
            id: 0,
            content: "",
        });

        function createPost() {
            let formData = new FormData();

            formData.append('content', newPost.content);
            if(newPost.image != null) {
                formData.append('image', newPost.image);
            }

            isPosting.value = true;
            axios.post(Api.BASE_URL + "/post",
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            })
            .then((response) => {
                newPost.content = "";
                newPost.image = null;
                snackbar.color = 'success';
                snackbar.icon = 'mdi-check';
                snackbar.message = 'Berhasil membuat post';
                snackbar.show = true;
                deleteImage();
                getPosts();
                // isPosting.value = false;
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
                    snackbar.message = 'Gagal membuat post: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }

                isPosting.value = false;
                console.log(validation)
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

        getPosts();
        getUser();

        function onImageClicked() {
            document.getElementById("uploader").click();
        }
        
        function onimageSelected(event) {
            let file = document.getElementById("uploader").files[0];
            showPreview.value = true;
            if(file) {
                previewImage.value.link = URL.createObjectURL(file);
            }
        }
        function deleteImage(){
            showPreview.value = false;
            newPost.image = null;
            previewImage.value.link = "";
        }

        // Edit post
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
            isPosting.value = true;
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

                isPosting.value = false;
            });
        }

        // Delete post
        function deletePost(id) {
            isPosting.value = true;
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

                isPosting.value = false;
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

        function searchUser(){
            axios.post(Api.BASE_URL + "/user/find", {
                    username: UsernameSearch.value
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            })
            .then((response) => {
                console.log(response.data.data);
                UserSearch.value = response.data.data
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
                    snackbar.message = 'Gagal Search: ' + JSON.stringify(error.response.data.data)
                    snackbar.show = true;
                }
                console.log(validation)
            });
        }

        // Return
        return {
            Api,
            createPost,
            // user,
            validation,
            show: false,
            snackbar,
            newPost,
            onImageClicked,
            isPosting,
            posts,
            editPostDialog,
            editPostContent,
            updatePost,
            editPost,
            User,
            deletePost,
            copyLink,
            commentDialog,
            onimageSelected,
            previewImage,
            showComment,
            showPreview,
            deleteImage,
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
            searchUser,
            UsernameSearch,
            UserSearch,
        };
    },

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