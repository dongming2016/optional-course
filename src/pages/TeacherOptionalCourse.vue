<template>
  <div>
    <page-component :title="title" :rightMenuSettings="rightMenuSettings">
      <template slot="search" slot-scope="scope">
        <teacherOptionalCourseSearchBox @resetDatas="getDatas" :search="scope.search"
        :reset="scope.reset" :schoolYears="scope.schoolYears"
        :categories="categories" :teachers="teachers"/>
      </template>
      <template slot="digital-table" slot-scope="scope">
        <teacherOptionalCourseTable :tableData="tableData" @dataChanged="getDatas"/>
      </template>
    </page-component>
  </div>
</template>

<script>
import pageComponent from '../components/pageComponent'
import teacherOptionalCourseSearchBox from '../components/optional/teacherOptionalCourseSearchBox'
import teacherOptionalCourseTable from '../components/optional/teacherOptionalCourseTable'
import teacherCourseService from '../service/teacherCourseService.js'
export default {
  components: {
    teacherOptionalCourseSearchBox,
    teacherOptionalCourseTable,
    pageComponent
  },
  data () {
    return {
      title: '我的选修课',
      tableData: {},
      searchConditions: {
        pageSize: 10,
        currentPage: 0
      },
      rightMenuSettings: {
        showRight: false,
        showBackbutton: true
      },
      termInfo: {},
      categories: [],
      teachers: [],
      teacherId: -1,
      teacherName: -1
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
      teacherCourseService.getTeacherCourse(this.teacherId, this.searchConditions)
        .then(({data}) => {
          this.tableData = data
        })
    }
  },
  mounted () {
    this.teacherId = this.$route.params.teacherId

    teacherCourseService.getTeacherCourse(this.teacherId, this.searchConditions)
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
