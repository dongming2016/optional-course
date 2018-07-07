<template>
  <!-- 开课管理 -->
  <div>
    <page-component :title="title" :rightMenuSettings="rightMenuSettings">
      <template slot="search" slot-scope="scope">
        <optionalCourseOpenSearchBox @resetDatas="getDatas" :search="scope.search"
        :reset="scope.reset" :categories="categories"
        :subjects="subjects" :domains="domains" :teachers="teachers"/>
      </template>
      <template slot="digital-table" slot-scope="scope">
        <optionalCourseOpenTable :tableData="tableData" @dataChanged="getDatas"
        :categories="categories" :subjects="subjects" :domains="domains"
        :teachers="teachers"/>
      </template>
    </page-component>
  </div>
</template>

<script>
import pageComponent from '../components/pageComponent'
import optionalCourseOpenSearchBox from '../components/optional/optionalCourseOpenSearchBox'
import optionalCourseOpenTable from '../components/optional/optionalCourseOpenTable'
import baseService from '../service/baseService.js'
import {courseService} from '../service/courseService'
export default {
  components: {
    pageComponent,
    optionalCourseOpenSearchBox,
    optionalCourseOpenTable
  },
  data () {
    return {
      title: '选修课开课管理',
      tableData: {},
      categories: [],
      subjects: [],
      domains: [],
      isUpdate: false,
      searchConditions: {
        pageSize: 10,
        currentPage: 0
      },
      teachers: [],
      rightMenuSettings: {
        showRight: true
      }
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
      courseService.getClassroom(this.searchConditions)
        .then(({data}) => {
          this.tableData = data
          this.tableData.currentPage = this.searchConditions.currentPage
        })
    }
  },
  mounted () {
    baseService.getCategory(0)
      .then(({data}) => {
        this.categories = data
      })
    baseService.getDomains()
      .then(({data}) => {
        this.domains = data
      })
    baseService.getSubject()
      .then(({data}) => {
        this.subjects = data
      })
    baseService.getTeachers()
      .then(({data}) => {
        this.teachers = data
      })
    courseService.getClassroom(this.searchConditions)
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
