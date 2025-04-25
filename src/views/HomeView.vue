<script setup lang="ts">
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';
import { ref } from 'vue';

const books = ref<BookModel[]>()
BookService.getBooks()
      .then(rsp => books.value = rsp.data)

</script>

<template>
  <ul>
    <li v-for="b of books" :key="b.id">{{ b.author }} {{ b.category }}</li>
  </ul>
</template>