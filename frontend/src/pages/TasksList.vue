<template>
    <header>
        <v-btn class="back-btn" @click="toBack" variant="tonal">
            Назад
        </v-btn>
        <h2>Список задач</h2>
    </header>
    <main>
        <v-expansion-panels variant="popout" :readonly="isChangingTask">
            <v-expansion-panel
                v-for="(task, idx) in tasksList"
                :key="task.id"
                ref="tasksEl"
            >
                <v-expansion-panel-title>
                    <template v-slot:default="{ expanded }">
                        <v-fade-transition v-if="isChangingTask && expanded" leave-absolute>
                            <v-text-field
                                v-model="changingTaskItem.name"
                                :placeholder="task.name"
                                hide-details
                            ></v-text-field>
                        </v-fade-transition>
                        <v-fade-transition v-else leave-absolute>
                            {{ `${idx + 1}. ${task.name}` }}
                        </v-fade-transition>
                    </template>
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div v-if="!isChangingTask" class="task-content">
                        <span class="task-description">{{ task.description }}</span>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="secondary"
                                variant="text"
                                @click="changeTask(task)"
                            >
                                Изменить
                            </v-btn>
                            <v-btn
                                color="primary"
                                variant="text"
                                @click="deleteTask(task, idx)"
                            >
                                Удалить
                            </v-btn>
                        </v-card-actions>
                    </div>
                    <div v-else class="task-content">
                        <v-text-field
                            v-model="changingTaskItem.description"
                            :placeholder="task.description"
                            hide-details
                        ></v-text-field>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="secondary"
                                variant="text"
                                @click="saveTask(task, idx)"
                            >
                                Сохранить
                            </v-btn>
                            <v-btn
                                color="primary"
                                variant="text"
                                @click="() => isChangingTask = false"
                            >
                                Отмена
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
const tasksEl = ref(null);
const router = useRouter()
const isChangingTask = ref(false);
const changingTaskItem = ref({
    id: "",
    name: "",
    description: "",
    is_done: false,
});

const toBack = () => {
    router.go(-1);
}

const deleteTask = (task, index) => {
    axios.delete(`http://127.0.0.1:8000/tasks/${task.id}/`).then((res) => {
        if (res.status === 204) {
            tasksList.value = tasksList.value.filter((el, idx) => {
                return el != task;
            });
            tasksEl.value[index].$el.querySelector('button').click();
        }
    });
}

const changeTask = (task) => {
    isChangingTask.value = true;
    changingTaskItem.value = {...task};
}

const saveTask = (task, index) => {
    tasksList.value.forEach((el) => {
        if (el === task) {
            axios.patch(`http://127.0.0.1:8000/tasks/${task.id}/`, {
                name: changingTaskItem.value.name,
                description: changingTaskItem.value.description
            }).then((res) => {
                if (res.status === 200) {
                    el.name = changingTaskItem.value.name;
                    el.description = changingTaskItem.value.description;
                    isChangingTask.value = false;
                }
            });
        }
    });
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