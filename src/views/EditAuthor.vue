<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { AuthorModel } from '@/models/author.model';
import { AuthorService } from '@/services/author.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const logout = useLogout()
const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)
const author = ref<AuthorModel>()

AuthorService.getAuthorById(id)
    .then(rsp => author.value = rsp.data)
    .catch(e => logout(e))

function doUpdate() {
    AuthorService.updateAuthor(id, author.value)
        .then(rsp => router.push('/author'))
        .catch(e => logout(e))
}
</script>

<template>
    <Navigation/>
    <div class="custom-form" v-if="author">
        <h3>Edit Author</h3>
        <form v-on:submit.prevent="doUpdate">
            <div class="mb-3">
                <label for="id" class="form-label">ID:</label>
                <input type="number" class="form-control" id="id" :value="author.authorId" disabled>
            </div>
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" id="name" v-model="author.name">
            </div>
            <div class="mb-3">
                <label for="website" class="form-label">Website:</label>
                <input type="text" class="form-control" id="website" v-model="author.website">
            </div>
            <div class="mb-3">
                <label for="updated" class="form-label">Updated At:</label>
                <input type="text" class="form-control" id="updated"
                    :value="formatTime(author.updatedAt ?? author.createdAt)" disabled>
            </div>
            <button class="btn btn-primary">
                <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
    
  <Loading v-else/>
</template>