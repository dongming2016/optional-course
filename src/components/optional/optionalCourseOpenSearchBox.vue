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
        <el-select class="round-input" v-model="searchConditions.typeId">
          <el-option v-for="(item, index) in categories"
          :key="index" :label="item.typeName" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="学科名称">
        <el-select class="round-input" v-model="searchConditions.subjectId" placeholder="请输入学科名称">
          <el-option v-for="(item, index) in subjects"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="课程所属领域">
        <el-select class="round-input" v-model="searchConditions.domainId"
        placeholder="请输入所属领域">
          <el-option v-for="(item, index) in domains"
          :key="index" :label="item.domainName" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="任课老师">
        <el-select class="round-input" v-model="searchConditions.teacher" placeholder="请输入任课老师">
          <el-option v-for="(item, index) in teachers"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="上课时间">
        <timeSelect @selectTime="selectTime" :timeSelected="searchConditions.time"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import timeSelect from '../clock/timeSelect'
export default {
  components: {
    timeSelect
  },
  props: ['search', 'reset', 'categories', 'domains', 'subjects', 'teachers'],
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
  methods: {
    selectTime (timeStr) {
      this.searchConditions.time = timeStr
    }
  },
  data () {
    return {
      searchConditions: {}
    }
  }
}
</script>
