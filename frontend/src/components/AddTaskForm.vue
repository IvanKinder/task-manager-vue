<template>
    <v-text-field
        v-model="taskName"
        clearable 
        label="Название"
        placeholder="Введите название задачи"
    ></v-text-field>
    <v-text-field
        v-model="taskDescription"
        clearable 
        label="Описание"
        placeholder="Введите описание задачи"
    ></v-text-field>
    <v-btn
        color="secondary"
        variant="text"
        @click="saveTask"
        :disabled="!taskName || !taskDescription"
    >
        Сохранить
    </v-btn>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const taskName = ref("");
const taskDescription = ref("");

const saveTask = () => {
    console.log(taskName.value);
    console.log(taskDescription.value);
    // здесь будем сохранять в пинию - пинии пока нет - надо сделать пинию
}
</script>
<style scoped></style>