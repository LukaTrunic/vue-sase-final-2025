<script lang="ts" setup>
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

    <pre>{{ borrows }}</pre>
</template>