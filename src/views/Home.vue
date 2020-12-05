<template>
    <el-container>
        <el-header>
            <Menu></Menu>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
    import Menu from "../components/Menu";
    export default {
        name: "Home",
        beforeRouteEnter(to, from, next) {
            window.token = to.params.token;
            next();
        },
        components: {
            Menu,
        },
        created() {
            const vue = this
            this.axios.defaults.headers.common["x-auth"] = window.token;
            this.axios
                .get("/api/user/me")
                .then((response) => {
                    window.uid=response.data.uid
                }).catch(error => {
                    if (error.response && error.response.status == 401) {
                        this.$router.push({ name: "unauthorized" });
                    }
                    else{
                        this.$router.push({ name: "servererr" });
                    }
                })
        },
    };
</script>
