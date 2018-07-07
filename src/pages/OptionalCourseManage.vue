<template>
  <div>
    <page-component :title="title">
      <template slot="search" slot-scope="scope">
        <optionalCourseSearchBox @resetDatas="getDatas" :search="scope.search"
        :reset="scope.reset" :categories="categories"
        :subjects="subjects" :domains="domains"/>
      </template>
      <template slot="digital-table" slot-scope="scope">
        <optionalCourseTable :tableData="tableData" @dataChanged="getDatas"
        :categories="categories" :subjects="subjects" :domains="domains"/>
      </template>
    </page-component>
  </div>
</template>

<script>
import pageComponent from '../components/pageComponent'
import optionalCourseSearchBox from '../components/optional/optionalCourseSearchBox'
import optionalCourseTable from '../components/optional/optionalCourseTable'
import baseService from '../service/baseService.js'
import {courseService} from '../service/courseService'
export default {
  components: {
    pageComponent,
    optionalCourseSearchBox,
    optionalCourseTable
  },
  data () {
    return {
      title: '选修课课程管理',
      tableData: {},
      categories: [],
      subjects: [],
      domains: [],
      isUpdate: false,
      searchConditions: {
        pageSize: 10,
        currentPage: 0
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
      courseService.getCourse(this.searchConditions)
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
    courseService.getCourse(this.searchConditions)
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
