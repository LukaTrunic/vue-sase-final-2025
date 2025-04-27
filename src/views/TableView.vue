<script lang="ts" setup>
import type { BookModel } from '@/models/book.model'
import { BookService } from '@/services/book.service'
import { formatTime } from '@/utils'
import { ref } from 'vue'

const books = ref<BookModel[]>()
BookService.getBooks()
    .then(rsp => books.value = rsp.data)
</script>

<template>
    <table class="table table-striped table-hover" v-if="books">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Categories</th>
                <th scope="col">Published Date</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="b of books" :key="b.id">
                <th scope="row">{{ b.id }}</th>
                <td>{{ b.title }}</td>
                <td>{{ b.authors }}</td>
                <td>{{ b.categories }}</td>
                <td>{{ formatTime(b.publishedDate) }}</td>
                <td>
                    <template v-if="b.inStock == true">
                        <i class="fa-solid fa-circle text-warning"></i> Out Of Stock
                    </template>
                    <template v-else="">
                        <i class="fa-solid fa-circle text-success"></i> Available
                    </template>
                </td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/book/${b.id}`" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </RouterLink>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>