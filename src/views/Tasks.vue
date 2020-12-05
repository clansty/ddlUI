<template>
    <TaskEntry name="123" due="123"></TaskEntry>
</template>

<script>
    import TaskEntry from '@/components/TaskEntry'
    export default {
        components: {
            TaskEntry
        },
        data() {
            return {
                uid: window.uid,
                token: window.token,
                apiver: "",
            };
        },
        created() {
            // this.axios.get("/api/all")
            //     .then((response) => {
            //         this.apiver = response.data.version;
            //     }).catch(error => {
            //         if (error.response && error.response.status == 401) {
            //             this.$router.push({ name: "unauthorized" });
            //         }
            //         else{
            //             this.$router.push({ name: "servererr" });
            //         }
            //     })
        },
    };
</script>