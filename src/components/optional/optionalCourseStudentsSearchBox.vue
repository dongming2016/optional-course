<template>
  <div>
    <el-form inline :model="searchConditions" label-width="100px">
      <el-form-item class="search-item" label="学生姓名：">
        <el-input class="round-input" placeholder="请输入学生姓名" v-model="searchConditions.studentName"/>
      </el-form-item>
      <el-form-item class="search-item" label="年级：">
        <el-select class="round-input"  placeholder="请输入年级" v-model="searchConditions.class">
          <el-option v-for="(item, index) in classes"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="班级：">
        <el-select class="round-input"  placeholder="请输入班级" v-model="searchConditions.grade">
          <el-option v-for="(item, index) in classes"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['search', 'reset'],
  watch: {
    search (newVal, oldVal) {
      const searchConditions = this.searchConditions
      this.$emit('resetDatas', {searchConditions})
    },
    reset (newVal, oldVal) {
      this.searchConditions = {}
      const searchConditions = this.searchConditions
      this.$emit('resetDatas', {searchConditions})
    }
  },
  data () {
    return {
      searchConditions: {},
      classes: [],
      grades: []
    }
  }
}
</script>
