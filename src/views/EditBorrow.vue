<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { BorrowService } from '@/services/borrow.service';
import { AuthorService } from '@/services/author.service';
import { BookService } from '@/services/book.service';

import type { AuthorModel } from '@/models/author.model';
import type { BorrowModel } from '@/models/borrow.model';
import Loading from '@/components/Loading.vue';

const logout = useLogout()
const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)

const borrow = ref<BorrowModel>()
const authors = ref<AuthorModel[]>()

BorrowService.getBorrowById(id)
    .then(rsp => borrow.value = rsp.data)
    .catch(e => logout(e))

AuthorService.getAuthors()
    .then(rsp => authors.value = rsp.data)
    .catch(e => logout(e))

function doUpdate() {
    BorrowService.updateBorrow(id, borrow.value)
        .then(() => router.push('/borrow'))
        .catch(e => logout(e))
}
</script>

<template>
    <Navigation />
    <div class="custom-form" v-if="borrow">
        <h3>Edit Borrow Ticket</h3>
        <form v-on:submit.prevent="doUpdate">
            <div class="mb-3">
                <label for="id" class="form-label">ID:</label>
                <input type="number" class="form-control" id="id" :value="borrow.borrowId" disabled>
            </div>
            <div class="mb-3">
                <label for="title" class="form-label">Title:</label>
                <input type="text" class="form-control" id="title" :value="borrow.book.title" disabled>
            </div>
            <div class="mb-3">
                <label for="author" class="form-label">Author:</label>
                <input type="text" class="form-control" id="author" :value="borrow.author.name" disabled>
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Updated At:</label>
                <input type="text" class="form-control" id="updated"
                    :value="formatTime(borrow.updatedAt ?? borrow.createdAt)" disabled>
            </div>
            <button class="btn btn-primary">
                <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
    <Loading v-else/>
</template>
