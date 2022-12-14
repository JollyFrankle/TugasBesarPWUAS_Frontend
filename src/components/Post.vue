<template>
    <v-main>
        <!-- Content ya -->
        <v-container>
            <v-card class="mb-5">
                <!-- <v-card-text> -->
                    <v-list-item class="d-flex justify-between">
                        <v-list-item-avatar class="mt-5" size="64">
                            <img :src="post.user.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + post.user.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"/>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="title"><router-link style="text-decoration: none; color:black;" :to="{ name: 'OtherProfil', params: { id: post.user.id } }">{{ post.user.name }}</router-link></v-list-item-title>
                            <v-list-item-subtitle>@{{ post.user.username }}</v-list-item-subtitle>
                        </v-list-item-content>
                        <div>
                            <template>
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
                            </template>
                        </div>
                    </v-list-item>
                    <div :class="`post-content nl2br px-5 py-5 ${post.image ? '' : 'post-content-large'}`">{{ post.content }}</div>

                    <div class="img-area" v-if="post.image">
                        <v-img :src="Api.BASE_NONAPI + '/storage/images/posts/' + post.image" aspect-ratio="1.66" style="filter: blur(16px)"></v-img>
                        <v-img class="img-area-main" :src="Api.BASE_NONAPI + '/storage/images/posts/' + post.image" contain height="100%" width="100%"></v-img>
                    </div>
                    
                    <v-card-actions>
                        <div>
                            <v-btn color="red darken-2" text icon x-large>
                                <v-icon>mdi-cards-heart-outline</v-icon>
                            </v-btn>

                            <v-btn color="blue darken-2" text icon x-large>
                                <v-icon>mdi-chat-outline</v-icon>
                            </v-btn>

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
                <!-- </v-card-text> -->

                <!-- <v-btn
                </v-card-text>

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

                    <v-btn
                icon
                @click="show = !show"
                >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon> -->
                <!-- </v-btn> -->
                <!-- </v-card-actions> -->
            </v-card>

            <v-card class="mx-auto" :disabled="isPosting">
                <v-progress-linear
                    v-if="isPosting"
                    indeterminate
                    color="blue darken-2"
                ></v-progress-linear>
                <v-card-title class="d-flex justify-space-between" width="100%">
                    <v-list-item-avatar size="64" class="mb-auto">
                        <img :src="User.avatar != null ? Api.BASE_NONAPI + '/storage/images/users/' + User.avatar : 'https://cdn.vuetifyjs.com/images/john.jpg'" alt="PP"/>
                    </v-list-item-avatar>
                    <v-textarea rounded filled class="textfield" label="Apa sampeyan pengin menehi?" required v-model="newPost.content"></v-textarea>
                </v-card-title>
                <v-card-actions>
                    <v-btn color="blue darken-1" text @click="createPost">
                        <v-icon class="mr-2">mdi-send</v-icon> Posting
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>

        <!-- Edit Post Dialog -->
        <v-dialog v-model="editPostDialog" max-width="500px">
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
import { useRoute } from 'vue2-helpers/vue-router';

import axios from "axios";
export default {
    setup() {
        // get id from route
        const route = useRoute();
        const id = ref(route.params.id);

        if(id.value == null) {
            this.$router.push({ name: 'Home' });
        }
        // User data
        const post = ref({});
        const User = ref({});
        
        const postData = reactive({
            id: 0,
            content: "",
            image: null
        });

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

        function getPostById() {
            isPosting.value = true;
            axios.get(Api.BASE_URL + "/post/" + id.value, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + $cookies.get("SESSION")
                }
            }).then((response) => {
                post.value = response.data.data;
            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                isPosting.value = false;
            });
        }
        
        getPostById();

        // get current logged in user
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
        getUser();
        
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
                getPostById();
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
                getPostById();
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

        // Return
        return {
            Api,
            post,
            User,
            validation,
            show: false,
            snackbar,
            newPost: postData,
            isPosting,
            editPostDialog,
            editPostContent,
            updatePost,
            editPost,
            deletePost,
            copyLink
        };
    },

}
</script>
