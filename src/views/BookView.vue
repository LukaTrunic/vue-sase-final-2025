<script lang="ts" setup>
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';
import { coverImage, formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)
const book = ref<BookModel>()

BookService.getBookById(id)
    .then(rsp => console.log(rsp.data))
</script>

<template>
    <div class="row mb-3" v-if="book">
        <div class="col-8">
            <img :src="coverImage(book)" :alt="book.title">
        </div>
        <div class="col-4">
            <div class="card">
                <div class="card-header">
                    {{ book.title }}
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <i class="fa-solid fa-clock"></i> {{ book.publishedDate ? formatTime(book.publishedDate) : 'Unknown date' }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-list"></i>{{ book.categories }}
                    </li>
                    <li class="list-group-item" v-if="book.description">
                        <i class="fa-solid fa-list"></i>{{ book.description }}
                    </li>
                    <li class="list-group-item" v-if="book.publisher">
                        <i class="fa-solid fa-list"></i>{{ book.publisher }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-book-open"></i>{{ book.pageCount }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>