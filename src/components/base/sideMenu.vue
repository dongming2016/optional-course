<template>
  <div>
    <el-menu
      style="height:100vh;"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="optional-base-setting">选课设置</el-menu-item>
          <el-menu-item index="/optional-course-base-setting">选修课基础设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/optional-course-manage">
        <i class="el-icon-menu"></i>
        <span slot="title">选修课课程管理</span>
      </el-menu-item>
      <el-menu-item index="/optional-course-open-manage">
        <i class="el-icon-document"></i>
        <span slot="title">选修课开课管理</span>
      </el-menu-item>
      <el-menu-item index="/class-optional-course">
        <i class="el-icon-setting"></i>
        <span slot="title">班级选课详情</span>
      </el-menu-item>
      <el-menu-item index="/teacher-optional-course">
        <i class="el-icon-setting"></i>
        <span slot="title">我的选修课（老师）</span>
      </el-menu-item>
      <el-menu-item index="/student-select-course">
        <i class="el-icon-setting"></i>
        <span slot="title">学生选课</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
