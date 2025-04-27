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
                    <!-- <li class="list-group-item">
                        <i class="fa-solid fa-clock"></i> {{ book.publishedDate ? formatTime(book.publishedDate) : 'Unknown date' }}
                    </li> -->
                    <li class="list-group-item">
                        <i class="fa-solid fa-list"></i>{{ book.download_count }}
                    </li>
                    <li class="list-group-item" v-if="book.authors">
                        <i class="fa-solid fa-list"></i>{{ book.authors }}
                    </li>
                    <li class="list-group-item" v-if="book.title">
                        <i class="fa-solid fa-list"></i>{{ book.title }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>