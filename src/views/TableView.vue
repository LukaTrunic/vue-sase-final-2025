<script lang="ts" setup>
import Loading from '@/components/Loading.vue'
import Navigation from '@/components/Navigation.vue'
import { useLogout } from '@/hooks/logout.hook'
import type { BookModel } from '@/models/book.model'
import { BookService } from '@/services/book.service'
import { ref } from 'vue'

const logout = useLogout()
const books = ref<BookModel[]>()
BookService.getBooks()
    .then(rsp => books.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation />
    <h3>Table</h3>
    <table class="table table-striped table-hover" v-if="books">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Categories</th>
                <th scope="col">Downloads</th>
                <th scope="col">Popularity</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="b in books" :key="b.id">
                <th scope="row">{{ b.id }}</th>
                <td>{{ b.title }}</td>

                <!-- Authors (show names nicely) -->
                <td>
                    <template v-if="b.authors && b.authors.length">
                        {{b.authors.map(author => author.name).join(', ')}}
                    </template>
                    <template v-else>
                        Unknown Author
                    </template>
                </td>

                <!-- Categories  -->
                <td>
                    <template v-if="b.subjects && b.subjects.length">
                        {{ b.subjects.join(', ') }}
                    </template>
                    <template v-else>
                        No Category
                    </template>
                </td>

                <!-- Downloads -->
                <td>
                    {{ b.download_count ? `${b.download_count} downloads` : 'Unknown downloads' }}
                </td>

                <!-- Popularity -->
                <td>
                    <template v-if="b.download_count > 100000">
                        <i class="fa-solid fa-circle text-success"></i> Popular
                    </template>
                    <template v-else>
                        <i class="fa-solid fa-circle text-warning"></i> Low Popularity
                    </template>
                </td>

                <!-- Actions -->
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
    <Loading v-else />

</template>