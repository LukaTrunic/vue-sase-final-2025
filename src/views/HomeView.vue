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
  <div class="wrapper mb-3 mt-3">
    <div class="card" style="width: 18rem;">
      <img src="" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
          content.</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <i class="fa-solid fa-clock"></i> <!-- {{ formatTime() }} -->
        </li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
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