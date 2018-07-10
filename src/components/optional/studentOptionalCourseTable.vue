<template>
  <div>
    <div>
      学生姓名：
      <el-button round>{{studentName}}</el-button>
      <pagination :totalNumber="tableData.totalNum" @pageSizeChange="sizeChange"/>
      <div class="digital-table">
        <el-table style="border-top:1px solid #F4F4F4"
          :data="tableData.datas" :row-style="rowStyle">
          <el-table-column
            label="开课时间"
            sortable
            prop="courseTime">
          </el-table-column>
            <el-table-column
              label="课程编号"
              sortable
              prop="courseCode">
            </el-table-column>
            <el-table-column
              label="课程名称"
              sortable
              prop="className">
            </el-table-column>
            <el-table-column
              label="课程类别"
              sortable
              prop="category"/>
            <el-table-column
              label="任课教师"
              sortable
              prop="teacherName">
            </el-table-column>
            <el-table-column
              label="学分"
              sortable
              width="80"
              prop="credit"/>
            <el-table-column
              label="适用年级"
              prop="condition"/>
            <el-table-column
              label="科目限选"
              width="100"
              prop="courseLimit"/>
            <el-table-column
              label="班级限选"
              width="100"
              prop="classLimit"/>
          </el-table>
        </div>
      <div style="text-align:center;">
        <el-pagination layout="prev, pager, next"
        :current-page="tableData.currentPage" :page-size="pageSize"
          :total="tableData.totalNum"
          @current-change="pageNoChange"
          ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '../pagination'
import optionalCourseEditBox from './optionalCourseEditBox'
import {courseService} from '../../service/courseService.js'
import {deleteCallback} from '../../common/CommonCallback.js'

export default {
  props: ['tableData', 'termInfo'],
  components: {
    pagination,
    optionalCourseEditBox
  },
  data () {
    return {
      deleteDialogVisible: false,
      pageSize: 10,
      totalNumber: 0,
      classroomId: -1,
      courseName: '',
      studentId: -1,
      studentName: ''
    }
  },
  methods: {
    addCourse () {
      this.editDialogVisible = true
      this.editTitle = '添加课程'
      this.course = {}
    },
    editCourse (course) {
      this.editDialogVisible = true
      this.editTitle = '编辑课程'
      this.course = course
    },
    editCallback () {
      this.editDialogVisible = false
      const pagination = {pageSize: 10, currentPage: 1}
      this.$emit('dataChanged', {pagination})
    },
    rowStyle ({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return {
          'background': '#EEFAFA'
        }
      }
    },
    OK () {
      const id = this.id
      const classroomId = this.classroomId
      courseService.removeStudent(classroomId, id).then(() => {
        deleteCallback.success.call(this)
        const size = this.pageSize
        const pagination = {pageSize: size, currentPage: 1}
        this.$emit('dataChanged', {pagination})
        this.tableData.datas = this.tableData.datas.filter(element => {
          return element.id !== id
        })
      })
        .catch(err => {
          console.log(err)
          deleteCallback.fail.bind(this)
        })
      this.deleteDialogVisible = false
    },
    Cancel () {
      this.deleteDialogVisible = false
    },
    sizeChange (size) {
      this.pageSize = size
      const pagination = {pageSize: size, currentPage: 1}
      this.$emit('dataChanged', {pagination})
    },
    pageNoChange (pageNO) {
      const size = this.pageSize
      const pagination = {pageSize: size, currentPage: pageNO}
      this.$emit('dataChanged', {pagination})
    }
  },
  mounted () {
    this.studentName = this.$route.params.studentName
  }
}
</script>

<style>
.table-button {
  display: inline-block;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;

}
.table-edit-button {
  border:1px solid #FEA96D;
  color: #FEA96D;
}
.table-delete-button {
  border:1px solid #66E1D3;
  color: #66E1D3;
}
.digital-table {
  margin: 20px 10px;
  min-height: 380px;
}
.remove-button {
  width: 120px;
  margin: auto;
  border: 1px solid#FEA96D;
  border-radius: 20px;
}
</style>
