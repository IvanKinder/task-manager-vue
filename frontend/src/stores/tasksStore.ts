import { defineStore } from 'pinia'
import { ref } from 'vue';
import axios, { type AxiosResponse } from 'axios';
import type { ITask } from '../controls/interfaces/tasks';


export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<ITask[]>([]);

    const getTasks = async () => {
        const res: AxiosResponse = await axios.get('http://127.0.0.1:8000/tasks/');
        if (res.status === 200) {
            tasks.value = res.data;
        }
    }

    const deleteTask = async (task: ITask, index: number) => {
        const res: AxiosResponse = await axios.delete(`http://127.0.0.1:8000/tasks/${task.id}/`);
        if (res.status === 204) {
            tasks.value = tasks.value.filter((el, idx) => {
                return el != task;
            });
        }
    }

    const changeTask = async (task: ITask, changingTaskItem: ITask) => {
        const res: AxiosResponse = await axios.patch(`http://127.0.0.1:8000/tasks/${task.id}/`, {
            name: changingTaskItem.name,
            description: changingTaskItem.description
        });
        tasks.value.forEach((el: ITask) => {
            if (el === task) {
                if (res.status === 200) {
                    el.name = changingTaskItem.name;
                    el.description = changingTaskItem.description;
                }
            }
        });
    }

    const addTask = async (task: ITask) => {
        const res: AxiosResponse<ITask> = await axios.post(`http://127.0.0.1:8000/tasks/`, task);
        if (res.status === 201) {
            tasks.value.push(res.data);
        }
    }

    return {
        tasks,
        getTasks,
        deleteTask,
        changeTask,
        addTask,
    }
})
