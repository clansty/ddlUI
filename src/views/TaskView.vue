<template>
    <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
        class="flex1"
    >
        <el-form-item label="Name" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Due date">
            <el-date-picker
                type="date"
                placeholder="Pick Date"
                value-format="yyyy-MM-dd"
                v-model="form.due"
            ></el-date-picker>
        </el-form-item>
        <el-form-item label="Notes">
            <el-input type="textarea" autosize v-model="form.note"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="loading"
                >Save</el-button
            >
            <el-button
                type="danger"
                icon="el-icon-delete"
                @click="remove"
                :loading="loading"
            ></el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    due: '',
                    note: ''
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: "Name is required"
                        }
                    ]
                },
                loading: false
            }
        },
        created() {
            this.axios
                .get("/api/item/" + this.$route.params.id)
                .then((response) => {
                    this.form = response.data
                }).catch(error => {
                    if (error.response && error.response.status == 401) {
                        this.$router.push({ name: "unauthorized" });
                    }
                    else if (error.response && error.response.status == 404) {
                        this.$router.push({ name: "tasks" });
                    }
                    else {
                        this.$router.push({ name: "servererr" });
                    }
                })
        },
        methods: {
            onSubmit() {
                this.loading = true;
                this.axios.put('/api/item/' + this.$route.params.id, this.form)
                    .then((response) => {
                        if (response.body.code != 200) {
                            this.$alert('Responce code: ' + response.body.code, 'Error', {
                                type: 'error'
                            });
                        }
                        this.loading = false;
                        this.$router.push({ name: "tasks" })
                    }).catch(error => {
                        if (error.response) {
                            this.$alert('Responce code: ' + error.response.status, 'Error', {
                                type: 'error'
                            })
                        }
                        this.loading = false;
                        this.$router.push({ name: "tasks" })
                    })
            },
            remove() {
                this.axios.delete('/api/item/' + this.$route.params.id)
                    .then((response) => {
                        if (response.body.code != 200) {
                            this.$alert('Responce code: ' + response.body.code, 'Error', {
                                type: 'error'
                            });
                        }
                        this.loading = false;
                        this.$router.push({ name: "tasks" })
                    }).catch(error => {
                        if (error.response) {
                            this.$alert('Responce code: ' + error.response.status, 'Error', {
                                type: 'error'
                            })
                        }
                        this.loading = false;
                        this.$router.push({ name: "tasks" })
                    })
            }
        }
    }
</script>