<template>
  <div>
    <div class="title">
      选课管理
      <div class="student-tooltip">
        选课时间：{{selectTime.startTime}} 至 {{selectTime.endTime}}
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="选课">
        <StudentUnselectedCourse/>
      </el-tab-pane>
      <el-tab-pane label="已选课程">
        <StudentSelectedCourse/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StudentUnselectedCourse from '../components/student-optional/StudentUnselectedCourse'
import StudentSelectedCourse from '../components/student-optional/StudentSelectedCourse'
export default {
  components: {
    StudentSelectedCourse,
    StudentUnselectedCourse
  },
  data () {
    return {
      selectedSchoolYear: '',
      selectedTerm: '',
      selectTime: {
        startTime: '2018-04-03 00:00:00',
        endTime: '2018-04-06 00:00:00'
      },
      terms: [],
      schoolYears: []
    }
  },
  methods: {
    selectYear (id) {
      this.terms = this.schoolYears[id].terms
      this.selectedTerm = this.terms[0].id
      this.isCurrent = this.selectedTerm.isCurrent
      this.termInfo.schoolYear = this.selectedSchoolYear
      this.termInfo.termId = this.selectedTerm
      this.termInfo.isCurrent = this.isCurrent
    },
    selectTerm (id) {
      const term = this.terms.find(element => {
        return element.id === id
      })
      this.isCurrent = term.isCurrent
      this.termInfo.schoolYear = this.selectedSchoolYear
      this.termInfo.termId = term.termId
      this.termInfo.isCurrent = this.isCurrent
    }
  }
}
</script>

<style scoped>
.title {
  border-left: 8px solid #81EBBD;
  font-weight: 700;
  padding-left: 16px;
  margin-bottom: 20px;
}
.student-tooltip {
  border: 1px solid #EBEBEB;
  color: #FEA378;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 8px;
}
.student-tooltip::before {
  content: " ";
  width: 10px;
  height: 10px;
  border-left:1px solid #EBEBEB;
  border-top:1px solid #EBEBEB;
  position: absolute;
  top: 70px;
  left:103px;
  transform: rotate(-45deg);
  background: #fff;
}
.right-menu {
  display: inline-block;
  float: right;
  margin-right: 30px;
}
.el-input--suffix .el-input__inner {
  border-radius: 20px;
}
.search-box {
  border: 1px solid #f0f0f0;
  margin: 30px 18px 20px 20px;
  padding: 40px 0 20px 0;
}
.el-button--primary {
  background: #3DD9C4;
  border-color: #3DD9C4;
  box-shadow: 4px 4px 2px #e7e7e7;
  width: 100px;
}
.el-button--default {
  width: 100px;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #7EEADD;
    border-color: #7EEADD;
    color: #fff;
}
</style>
