<template>
    <el-card
        shadow="hover"
        :body-style="{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 20px',
            minHeight: '40px',
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
                <span class="title" v-bind:class="{ del: done }">
                    {{ name }}
                </span>
                <div
                    class="detail"
                    v-bind:class="{ missed, near, later, del: done }"
                >
                    <FontAwesomeIcon
                        :icon="['fal', 'calendar-alt']"
                        size="sm"
                        v-if="later"
                        v-bind:class="{ del: done }"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                        :icon="['fal', 'calendar-times']"
                        size="sm"
                        v-if="missed"
                        v-bind:class="{ del: done }"
                    ></FontAwesomeIcon>
                    <FontAwesomeIcon
                        :icon="['fal', 'calendar-exclamation']"
                        size="sm"
                        v-if="near"
                        v-bind:class="{ del: done }"
                    ></FontAwesomeIcon>
                    <span v-bind:class="{ del: done }">{{ duex }}</span>
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
        font-size: small;
        align-items: center;
        margin-left: 2px;
    }
    .del {
        text-decoration: line-through;
        color: #c0c4cc;
    }
    .detail span {
        margin-left: 4px;
    }
    .missed {
        color: #f56c6c;
    }
    .near {
        color: #e6a23c;
    }
    .later {
        color: #909399;
    }
</style>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
    import { faCircle } from '@fortawesome/free-regular-svg-icons'
    import { faCalendarAlt, faCalendarTimes, faCalendarExclamation } from '@fortawesome/pro-light-svg-icons'

    library.add(faCheckCircle, faCircle, faCalendarAlt, faCalendarTimes, faCalendarExclamation)
    export default {
        name: "TaskEntry",
        components: {
            FontAwesomeIcon
        },
        data() {
            return {
                duex: 0,
                near: false,
                later: false,
                missed: false
            }
        },
        created() {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            const dateStart = new Date(`${year}-${month}-${day}`)
            const dateEnd = new Date(this.due);
            const difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
            if (difValue == 0) {
                this.duex = 'Today'
                this.near = true
            }
            else if (difValue == 1) {
                this.duex = 'Tomorrow'
                this.near = true
            }
            else if (difValue < 0) {
                this.duex = this.due
                this.missed = true
            } else {
                this.duex = this.due
                this.later = true
            }
        },
        props: {
            name: String,
            key: String,
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