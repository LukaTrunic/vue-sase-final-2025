<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BorrowService } from '@/services/borrow.service';
import { AuthorService } from '@/services/author.service';

import type { AuthorModel } from '@/models/author.model';
import Loading from '@/components/Loading.vue';
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';

const logout = useLogout()
const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)
const book = ref<BookModel>()
const authors = ref<AuthorModel[]>()
const borrow = ref({
    bookId: id,
    authorId: 0,

})

BookService.getBookById(id)
    .then(rsp => book.value = rsp.data)

AuthorService.getAuthors()
    .then(rsp => {
        borrow.value.authorId = rsp.data[0].authorId
        authors.value = rsp.data
    })
    .catch(e => logout(e))

function doCreate() {
    BorrowService.createBorrow(borrow.value)
        .then(() => router.push('/borrow'))
        .catch(e => logout(e))
}

import { AuthService } from '@/services/auth.service';
import { coverImage } from '@/utils';

const currentUser = AuthService.getUser();

</script>

<template>
    <Navigation />
    <div class="custom-form" v-if="book">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="breadcrumb-item">
                <RouterLink :to="`/book/${book.id}`">{{ book.title }}</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Borrow Now</li>
        </ol>
    </nav>
        <div class="card">
            <div class="card-header">
                <h3>New Borrow Ticket</h3>
            </div>
            <img :src="coverImage(book)" class="card-img-top" :alt="book.title">
            <div class="card-body">
                <form v-on:submit.prevent="doCreate">
                    <div class="mb-3">
                        <label for="title" class="form-label">Title:</label>
                        <input type="text" class="form-control" id="title" :value="book.title" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="author" class="form-label">Author:</label>
                        <input type="text" class="form-control" id="author"
                            :value="book.authors.map(a => a.name).join(', ')" disabled>
                    </div>
                    <div class="mb-3">
                        <label for="user" class="form-label">User:</label>
                        <input type="text" class="form-control" id="user" :value="currentUser ?? 'Unknown'" disabled>
                    </div>
                    <button class="btn btn-primary">
                        <i class="fa-regular fa-floppy-disk"></i> Save
                    </button>
                </form>
            </div>
        </div>
    </div>
    <Loading v-else />
</template>
