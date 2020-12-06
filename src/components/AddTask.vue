<template>
    <el-drawer
        title="Add new task"
        :visible.sync="opened.opened"
        :with-header="true"
        :destroy-on-close="true"
        :before-close="handleClose"
        direction="btt"
        size="100%"
        ref="drawer"
    >
        <el-row justify="center" type="flex" class="therow">
            <el-col
                :xs="24"
                :sm="22"
                :md="20"
                :lg="18"
                :xl="16"
                class="flex thecol"
            >
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
                        <el-input
                            type="textarea"
                            autosize
                            v-model="form.note"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div class="flex">
                    <el-button @click="cancelForm" class="flex1"
                        >Cancel</el-button
                    >
                    <el-button
                        type="primary"
                        @click="onSubmit"
                        :loading="loading"
                        class="flex1"
                    >
                        OK
                    </el-button>
                </div>
            </el-col>
        </el-row>
    </el-drawer>
</template>

<style>
    input {
        cursor: pointer;
    }
</style>

<style scoped>
    .flex {
        display: flex;
    }
    .flex1 {
        flex: 1;
    }
    .thecol {
        flex-direction: column;
    }
    .therow {
        height: 100%;
        padding: 20px;
    }
</style>

<script>
    export default {
        props: {
            opened: Object
        },
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
        methods: {
            cancelForm() {
                this.form = {
                    name: '',
                    due: '',
                    note: ''
                }
                this.$refs.drawer.closeDrawer()
            },
            handleClose(done) {
                if (this.loading) {
                    return;
                }
                done()
            },
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.axios.post('/api/add', this.form)
                            .then((response) => {
                                if (response.body.code != 200) {
                                    this.$alert('Responce code: ' + response.body.code, 'Error', {
                                        type: 'error'
                                    });
                                }
                                this.loading = false;
                                this.$refs.drawer.closeDrawer()
                                this.form = {
                                    name: '',
                                    due: '',
                                    note: ''
                                }
                            }).catch(error => {
                                if (error.response) {
                                    this.$alert('Responce code: ' + error.response.status, 'Error', {
                                        type: 'error'
                                    })
                                }
                                this.loading = false;
                                this.$refs.drawer.closeDrawer()
                                this.form = {
                                    name: '',
                                    due: '',
                                    note: ''
                                }
                            })
                    } else {
                        return false;
                    }
                });
            }
        }
    }
</script>