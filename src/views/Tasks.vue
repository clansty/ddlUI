<template>
    <div>
        <TaskEntry
            v-for="task in sortTasks"
            :key="task.id"
            :name="task.name"
            :due="task.due"
            :id="task.id"
            :done="task.done"
            class="entry"
        ></TaskEntry>
        <AddTask v-bind:opened="add"></AddTask>
        <div class="floatbtns">
            <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                @click="openDrawer"
            ></el-button>
        </div>
    </div>
</template>

<style scoped>
    .entry {
        margin-bottom: 10px;
    }
    .floatbtns {
        right: 60px;
        bottom: 60px;
        position: fixed;
    }
</style>

<script>
    import TaskEntry from '@/components/TaskEntry'
    import AddTask from '../components/AddTask.vue';
    export default {
        components: {
            TaskEntry,
            AddTask
        },
        data() {
            return {
                tasks: [],
                add: {// here created a object because Tasks should share the same instance of data Opened with AddTask
                    opened: false
                }
            };
        },
        computed: {
            sortTasks() {
                this.tasks.forEach(i => {
                    if (i.status && i.status[window.uid]) {
                        i.done = true
                    }
                });
                this.tasks.sort(compareByDate)
                return this.tasks
            }
        },
        methods: {
            openDrawer() {
                this.add.opened = true
            }
        },
        created() {
            this.axios.get("/api/all")
                .then((response) => {
                    this.tasks = response.data;
                }).catch(error => {
                    if (error.response && error.response.status == 401) {
                        this.$router.push({ name: "unauthorized" });
                    }
                    else {
                        this.$router.push({ name: "servererr" });
                    }
                })
        },
    };
    function compareByDate(a, b) {
        console.log("sort")
        if (!a.due && !b.due)
            return 0
        if (a.due && !b.due)
            return -1
        if (b.due && !a.due)
            return 1
        const dateStart = new Date(a.due)
        const dateEnd = new Date(b.due)
        console.log(dateStart - dateEnd)
        return dateStart - dateEnd
    }
</script>