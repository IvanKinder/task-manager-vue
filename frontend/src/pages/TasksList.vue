<template>
    <header>
        <v-btn class="back-btn" @click="toBack" variant="tonal">
            Назад
        </v-btn>
        <h2>Список задач</h2>
    </header>
    <main>
        <div>
            <h2>Добавить задачу</h2>
            <add-task-form />
        </div>
        <v-expansion-panels class="tasks-component" variant="popout" :readonly="isChangingTask">
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
                                @click="saveTask(task)"
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
import AddTaskForm from '../components/AddTaskForm.vue';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useTasksStore } from '../stores/tasksStore';
import { storeToRefs } from 'pinia';
import type { ITask } from '../controls/interfaces/tasks';

const tasksStore = useTasksStore();
const tasksList = storeToRefs(tasksStore).tasks;
const tasksEl = ref(null);
const router = useRouter()
const isChangingTask = ref(false);
const changingTaskItem = ref<ITask>({
    id: undefined,
    name: "",
    description: "",
});

const toBack = () => {
    router.go(-1);
}

const deleteTask = (task: ITask, index: number) => {
    tasksStore.deleteTask(task, index);
    // @ts-ignore
    tasksEl.value[index].$el.querySelector('button').click();
}

const changeTask = (task: ITask) => {
    isChangingTask.value = true;
    changingTaskItem.value = {...task};
}

const saveTask = (task: ITask) => {
    tasksStore.changeTask(task, changingTaskItem.value);
    isChangingTask.value = false;
}

onMounted(() => {
    tasksStore.getTasks();
})
</script>

<style scoped>
.back-btn {
    margin: 0 0;
    width: fit-content;
    justify-self: baseline;
}
main {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
h2 {
    margin: 20px 0;
}
.tasks-component {
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