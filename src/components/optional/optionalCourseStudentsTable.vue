<template>
  <div>
    <div>
      课程名称：
      <el-button round>{{classroomName}}</el-button>
      <pagination :totalNumber="tableData.totalNum" @pageSizeChange="sizeChange"/>
      <div class="digital-table">
        <el-table style="border-top:1px solid #F4F4F4"
          :data="tableData.datas" :row-style="rowStyle">
          <el-table-column
            label="姓名"
            sortable>
            <template slot-scope="scope">
              <div style="cursor:pointer;color:#56D3C5;"
              @click="$router.push(`/student-optional-course/${scope.row.id}/${scope.row.name}/${termInfo.schoolYear}/${termInfo.termId}`)">
                {{scope.row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender">
          </el-table-column>
          <el-table-column
          label="年级"
          sortable
          prop="grade"/>
          <el-table-column
          label="班级"
          sortable
          prop="class"/>
          <el-table-column v-if="termInfo.isCurrent && !isStudent"
            label="操作" width="250">
            <template slot-scope="props">
              <div class="remove-button" @click="id=props.row.id;deleteDialogVisible=true">
                <span class="el-icon-minus table-button table-edit-button" style="width:12px;height:12px;line-height: 12px;">
                </span>
                <span class="table-edit-button" style="border:0;">
                  移出课堂
                </span>
              </div>
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
      <el-dialog :visible.sync="deleteDialogVisible" title="移出学生">
        <div class="dialog-box-content">
          <div>
            确定将该生从该课堂移出？
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
  props: {tableData: Object,
    classroomName: String,
    termInfo: {
      default () {
        return {}
      }
    },
    isStudent: {
      default () {
        return false
      }
    }},
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
      courseName: ''
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
