<script lang="ts" setup>
import Navigation from '@/components/Navigation.vue';
import { useLogout } from '@/hooks/logout.hook';
import type { BorrowModel } from '@/models/borrow.model';
import { BorrowService } from '@/services/borrow.service';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import QRCodeVue3 from "qrcode-vue3";

const route = useRoute()
const logout = useLogout()
const id = Number(route.params.id)
const borrow = ref<BorrowModel>()

BorrowService.getBorrowById(id)
    .then(rsp => borrow.value = rsp.data)
    .catch(e => logout(e))
</script>

<template>
    <Navigation/>
    <pre>{{ borrow }}</pre>
    <QRCodeVue3 value = "Simple QR code"/>
</template>