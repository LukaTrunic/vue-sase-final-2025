<script setup lang="ts">
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';
import { formatTime } from '@/utils';
import { ref } from 'vue';

const books = ref<BookModel[]>()
BookService.getBooks()
  .then(rsp => books.value = rsp.data)

</script>

<template>
  <div class="wrapper mb-3 mt-3" v-if="books">
    <div class="card" style="width: 18rem;" v-for="b of books" :key="b.id">
      <img src="" class="card-img-top" :alt="b.title">
      <div class="card-body">
        <h5 class="card-title">{{ b.title }}</h5>
        <p class="card-subtitle mb-2 text-body-secondary">{{ b.author.name }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <i class="fa-solid fa-clock"></i> {{  b.publishedDate ? formatTime(b.publishedDate) : 'Unknown date' }}
        </li>
        <li class="list-group-item">
          <i class="fa-solid fa-list"></i>{{ b.category }}
        </li>
        <li class="list-group-item">
          <i class="fa-solid fa-book-open"></i>{{ b.pages }}
        </li>
      </ul>
      <div class="card-body">
        <RouterLink :to="`/book/${b.id}`" class="btn btn-sm btn-primary">
          <i class="fa-solid fa-up-right-from-square"></i>More
        </RouterLink>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style>
  .wrapper {
      display: flex;
      flex-direction: row;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
  }
</style>