<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { BorrowModel } from '@/models/borrow.model';
import { BorrowService } from '@/services/borrow.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import QRCodeVue3 from "qrcode-vue3";
import { formatTime } from '@/utils';

const route = useRoute()
const logout = useLogout()
const id = Number(route.params.id)
const borrow = ref<BorrowModel>()

BorrowService.getBorrowById(id)
    .then(rsp => borrow.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation />
    <h3 class="text-center">Printable Ticket</h3>
    <div class="card mb-3" v-if="borrow">
        <div class="row g-0">
            <div class="col-md-4">
                <QRCodeVue3 :value="`${borrow.borrowId}`" class="img-fluid rounded-start" />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ borrow.book.title }}</h5>
                    <p class="card-text">{{ borrow.book.summaries }}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <i class="fa-solid fa-plane"></i> Author: {{ borrow.author }}
                    </li>
                    <li class="list-group-item">
                        <i class="fa-solid fa-bookmark"></i> Created At: {{ formatTime(borrow.createdAt) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>