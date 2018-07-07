<template>
  <div>
    <page-component :title="title" :rightMenuSettings="rightMenuSettings">
      <template slot="search" slot-scope="scope">
        <classOptionalCourseSearchBox @resetDatas="getDatas" :search="scope.search"
        :reset="scope.reset" :schoolYears="scope.schoolYears"
        :categories="categories" :teachers="teachers"/>
      </template>
      <template slot="digital-table" slot-scope="scope">
        <classOptionalCourseTable :tableData="tableData" @dataChanged="getDatas"
        :classroomName="classroomName" />
      </template>
    </page-component>
  </div>
</template>

<script>
import pageComponent from '../components/pageComponent'
import classOptionalCourseSearchBox from '../components/optional/classOptionalCourseSearchBox'
import classOptionalCourseTable from '../components/optional/classOptionalCourseTable'
import studentCourseService from '../service/studentCourseService.js'
export default {
  components: {
    classOptionalCourseSearchBox,
    classOptionalCourseTable,
    pageComponent
  },
  data () {
    return {
      title: '班级选课详情',
      tableData: {},
      searchConditions: {
        pageSize: 10,
        currentPage: 0
      },
      rightMenuSettings: {
        showRight: true,
        showBackbutton: false
      },
      classroomId: -1,
      classroomName: '',
      termInfo: {},
      categories: [],
      teachers: [],
      classId: -1
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
      studentCourseService.getClassCourse(this.classId, this.searchConditions)
        .then(({data}) => {
          this.tableData = data
        })
    },
    changeTerm (termInfo) {
      this.termInfo = termInfo
    }
  },
  mounted () {
    this.classId = 0

    studentCourseService.getClassCourse(this.classId, this.searchConditions)
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
