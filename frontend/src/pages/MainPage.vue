<template>
    <main>
        <h1>Главная страница</h1>
        <v-btn @click="toTasksList" variant="tonal">
            Список задач
        </v-btn>
    </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const toTasksList = () => {
    router.push('/tasks');
}
</script>
<style scoped>
main {
    display: grid;
    gap: 20px;
    grid-template-rows: 200px 1fr;
}
button {
    width: fit-content;
    justify-self: center;
}
</style>