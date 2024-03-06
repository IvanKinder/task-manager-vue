<template>
    <header>
        <v-btn class="back-btn" @click="toBack" variant="tonal">
            Назад
        </v-btn>
        <h2>Список задач</h2>
    </header>
    <main>
        <v-expansion-panels variant="popout">
            <v-expansion-panel
                v-for="(task, idx) in tasksList"
                :title="`${idx + 1}. ${task.name}`"
                :key="task.id"
            >
                <v-expansion-panel-text>
                    <div class="task-content">
                        <span class="task-description">{{ task.description }}</span>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="secondary"
                                variant="text"
                            >
                                Изменить
                            </v-btn>
                            <v-btn
                                color="primary"
                                variant="text"
                                @click="deleteTask(task)"
                            >
                                Удалить
                            </v-btn>
                        </v-card-actions>
                    </div>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const tasksList = ref([]);
const router = useRouter()

const toBack = () => {
    router.go(-1);
}

const deleteTask = (task) => {
    console.localStorage(task);
}

onMounted(() => {
    axios.get('http://127.0.0.1:8000/tasks/').then((res) => {
        if (res.status === 200) {
            tasksList.value = res.data;
        }
    });
})
</script>

<style scoped>
.back-btn {
    margin: 0 0;
    width: fit-content;
    justify-self: baseline;
}
main, h2 {
    margin-top: 20px;
    width: 700px;
}
.task-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.task-description {
    text-align: start;
    align-self: center;
    width: 450px;
    max-height: 200px;
    overflow: scroll;
}
</style>