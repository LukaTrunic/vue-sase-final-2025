<script lang="ts" setup>
import { AuthorService } from '@/services/author.service';
import { doLogout } from '@/utils';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const author = ref({
    name: '',
    website: ''
})

function doCreate() {
    AuthorService.createAuthor(author.value)
        .then(rsp => router.push('/author'))
        .catch(e => doLogout())
}
</script>

<template>
    <div class="custom-form" v-if="author">
        <h1>Create Author</h1>
        <form v-on:submit.prevent="doCreate">
            <div class="mb-3">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control" id="name" v-model="author.name">
            </div>
            <div class="mb-3">
                <label for="website" class="form-label">Website:</label>
                <input type="text" class="form-control" id="website" v-model="author.website">
            </div>
            <button class="btn btn-primary">
                <i class="fa-regular fa-floppy-disk"></i> Save
            </button>
        </form>
    </div>
</template>