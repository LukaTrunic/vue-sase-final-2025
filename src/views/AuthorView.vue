<script lang="ts" setup>
import type { AuthorModel } from '@/models/author.model';
import { AuthorService } from '@/services/author.service';
import { ref } from 'vue';

    const authors = ref<AuthorModel[]>()
    AuthorService.getAuthors()
        .then(rsp => authors.value = rsp.data)
</script>

<template>
    {{ authors }}
</template>