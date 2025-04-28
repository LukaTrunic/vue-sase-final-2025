<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { BookModel } from '@/models/book.model';
import { BookService } from '@/services/book.service';
import { coverImage } from '@/utils';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const logout = useLogout()
const router = useRouter()
const route = useRoute()
const id = Number(route.params.id)
const book = ref<BookModel>()

BookService.getBookById(id)
    .then(rsp => book.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation />
    <div v-if="book">
        <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <RouterLink to="/">Home</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{ book.title }}</li>
        </ol>
    </nav>
        <div class="row mb-3">
            <div class="col-6">
                <img :src="coverImage(book)" :alt="book.title" class="img-fluid">
            </div>

            <div class="col-6">
                <div class="card">
                    <div class="card-header">
                        {{ book.title }}
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="fa-solid fa-download"></i> {{ book.download_count }} downloads
                        </li>
                        <li class="list-group-item" v-if="book.authors && book.authors.length > 0">
                            <i class="fa-solid fa-user"></i>
                            {{book.authors.map(a => a.name).join(', ')}}
                        </li>
                        <li class="list-group-item" v-if="book.languages && book.languages.length > 0">
                            <i class="fa-solid fa-language"></i> {{ book.languages[0].toUpperCase() }}
                        </li>

                    </ul>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Description
                    </div>
                    <div class="card-body">
                        <p v-if="book.summaries && book.summaries.length > 0">
                            {{ book.summaries[0] }}
                        </p>
                        <p v-else>
                            No description available.
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    
  <Loading v-else/>
</template>