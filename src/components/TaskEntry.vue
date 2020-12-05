<template>
    <el-card
        shadow="hover"
        :body-style="{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
        }"
    >
        <div class="bt" @click="setDone">
            <FontAwesomeIcon
                :icon="['far', 'circle']"
                size="lg"
                v-if="!done"
            ></FontAwesomeIcon>
            <FontAwesomeIcon
                :icon="['fas', 'check-circle']"
                size="lg"
                v-if="done"
            ></FontAwesomeIcon>
        </div>
        <router-link to="">
            <div class="body">
                <span class="title" v-bind:class="{ del: done }">aaa</span>
                <div class="detail">
                    <span v-bind:class="{ del: done }">abc</span>
                </div>
            </div>
        </router-link>
    </el-card>
</template>

<style scoped>
    div.body {
        padding: 0 20px;
        text-decoration: none;
        width: 100%;
    }
    div.bt {
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: #303133;
    }
    a {
        text-decoration: none;
        width: 100%;
    }
    .title {
        color: #303133;
    }
    .detail {
        color: #606266;
        font-size: small;
    }
    .del{
        text-decoration: line-through;
        color: #909399;
    }
</style>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
    import { faCircle } from '@fortawesome/free-regular-svg-icons'

    library.add(faCheckCircle)
    library.add(faCircle)
    export default {
        name: "TaskEntry",
        components: {
            FontAwesomeIcon
        },
        props: {
            name: String,
            id: String,
            due: String,
            done: Boolean
        },
        methods: {
            setDone() {
                this.done = !this.done
            }
        }
    }
</script>