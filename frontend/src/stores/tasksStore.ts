import { defineStore } from 'pinia'
import { ref } from 'vue';
import axios from 'axios';


export const useTasksStore = defineStore('tasks', () => {
    const tasks = ref<any[]>([]);

    const getTasks = async () => {
        const res = await axios.get('http://127.0.0.1:8000/tasks/');
        if (res.status === 200) {
            tasks.value = res.data;
        }
    }

    const deleteTask = async (task: any, index: number) => {
        const res = await axios.delete(`http://127.0.0.1:8000/tasks/${task.id}/`);
        if (res.status === 204) {
            tasks.value = tasks.value.filter((el, idx) => {
                return el != task;
            });
        }
    }

    const changeTask = async (task: any, changingTaskItem: any) => {
        const res = await axios.patch(`http://127.0.0.1:8000/tasks/${task.id}/`, {
            name: changingTaskItem.name,
            description: changingTaskItem.description
        });
        tasks.value.forEach((el: any) => {
            if (el === task) {
                if (res.status === 200) {
                    el.name = changingTaskItem.name;
                    el.description = changingTaskItem.description;
                }
            }
        });
    }

    const addTask = async (task: any) => {
        const res: any = await axios.post(`http://127.0.0.1:8000/tasks/`, task);
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
