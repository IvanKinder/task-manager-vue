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
import { useTasksStore } from '../stores/tasksStore';

const tasksStore = useTasksStore();

const taskName = ref<string>("");
const taskDescription = ref<string>("");

const saveTask = () => {
    tasksStore.addTask({
        name: taskName.value,
        description: taskDescription.value,
    });
    taskName.value = "";
    taskDescription.value = "";
}
</script>
<style scoped></style>