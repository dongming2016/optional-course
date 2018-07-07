<template>
  <div>
    <div>
      <el-button round @click="addClassroom">添加课堂</el-button>
      <pagination :totalNumber="tableData.totalNum" @pageSizeChange="sizeChange"/>
      <div class="digital-table">
        <el-table style="border-top:1px solid #F4F4F4"
          :data="tableData.datas" :row-style="rowStyle">
          <el-table-column
            label="课程编号"
            sortable
            prop="courseCode"/>
          <el-table-column
            label="课程名称"
            sortable
            prop="courseName">
          </el-table-column>
          <el-table-column
          label="所属类别"
          sortable
          prop="category"/>
          <el-table-column
            label="学科名称"
            sortable
            prop="subject"/>
          <el-table-column
            label="课程所属领域"
            sortable>
            <template slot-scope="scope">
              {{scope.row.courseDomain.name}}
            </template>
          </el-table-column>
          <el-table-column
            label="任课老师"
            sortable
            prop="teacherName"/>
          <el-table-column
            label="上课周数"
            sortable
            prop="weekNum"/>
          <el-table-column
            label="上课时间"
            prop="timeStr"/>
            <el-table-column
            label="学生选修条件"
            prop="selectConditionStr"/>
          <el-table-column v-if="isEditable"
            label="操作" width="250">
            <template slot-scope="props">
              <span class="el-icon-view table-button table-edit-button" title="查看详情" @click="viewClassroom(props.row)"></span>
              <span class="el-icon-view table-button table-delete-button" title="查看选课详情" @click="viwStudents(props.row.id, props.row.courseName)"></span>
              <span class="el-icon-edit table-button table-edit-button" title="编辑" @click="editClassroom(props.row)"></span>
              <span class="el-icon-delete table-button table-delete-button" title="删除" @click="deleteDialogVisible=true;id=props.row.id"></span>
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
        :classroomDatas="classroom" :categories="categories"
        :subjects="subjects" :domains="domains" :isCreate="isCreate"
        :isEditable="isEdit" :teachers="teachers"/>
      </el-dialog>
      <el-dialog :visible.sync="deleteDialogVisible" title="删除课堂">
        <div class="dialog-box-content">
          <div>
            确定删除当前课堂？
          </div>
          <div class="dialog-footer">
            <el-button type="primary" round class="OK-button" @click="OK">确定</el-button>
            <el-button round class="Cancel-button" @click="Cancel">取消</el-button>
          </div>
        </div>
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
  props: ['categories', 'subjects', 'domains', 'teachers', 'tableData'],
  components: {
    pagination,
    optionalCourseOpenEditBox
  },
  data () {
    return {
      totalNumber: 0,
      deleteDialogVisible: false,
      id: -1,
      isEditable: true,
      editDialogVisible: false,
      editTitle: '',
      classroom: {},
      pageSize: 10,
      isEdit: false,
      isCreate: false
    }
  },
  methods: {
    addClassroom () {
      this.editDialogVisible = true
      this.editTitle = '添加课堂'
      this.classroom = {courseDomain: {}, plans: []}
      this.isCreate = true
      this.isEdit = true
    },
    viewClassroom (classroom) {
      this.editDialogVisible = true
      this.classroom = classroom
      this.isCreate = false
      this.isEdit = false
    },
    viwStudents (classroomId, classroomName) {
      this.$router.push({path: `optional-course-students/${classroomId}/${classroomName}`})
    },
    editClassroom (classroom) {
      this.editDialogVisible = true
      this.editTitle = '编辑'
      this.classroom = classroom
      this.isCreate = false
      this.isEdit = true
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
    OK () {
      const id = this.id
      courseService.deleteClassroom(id).then(() => {
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
          deleteCallback.fail.call(this)
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
.edit-classroom-box .el-dialog__header {
  border-bottom: 0;
}
</style>
