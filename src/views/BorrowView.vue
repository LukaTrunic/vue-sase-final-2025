<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { BorrowModel } from '@/models/borrow.model';
import { BorrowService } from '@/services/borrow.service';
import { ref } from 'vue';
import { formatTime } from '@/utils';

const logout = useLogout()
const borrows = ref<BorrowModel[]>()
BorrowService.getBorrows()
    .then(rsp => borrows.value = rsp.data)
    .catch(e => logout(e))

function doDelete(bo: BorrowModel) {
    BorrowService.deleteBorrow(bo.borrowId)
        .then(rsp => borrows.value = borrows.value?.filter(borrow => borrow.borrowId !== bo.borrowId))
        .catch(e => logout(e))
}

function makeReturned(bo: BorrowModel) {
    BorrowService.returnBorrow(bo.borrowId)
        .then(rsp => borrows.value!.forEach(borrow => {
            if (borrow.borrowId = bo.borrowId)
                borrow.returnedAt = new Date().toISOString()
        }))
}
</script>

<template>
    <Navigation />
    <h3>Borrows</h3>
    <table class="table table-striped table-hover" v-if="borrows">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Borrowed At</th>
                <th scope="col">Due At</th>
                <th scope="col">Returned At</th>
                <th scope="col">Updated At</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="bo in borrows" :key="bo.borrowId">
                <th scope="row">{{ bo.borrowId }}</th>

                <!-- Title -->
                <td>{{ bo.book?.title || 'Unknown Title' }}</td>

                <!-- Author Name -->
                <td>{{ bo.author?.name || 'Unknown Author' }}</td>

                <!-- Borrowed At -->
                <td>{{ bo.borrowAt ? formatTime(bo.borrowAt) : 'N/A' }}</td>

                <!-- Due At -->
                <td>{{ bo.dueAt ? formatTime(bo.dueAt) : 'N/A' }}</td>

                <!-- Returned At -->
                <td>
                    <template v-if="bo.returnedAt">
                        <span class="fw-bold text-success">{{ formatTime(bo.returnedAt) }}</span>
                    </template>
                    <template v-else>
                        <span class="fw-bold text-danger">Not yet returned</span>
                    </template>
                </td>

                <!-- Updated At -->
                <td>{{ formatTime(bo.updatedAt ?? bo.createdAt) }}</td>

                <!-- Actions -->
                <td>
                    <div class="btn-group" v-if="!bo.returnedAt">
                        <button class="btn btn-sm btn-light" @click="makeReturned(bo)">
                            <i class="fa-brands fa-gratipay"></i>
                        </button>
                        <RouterLink :to="`/borrow/${bo.borrowId}`" class="btn btn-sm btn-success">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </RouterLink>
                        <button class="btn btn-sm btn-danger" @click="doDelete(bo)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <div class="btn-group" v-else>
                        <RouterLink :to="`/borrow/${bo.borrowId}/qrcode`" class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-receipt"></i>
                        </RouterLink>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>

    <Loading v-else />
</template>