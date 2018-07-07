<template>
  <div>
    <div>
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
            <el-table-column
              label="操作"
              width="200"
              >
              <template slot-scope="props">
                <span class="el-icon-view table-button table-edit-button" title="查看详情" @click="viewClassroom(props.row)"></span>
                <span class="el-icon-view table-button table-delete-button" title="查看选课详情" @click="viwStudents(props.row.id, props.row.courseName)"></span>
                <span class="el-icon-edit table-button table-edit-button" title="编辑" @click="editClassroom(props.row)"></span>
              </template>
              </el-table-column>
          </el-table>
        </div>
      <div style="text-align:center;">
        <el-pagination layout="prev, pager, next"
        :current-page="tableData.currentPage" :page-size="pageSize"
          :total="tableData.totalNum"
          @current-change="pageNoChange"
          ></el-pagination>
      </div>
      <el-dialog :visible.sync="editDialogVisible" class="edit-classroom-box">
        <optionalCourseOpenEditBox @editInvisible="editCallback"
        :classroomDatas="classroom" :isEditable="isEdit"/>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import pagination from '../pagination'
import optionalCourseOpenEditBox from './optionalCourseOpenEditBox'
import {courseService} from '../../service/courseService.js'
import {deleteCallback} from '../../common/CommonCallback.js'

export default {
  props: ['tableData', 'termInfo'],
  components: {
    pagination,
    optionalCourseOpenEditBox
  },
  data () {
    return {
      editDialogVisible: false,
      pageSize: 10,
      totalNumber: 0,
      classroomId: -1,
      courseName: '',
      studentId: -1,
      studentName: '',
      classroom: {},
      isEdit: false
    }
  },
  methods: {
    viewClassroom (classroom) {
      this.editDialogVisible = true
      this.classroom = classroom
      this.isEdit = false
    },
    editClassroom (classroom) {
      this.editDialogVisible = true
      this.editTitle = '编辑'
      this.classroom = classroom
      this.isEdit = true
    },
    editCallback () {
      this.editDialogVisible = false
      const pagination = {pageSize: 10, currentPage: 0}
      this.$emit('dataChanged', {pagination})
    },
    viwStudents (classroomId, classroomName) {
      this.$router.push({path: `optional-course-students/${classroomId}/${classroomName}`})
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
.edit-classroom-box .el-dialog__header {
  border: 0;
}
</style>
