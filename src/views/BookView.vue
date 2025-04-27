<script lang="ts" setup>
import type { BookModel } from '@/models/book.model';
import { AuthService } from '@/services/auth.service';
import { BookService } from '@/services/book.service';
import { coverImage, formatTime } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)
const book = ref<BookModel>()

BookService.getBookById(id)
    .then(rsp => book.value = rsp.data)
    .catch(e => {
        AuthService.removeAuth()
        router.push('/login')
    })
</script>

<template>
    <div v-if="book">
        <div class="row mb-3">
            <div class="col-6">
                <img :src="coverImage(book)" :alt="book.title">
            </div>
            <div class="col-6">
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
    </div>
</template>