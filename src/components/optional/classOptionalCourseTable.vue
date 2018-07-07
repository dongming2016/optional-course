<template>
  <div>
    <div>
      <div>
        学生姓名：
        <div style="display:inline-block;">
          <el-button round>全部</el-button>
          <el-button v-for="(item, index) in selectedStudents" :key="index" round>{{item.name}}</el-button>
        </div>
      </div>
      <div style="display:inline-block;width:90%;">
      <pagination :totalNumber="tableData.totalNum" @pageSizeChange="sizeChange"/>
        <div class="digital-table" style="margin-top: 50px;">
          <el-table style="border-top:1px solid #F4F4F4"
            :data="tableData.datas" :row-style="rowStyle">
            <el-table-column prop="className" label="班级"/>
              <el-table-column prop="name" sortable label="学生姓名"/>
              <el-table-column prop="courseName" sortable label="课程名称">
              </el-table-column>
              <el-table-column prop="teacherName" sortable label="老师名称">
                <template slot-scope="scope">
                  <!-- <div @click="$router.push(`/teacher-optional-course/${scope.row.teacherId}/${scope.row.teacherName}`)"> -->
                    {{scope.row.teacherName}}
                  <!-- </div> -->
                </template>
              </el-table-column>
              <el-table-column prop="category" label="所属类别"/>
              <el-table-column prop="time" label="上课时间"/>
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
      <div style="color:#43C8B9;display:inline-block;vertical-align: top;margin:60px 0 0 40px;">
        <div style="margin-bottom:30px; text-align:center;">
          根据学生姓名<br/>
          拼音首字母检索
        </div>
        <alphabet :indexer="indexers" style="text-align:center;"
        @clickAlphabet="selectName"/>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from '../pagination'
import optionalCourseEditBox from './optionalCourseEditBox'
import {courseService} from '../../service/courseService.js'
import {deleteCallback} from '../../common/CommonCallback.js'
import alphabet from '../base/alphabet'
import characterUtil from '@/util/characterUtil.js'
import baseService from '../../service/baseService.js'
export default {
  props: ['tableData', 'termInfo'],
  components: {
    pagination,
    optionalCourseEditBox,
    alphabet
  },
  data () {
    return {
      deleteDialogVisible: false,
      pageSize: 10,
      totalNumber: 0,
      classroomId: -1,
      courseName: '',
      studentId: -1,
      studentName: '',
      selectedStudents: [],
      indexedStudents: [],
      indexer: '',
      indexers: [],
      allStudents: [],
      classId: 0
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
      const pagination = {pageSize: 10, currentPage: 0}
      this.$emit('dataChanged', {pagination})
    },
    rowStyle ({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return {
          'background': '#EEFAFA'
        }
      }
    },
    selectName (indexer) {
      const size = 10
      const pagination = {pageSize: size, currentPage: 0}

      this.selectedStudents = this.indexedStudents[indexer]
      const studentIds = Object.keys(this.selectedStudents)
      const searchConditions = {studentIds}
      console.log({searchConditions, pagination})
      this.$emit('dataChanged', {searchConditions, pagination})
    },
    OK () {
      const id = this.id
      const classroomId = this.classroomId
      courseService.removeStudent(classroomId, id).then(() => {
        deleteCallback.success.call(this)
        const size = this.pageSize
        const pagination = {pageSize: size, currentPage: 0}
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
      const pagination = {pageSize: size, currentPage: 0}
      this.$emit('dataChanged', {pagination})
    },
    pageNoChange (pageNO) {
      const size = this.pageSize
      const pagination = {pageSize: size, currentPage: pageNO}
      this.$emit('dataChanged', {pagination})
    }
  },
  mounted () {
    baseService.getClassStudents(this.classId)
      .then(({data}) => {
        this.allStudents = data
        this.indexedStudents = characterUtil.indexNames(this.allStudents)
        this.indexers = Object.keys(this.indexedStudents).sort()
      })
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
