<script lang="ts" setup>
import type { AuthorModel } from '@/models/author.model';
import { AuthService } from '@/services/auth.service';
import { AuthorService } from '@/services/author.service';
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
</script>

<template>
    {{ authors }}
</template>