<template>
  <!-- 学生选课详情 -->
  <div>
    <page-component :title="title" :rightMenuSettings="rightMenuSettings">
      <template slot="search" slot-scope="scope">
        <optionalCourseStudentsSearchBox @resetDatas="getDatas" :search="scope.search"
        :reset="scope.reset"/>
      </template>
      <template slot="digital-table" slot-scope="scope">
        <optionalCourseStudentsTable :termInfo="scope.termInfo" :tableData="tableData" @dataChanged="getDatas"
        :classroomName="classroomName" />
      </template>
    </page-component>
  </div>
</template>

<script>
import pageComponent from '../components/pageComponent'
import optionalCourseStudentsSearchBox from '../components/optional/optionalCourseStudentsSearchBox'
import optionalCourseStudentsTable from '../components/optional/optionalCourseStudentsTable'
import {courseService} from '../service/courseService'
export default {
  components: {
    pageComponent,
    optionalCourseStudentsSearchBox,
    optionalCourseStudentsTable
  },
  data () {
    return {
      title: '选课详情',
      tableData: {},
      searchConditions: {
        pageSize: 10,
        currentPage: 0
      },
      rightMenuSettings: {
        showRight: true,
        showBackbutton: true
      },
      classroomId: -1,
      classroomName: ''
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
      courseService.getStudents(this.searchConditions)
        .then(({data}) => {
          this.tableData = data
          this.tableData.currentPage = this.searchConditions.currentPage
        })
    }
  },
  mounted () {
    this.classroomId = this.$route.params.classroomId
    this.classroomName = this.$route.params.classroomName
    this.searchConditions.classroomId = this.classroomId
    courseService.getCourseStudents(this.searchConditions)
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
