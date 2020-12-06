<template>
    <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
    >
        <el-menu-item index="tasks">Tasks</el-menu-item>
        <el-menu-item index="info">Info</el-menu-item>
    </el-menu>
</template>
<script>
    export default {
        computed: {
            activeIndex() {
                return this.$route.name
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                if (key != this.$route.name)
                    this.$router.push({ name: key })
            },
        },
    };
</script>