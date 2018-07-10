<template>
  <div>
    <div>
      <el-button round @click="addCourse">添加课程</el-button>
      <router-link to="/optional-course-open-manage">
        <el-button round type="primary">开课管理</el-button>
      </router-link>
      <pagination :totalNumber="tableData.total" @pageSizeChange="sizeChange"/>
      <div class="digital-table">
        <el-table style="border-top:1px solid #F4F4F4"
          :data="tableData.records" :row-style="rowStyle">
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
          prop="typeName"/>
          <el-table-column
          label="学科名称"
          sortable
          prop="subjectName"/>
          <el-table-column
          label="课程所属领域"
           prop="domainName"
          sortable>
          </el-table-column>
          <!-- <el-table-column
          label="考核方式"
          prop="testMethod"
          sortable>
          </el-table-column>
          <el-table-column
            label="学分"
            sortable
            prop="credit"/> -->
          <el-table-column v-if="isEditable"
            label="操作" width="250">
            <template slot-scope="props">
              <span class="el-icon-edit table-button table-edit-button" @click="editCourse(props.row)"></span>
              <span class="el-icon-delete table-button table-delete-button" @click="deleteDialogVisible=true;id=props.row.id"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align:center;">
        <el-pagination layout="prev, pager, next"
        :current-page="tableData.currentPage" :page-size="pageSize"
          :total="tableData.total"
          @current-change="pageNoChange"
          ></el-pagination>
      </div>
      <el-dialog :visible.sync="editDialogVisible" :title="editTitle"
      :course="course">
        <optionalCourseEditBox @editInvisible="editCallback" @updateData="updateData"
        :courseData="course" :categories="categories" :isUpdate="isUpdate"
        :subjects="subjects" :domains="domains"/>
      </el-dialog>
      <el-dialog :visible.sync="deleteDialogVisible" title="删除课程">
        <div class="dialog-box-content">
          <div>
            确定删除当前课程？
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
import optionalCourseEditBox from './optionalCourseEditBox'
import {courseService} from '../../service/courseService.js'
import {deleteCallback} from '../../common/CommonCallback.js'
export default {
  props: ['categories', 'subjects', 'domains', 'tableData'],
  components: {
    pagination,
    optionalCourseEditBox
  },
  data () {
    return {
      totalNumber: 0,
      deleteDialogVisible: false,
      id: -1,
      isEditable: true,
      editDialogVisible: false,
      editTitle: '',
      course: {},
      pageSize: 10,
      isUpdate: false
    }
  },
  methods: {
    addCourse () {
      this.editDialogVisible = true
      this.editTitle = '添加课程'
      this.course = {}
      this.isUpdate = false
    },
    editCourse (course) {
      this.editDialogVisible = true
      this.editTitle = '编辑课程'
      this.course = course
      this.isUpdate = true
    },
    editCallback () {
      this.editDialogVisible = false
    },
    updateData () {
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
      courseService.deleteCourse(id).then(() => {
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
</style>
