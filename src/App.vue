<template>
  <div id="app">
    <el-row justify="center" type="flex">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
html {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
</style>