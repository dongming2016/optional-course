<template>
  <div>
    <el-form inline :model="searchConditions" label-width="100px">
      <el-form-item class="search-item" label="课程编号">
        <el-input class="round-input" placeholder="请输入课程编号" v-model="searchConditions.courseCode"/>
      </el-form-item>
      <el-form-item class="search-item" label="课程名称">
        <el-input class="round-input" placeholder="请输入课程名称" v-model="searchConditions.courseName"/>
      </el-form-item>
      <el-form-item class="search-item" label="课程类别">
        <el-select class="round-input" v-model="searchConditions.category">
          <el-option v-for="(item, index) in categories"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="学科名称">
        <el-select class="round-input" v-model="searchConditions.subject" placeholder="请输入学科名称">
          <el-option v-for="(item, index) in subjects"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="课程所属领域">
        <el-select class="round-input" v-model="searchConditions.courseDomain"
        placeholder="请输入所属领域">
          <el-option v-for="(item, index) in domains"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="考核方式">
        <el-select class="round-input" v-model="searchConditions.testMethod" placeholder="请输入考核方式">
          <el-option v-for="(item, index) in methods"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ['search', 'reset', 'categories', 'subjects', 'domains'],
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
      methods: [{id: 0, name: '考查'}, {id: 1, name: '考试'}]
    }
  }
}
</script>
