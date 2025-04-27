<script lang="ts" setup>
import type { BookModel } from '@/models/book.model'
import { AuthService } from '@/services/auth.service'
import { BookService } from '@/services/book.service'
import { formatTime } from '@/utils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const books = ref<BookModel[]>()
BookService.getBooks()
    .then(rsp => books.value = rsp.data)
    .catch(e => {
        AuthService.removeAuth()
        router.push('/login')
    })
</script>

<template>
    <h3>Table</h3>
    <table class="table table-striped table-hover" v-if="books">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Categories</th>
                <th scope="col">Downloads</th>
                <th scope="col">Pupularity</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="b of books" :key="b.id">
                <th scope="row">{{ b.id }}</th>
                <td>{{ b.title }}</td>
                <td>{{ b.authors }}</td>
                <td>{{ b.bookshelves }}</td>
                <td>
                    {{ b.download_count ? `${b.download_count} downloads` : 'Unknown downloads' }}
                </td>

                <td>
                    <template v-if="b.download_count > 100000">
                        <i class="fa-solid fa-circle text-success"></i> Popular
                    </template>
                    <template v-else>
                        <i class="fa-solid fa-circle text-warning"></i> Low Popularity
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