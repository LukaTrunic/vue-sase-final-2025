<script lang="ts" setup>
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

    const route = useRoute()
    const id = Number(route.params.id)
    const book = ref<BookModel>()

    BookService.getBookById(id)
        .then(rsp => console.log(rsp.data))
</script>

<template>
    <pre> {{ book }} </pre>
</template>