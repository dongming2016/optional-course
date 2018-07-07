<template>
  <div>
    <el-form inline :model="searchConditions" label-width="100px">
      <el-form-item class="search-item" label="开课时间">
        <el-select @change="setYearTime" class="round-input year-input" v-model="selectedYear">
          <el-option v-for="(item, index) in schoolYears"
          :key="index" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-select @change="setTermTime" class="round-input term-input" v-model="selectedTerm" style="width:120px;">
          <el-option v-for="(item, index) in terms"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="课程编号">
        <el-input class="round-input" placeholder="请输入课程名称" v-model="searchConditions.courseCode"/>
      </el-form-item>
      <el-form-item class="search-item" label="课程名称">
        <el-input class="round-input" placeholder="请输入课程名称" v-model="searchConditions.courseName"/>
      </el-form-item>
      <el-form-item class="search-item" label="课程类别">
        <el-select class="round-input" v-model="searchConditions.catergory" placeholder="请输入课程类别">
          <el-option v-for="(item, index) in categories"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="任课老师">
        <el-select class="round-input" v-model="searchConditions.teacher" placeholder="请输入任课老师">
          <el-option v-for="(item, index) in teachers"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import baseService from '../../service/baseService.js'
import timeSelect from '../clock/timeSelect'
export default {
  components: {
    timeSelect
  },
  props: ['search', 'reset', 'termInfo',
    'schoolYears'],
  watch: {
    search (newVal, oldVal) {
      const searchConditions = this.searchConditions
      this.$emit('resetDatas', {searchConditions})
    },
    reset (newVal, oldVal) {
      this.searchConditions = {}
      const searchConditions = this.searchConditions
      this.$emit('resetDatas', {searchConditions})
    },
    schoolYears (newVal, oldVal) {
      if (this.schoolYears[this.selectedYear]) {
        this.terms = this.schoolYears[this.selectedYear].terms
      }
    }
  },
  methods: {
    selectTime (timeStr) {
      this.searchConditions.time = timeStr
    },
    setYearTime () {
      // 可能存在空指针异常
      this.terms = this.schoolYears[this.selectedYear].terms
      this.selectedTerm = this.terms[0].id
      this.searchConditions.termId = this.selectedTerm
    },
    setTermTime () {
      this.searchConditions.termId = this.selectedTerm
    }
  },
  data () {
    return {
      searchConditions: {},
      teachers: [],
      categories: [],
      selectedYear: -1,
      selectedTerm: -1,
      terms: []
    }
  },
  mounted () {
    this.selectedYear = parseInt(this.$route.params.selectedYear)
    this.selectedTerm = parseInt(this.$route.params.selectedTerm)
    this.searchConditions.termId = this.selectedTerm
    baseService.getCategory(0)
      .then(({data}) => {
        this.categories = data
      })
    baseService.getTeachers()
      .then(({data}) => {
        this.teachers = data
      })
  }
}
</script>

<style>
.year-input .el-input__inner {
  width: 150px;
}
.term-input .el-input__inner {
  width: 105px;
}
</style>
