<template>
  <div id="app">
    <el-row class="tac">
      <el-col :span="3">
        <sideMenu/>
      </el-col>
      <el-col :span="21" style="padding-top:20px;padding-left:10px;">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import './common.css'
import sideMenu from './components/base/sideMenu'
export default {
  name: 'App',
  components: {
    sideMenu
  }
}
</script>

<style>
* {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
