<template>
  <div>
    <el-form inline :model="searchConditions" label-width="100px">
      <el-form-item class="search-item" label="年级：">
        <el-select @change="changeGrade" class="round-input" v-model="selectGrade" placeholder="请输入年级">
          <el-option v-for="(item, index) in grades"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="班级：">
        <el-select @change="changeClass" class="round-input" v-model="selectClass" placeholder="请输入班级">
          <el-option v-for="(item, index) in classes"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item class="search-item" label="课程名称">
        <el-input class="round-input" placeholder="请输入课程名称" v-model="searchConditions.courseCode"/>
      </el-form-item>
      <el-form-item class="search-item" label="老师姓名">
        <el-input class="round-input" placeholder="请输入老师姓名" v-model="searchConditions.teacherName"/>
      </el-form-item>
      <el-form-item class="search-item" label="学生姓名">
        <el-input class="round-input" placeholder="请输入学生姓名" v-model="searchConditions.studentName"/>
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
    changeGrade () {
    },
    changeClass () {
      // 可能存在空指针异常
      this.terms = this.schoolYears[this.selectedYear].terms
      this.selectedTerm = this.terms[0].id
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
      terms: [],
      grades: [],
      classes: [],
      selectGrade: -1,
      selectClass: -1
    }
  },
  mounted () {
    this.selectedYear = parseInt(this.$route.params.selectedYear)
    this.selectedTerm = parseInt(this.$route.params.selectedTerm)
    this.searchConditions.termId = this.selectedTerm
    baseService.getGrades2()
      .then(({data}) => {
        this.grades = data
        // this.searchConditions.grade = this.grades[0].id
        this.selectGrade = this.grades[0].id
        baseService.getClass(this.selectGrade)
          .then(({data}) => {
            this.classes = data
            this.selectClass = this.classes[0].id
          })
      })
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
