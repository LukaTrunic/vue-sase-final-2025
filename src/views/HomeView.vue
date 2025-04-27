<script setup lang="ts">
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';
import { coverImage, formatTime } from '@/utils';
import { ref } from 'vue';

const books = ref<BookModel[]>()
const allBooks = ref<BookModel[]>()
BookService.getBooks()
  .then(rsp => {
    allBooks.value = rsp.data
    books.value = rsp.data
  })

function doSearch(e:any) {
  // when book not loaded, it skips search
  if(allBooks.value == undefined) return

  // makes sure input is lowercase
  const input = e.target.value? e.target.value.toLowerCase() : ''

  // if search bar is empty, return all books
  if(input == '') {
    books.value = allBooks.value
  }

  // filter chain
  books.value = allBooks.value.filter(b => {
    return b.title.toLowerCase().includes(input) //|| 
    // b.publishedDate.toLowerCase().includes(input) 
    // b.authors.toLowerCase().includes(input)
  })
}
</script>

<template>
  <div class="input-group mb-3 search">
    <span class="input-group-text" id="search">
      <i class="fa-solid fa-magnifying-glass"></i>
    </span>
    <input type="text" class="form-control" aria-describedby="search" placeholder="Title, Author..." @keyup="(e) => doSearch(e)">
  </div>
  <div class="wrapper mb-3" v-if="books">
    <div class="card book-card" v-for="b of books" :key="b.id">
      <img :src="coverImage(b)" class="card-img-top" :alt="b.title">
      <div class="card-body">
        <h5 class="card-title">{{ b.title }}</h5>
        <p class="card-subtitle mb-2 text-body-secondary">{{ b.authors }}</p>
      </div>
      <ul class="list-group list-group-flush">
        <!-- <li class="list-group-item">
          <i class="fa-solid fa-clock"></i> {{ b.publishedDate ? formatTime(b.publishedDate) : 'Unknown date' }}
        </li> -->
        <li class="list-group-item">
          <i class="fa-solid fa-list"></i>{{ b.bookshelves }}
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

.book-card {
  width: 300px;
}

.search {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
</style>