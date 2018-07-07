<template>
<div>
    <div>
    <div style="
    text-align: left;
    width: 90%;
    min-height: 650px;">
    <div class="search-box">
      <div class="search-item">
        <span style="margin-right:10px;">课程编号</span>
        <el-input v-model="searchCondition.courseCode" placeholder="请输入课程编号" style="width:180px;display:inline-block;"/>
      </div>
      <div class="search-item">
        <span style="margin-right:10px;">课程名称</span>
        <el-input v-model="searchCondition.courseName" placeholder="请输入课程名称" style="width:180px;display:inline-block;"/>
      </div>
      <div class="search-item">
        <span style="margin-right:10px;">课程类别</span>
        <el-input v-model="searchCondition.category" placeholder="请输入课程类别" style="width:180px;display:inline-block;"/>
      </div>
      <div class="search-item">
        <span style="margin-right:10px;">任课教师</span>
        <el-input v-model="searchCondition.teacherName" placeholder="请输入任课教师" style="width:180px;display:inline-block;"/>
      </div>
    </div>
    <div>
      <div style="margin-top:18px;text-align:center">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button type="primary" plain @click="reset">重置</el-button>
      </div>
    </div>
    <pagination :totalNumber="optionalCourseData.totalNum"
    @pageSizeChange="sizeChange"/>
     <el-table
      class="student-unselect-table"
    :data="optionalCourseData.datas">
     <el-table-column
      label="课程编号"
      sortable
      prop="courseCode">
    </el-table-column>
    <el-table-column
      label="课程名称"
      sortable
      prop="courseName">
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
      prop="credit"/>
    <el-table-column
      label="适用年级"
      prop="selectConditionStr"/>
    <el-table-column
      label="科目限选"
      prop="courseLimit"/>
    <el-table-column
      label="班级限选"
      prop="classLimit"/>
    <el-table-column
      label="剩余可选人数"
      prop="studentsNum"/>
    <el-table-column
      label="操作" width="350">
      <template slot-scope="props">
        <el-button type="primary" size="mini" @click="slectCourse(props.row.id, props.row.courseName)">选课</el-button>
        <el-button type="primary" size="mini"  @click="showCourseDetail(props.row)">
          查看课程信息
        </el-button>
        <el-button type="primary" size="mini"  @click="showCourseSelectDetail(props.row.id, props.row.courseName)">
          查看选课详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
    style="text-align:center;margin-top:12px;"
    @current-change="pageNoChange"
    :total="optionalCourseData.totalNum"
    :current-page.sync="currentPage"
    :page-sizes="[10, 20, 50]"
    :page-size="pageSize"
    layout="prev, pager, next">
  </el-pagination>
  </div>
      <el-dialog class="edit-classroom-box" :visible.sync="courseVisible">
        <optionalCourseOpenEditBox :classroomDatas="course"
        :isEditable="isEditable"
        />
      </el-dialog>
      <el-dialog title="选课详情" :visible.sync="courseSelectVisible">
        <optionalCourseStudentsTable
        :classroomName="courseName"
        :isStudent="isStudent"
        :tableData="courseStudents"/>
        <div style="text-align:center;">
          <el-button type="primary" @click="courseSelectVisible=false">确定</el-button>
          <el-button type="primary" plain @click="courseSelectVisible=false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import pagination from '../pagination'
import { courseService } from '../../service/courseService.js'
import optionalCourseOpenEditBox from '../optional/optionalCourseOpenEditBox'
import optionalCourseStudentsTable from '../optional/optionalCourseStudentsTable'
export default {
  data () {
    return {
      searchKey: '',
      activeName: 'first',
      isStudent: false,
      isEditable: false,
      courseCode: '',
      courseName: '',
      category: '',
      teacherName: '',
      searchCondition: {},
      course: {},
      selectedDetail: {},
      courseSelectVisible: false,
      courseVisible: false,
      optionalCourseData: {},
      selectedCourse: [
        {className: '美术'}
      ],
      currentPage: 1,
      pageSize: 10,
      courseStudents: {}
    }
  },
  components: {
    optionalCourseOpenEditBox,
    optionalCourseStudentsTable,
    pagination
  },
  methods: {
    search () {
      Object.assign(this.searchCondition, {currentPage: 1})
      this.currentPage = 1
      this.getData()
    },
    reset () {
      this.searchCondition = {currentPage: 1}
      this.currentPage = 1
      this.getData()
    },
    slectCourse (cid, cname) {
      this.$message(`恭喜你选课${cname}成功`)
    },
    showCourseDetail (course) {
      this.courseVisible = true
      console.log(course)
      this.course = course
    },
    showCourseSelectDetail (cid, courseName) {
      this.courseSelectVisible = true
      this.courseName = courseName
      courseService.getCourseStudents(cid)
        .then(({data}) => {
          this.courseStudents = data
        })
    },
    sizeChange (size) {
      this.pageSize = size
      this.currentPage = 1
      const pagination = {pageSize: size, currentPage: 1}
      Object.assign(this.searchCondition, pagination)
      this.getData()
    },
    pageNoChange (pageNO) {
      const size = this.pageSize
      const pagination = {pageSize: size, currentPage: pageNO}
      this.searchCondition = Object.assign(this.searchCondition, pagination)
      this.getData()
    },
    getData () {
      courseService.getClassroom(this.searchCondition)
        .then(({data}) => {
          this.optionalCourseData = data
        })
    }
  },
  mounted () {
    courseService.getClassroom()
      .then(({data}) => {
        this.optionalCourseData = data
      })
  }
}
</script>
<style>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }
  .search-box {
    text-align: left;
    margin: auto;
    padding: 20px;
    border:1px solid #EFEFEF;
  }
  .search-box .el-input__inner {
    width: 220px;;
  }
  .search-item {
    display:inline-block;
    width: 24%;
  }
  .student-unselect-table {
    display: inline-block;
    margin-top:50px;
    border-top:1px solid #EFEFEF;
  }
  .search-item .el-input__inner {
    border-radius: 20px;
  }
  .el-button--primary {
    background: #3DD9C4;
    border-color: #3DD9C4;
    box-shadow: 4px 4px 2px #e7e7e7;
    width: 100px;
    border-radius: 20px
  }
  .el-button--default {
    width: 100px;
    border-radius: 20px
  }
  .el-button--primary:focus, .el-button--primary:hover {
      background: #7EEADD;
      border-color: #7EEADD;
      color: #fff;
  }
  .edit-classroom-box .el-dialog__header {
    border-bottom: 0;
  }
</style>
