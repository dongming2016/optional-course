<template>
  <div>
    <page-component :title="title" :rightMenuSettings="rightMenuSettings">
      <template slot="search" slot-scope="scope">
        <studentOptionalCourseSearchBox @resetDatas="getDatas" :search="scope.search"
        :reset="scope.reset" :schoolYears="scope.schoolYears"
        :categories="categories" :teachers="teachers"/>
      </template>
      <template slot="digital-table" slot-scope="scope">
        <studentOptionalCourseTable :tableData="tableData" @dataChanged="getDatas"/>
      </template>
    </page-component>
  </div>
</template>

<script>
import pageComponent from '../components/pageComponent'
import studentOptionalCourseSearchBox from '../components/optional/studentOptionalCourseSearchBox'
import studentOptionalCourseTable from '../components/optional/studentOptionalCourseTable'
import studentCourseService from '../service/studentCourseService.js'
export default {
  components: {
    studentOptionalCourseSearchBox,
    studentOptionalCourseTable,
    pageComponent
  },
  data () {
    return {
      title: '学生选课详情',
      tableData: {},
      searchConditions: {
        pageSize: 10,
        currentPage: 0
      },
      rightMenuSettings: {
        showRight: false,
        showBackbutton: true
      },
      classroomId: -1,
      termInfo: {},
      categories: [],
      teachers: [],
      studentId: -1
    }
  },
  methods: {
    getDatas ({searchConditions, pagination}) {
      // 当searchConditions不为空时，搜索条件为searchConditions，pageSize为10, currentPage为0
      // 当searchConditions为空时，搜索条件为空和pagination
      if (searchConditions) {
        this.searchConditions = searchConditions
        Object.assign(this.searchConditions, {pageSize: 10, currentPage: 0})
      } else {
        Object.assign(this.searchConditions, pagination)
      }
      studentCourseService.getStudentCourse(this.studentId, this.searchConditions)
        .then(({data}) => {
          this.tableData = data
        })
    }
  },
  mounted () {
    this.studentId = this.$route.params.studentId

    studentCourseService.getStudentCourse(this.studentId, this.searchConditions)
      .then(({data}) => {
        this.tableData = data
      })
  }
}
</script>

<style>
.search-item {
  width: 23%;
  text-align: right;
}
.round-input input {
  border-radius: 20px;
  width:230px;
}

</style>
