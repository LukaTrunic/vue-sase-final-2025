<script lang="ts" setup>
import Loading from '@/components/Loading.vue';
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import { BorrowService } from '@/services/borrow.service';
import { ref } from 'vue';

const logout = useLogout()
const borrows = ref()
BorrowService.getBorrows()
    .then(rsp => borrows.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation/>
    <pre v-if="borrows">{{ borrows }}</pre>
    <Loading v-else/>
</template>