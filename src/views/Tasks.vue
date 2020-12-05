<template>
    <div>
        <TaskEntry
            v-for="task in sortTasks"
            :key="task.id"
            :name="task.name"
            :due="task.due"
            class="entry"
        ></TaskEntry>
    </div>
</template>

<style scoped>
    .entry {
        margin-bottom: 10px;
    }
</style>

<script>
    import TaskEntry from '@/components/TaskEntry'
    export default {
        components: {
            TaskEntry
        },
        data() {
            return {
                tasks: []
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
        const dateStart = new Date(a)
        const dateEnd = new Date(b)
        return dateStart - dateEnd
    }
</script>