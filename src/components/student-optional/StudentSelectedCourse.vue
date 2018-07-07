<template>
<div>
    <div>
    <div style="display: inline-block;
    text-align: left;
    width: 90%;
    min-height: 650px;">
     <el-table
     style="display: inline-block;margin: 8px 2%;"
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
        <el-button type="primary" size="mini" @click="unslectCourse(props.row.id, props.row.courseName)">退课</el-button>
        <span style="line-height: 23px;" class="el-icon-view table-button table-edit-button" title="查看课程信息" @click="showCourseDetail(props.row)"></span>
        <el-button type="primary" size="mini"  @click="showCourseSelectDetail(props.row.id, props.row.className)">
          查看选课详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
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
import { courseService } from '../../service/courseService.js'
import optionalCourseOpenEditBox from '../optional/optionalCourseOpenEditBox'
import optionalCourseStudentsTable from '../optional/optionalCourseStudentsTable'
export default {
  data () {
    return {
      searchKey: '',
      currentTime: new Date().getMilliseconds(),
      startTime: new Date('2018-03-04').getMilliseconds(),
      endTime: new Date('2018-07-05').getMilliseconds(),
      activeName: 'first',
      isStudent: false,
      courseVisible: false,
      courseSelectVisible: false,
      course: {},
      isEditable: false,
      isClassroomEditable: false,
      selectedDetail: {},
      optionalCourseData: [
      ],
      selectedCourse: [
      ],
      courseName: '',
      currentPage: 2,
      courseStudents: {}
    }
  },
  components: {
    optionalCourseOpenEditBox,
    optionalCourseStudentsTable
  },
  methods: {
    unslectCourse (cid, cname) {
      this.$alert(`确认退选${cname}`, '退选', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          this.$message({
            type: 'success',
            message: `恭喜你，退选${cname}成功！`
          })
        }
      })
    },
    showCourseDetail (course) {
      this.courseVisible = true
      this.course = course
    },
    showCourseSelectDetail (cid, courseName) {
      this.courseSelectVisible = true
      this.cid = cid
      this.courseName = courseName
      courseService.getCourseStudents(cid)
        .then(({data}) => {
          this.courseStudents = data
        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
  .edit-classroom-box .el-dialog__header {
    border-bottom: 0;
  }
</style>
