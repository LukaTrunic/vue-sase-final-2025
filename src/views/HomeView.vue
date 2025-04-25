<script setup lang="ts">
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';
import { ref } from 'vue';

const books = ref<BookModel[]>()
BookService.getBooks()
  .then(rsp => books.value = rsp.data)

</script>

<template>
  <div class="wrapper">
    <div class="card" style="width: 18rem;" v-for="b of books" :key="b.id" >
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
  <ul>
    <li v-for="b of books" :key="b.id">{{ b.author }} {{ b.category }}</li>
  </ul>
</template>