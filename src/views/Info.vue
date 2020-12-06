<template>
    <div>
        <h3>User Info</h3>
        <p>UID: {{ uid }}</p>
        <p>User token: {{ token }}</p>
        <h3>System Info</h3>
        <p>Backend version: {{ apiver }}</p>
        <p>Frontend version: {{ frontVer }}</p>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                uid: window.uid,
                token: window.token,
                apiver: "",
                frontVer: process.env.VUE_APP_VERSION
            };
        },
        created() {
            this.axios.get("/api/system")
                .then((response) => {
                    this.apiver = response.data.version;
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
</script>