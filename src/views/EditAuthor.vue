<script lang="ts" setup>
import type { AuthorModel } from '@/models/author.model';
import { AuthorService } from '@/services/author.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)
const author = ref<AuthorModel>()

AuthorService.getAuthorById(id)
    .then(rsp => author.value = rsp.data)
</script>

<template>
    {{ author }}
</template>