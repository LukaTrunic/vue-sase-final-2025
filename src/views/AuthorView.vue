<script lang="ts" setup>
import type { AuthorModel } from '@/models/author.model';
import { AuthService } from '@/services/auth.service';
import { AuthorService } from '@/services/author.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const authors = ref<AuthorModel[]>()
AuthorService.getAuthors()
    .then(rsp => authors.value = rsp.data)
    .catch(e => {
        AuthService.removeAuth()
        router.push('/login')
    })

function deleteObject(author: AuthorModel) {

}

</script>

<template>
    <h3>Authors</h3>

    <div>
        <RouterLink to="/author/new" class="btn btn-sm btn-primary">
            <i class="fa-solid fa-plus"></i> Add Author
        </RouterLink>
    </div>

    <table class="table table-striped table-hover" v-if="authors">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Author</th>
                <th scope="col">Website</th>
                <th scope="col">Updated at</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="a of authors" :key="a.authorId">
                <th scope="row">{{ a.authorId }}</th>
                <td>{{ a.name }}</td>
                <td>
                    <a :href="a.website" target="_blank">{{ a.website }}</a>
                </td>
                <td> {{ formatTime(a.updatedAt ?? a.createdAt) }}</td>
                <td>
                    <div class="btn-group">
                        <RouterLink :to="`/author/${a.authorId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button class="btn btn-sm btn-danger" @click="deleteObject(a)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <div v-else>Loading authors...</div>
</template>