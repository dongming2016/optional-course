<template>
  <div>
    <el-form inline :model="classroomDatas" label-width="180px">
      <el-form-item required  label="课程编号:">
        <span v-if="!isCreate">{{classroomDatas.courseCode}}</span>
        <el-input v-else class="round-input" placeholder="请输入课程编号" v-model="classroomDatas.courseCode"/>
      </el-form-item>
      <el-form-item required  label="课程名称:">
          <span v-if="!isCreate">{{classroomDatas.courseName}}</span>
        <el-input v-else class="round-input" placeholder="请输入课程名称" v-model="classroomDatas.courseName"/>
      </el-form-item>
      <el-form-item required  label="课程类别:">
        <span v-if="!isCreate">{{classroomDatas.category}}</span>
        <el-select v-else disabled class="round-input" v-model="classroomDatas.category">
          <el-option v-for="(item, index) in categories"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item required  label="学科名称:">
        <span v-if="!isCreate">{{classroomDatas.subject}}</span>
        <el-select v-else disabled class="round-input" v-model="classroomDatas.subject" placeholder="请输入学科名称">
          <el-option v-for="(item, index) in subjects"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item required  label="课程所属领域:">
        <span v-if="!isCreate">{{classroomDatas.courseDomain && classroomDatas.courseDomain.name}}</span>
        <el-select v-else disabled class="round-input" v-model="classroomDatas.courseDomain.name"
        placeholder="请输入所属领域">
          <el-option v-for="(item, index) in domains"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item required  label="任课老师:">
        <span v-if="!isEditable">{{classroomDatas.teacherName}}</span>
        <el-select v-else class="round-input" v-model="classroomDatas.teacherId">
          <el-option v-for="(item, index) in teachers"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item required  label="上课时间:">
        <span v-if="!isEditable">{{classroomDatas.timeStr}}</span>
        <el-input v-else class="round-input" @focus="showTime=true" v-model="classroomDatas.timeStr"/>
        <div class="select-time" v-show="showTime">
          <clock @setTime="setTime"/>
          <div class="button-container">
            <el-button type="text" class="OK" @click="OK">确定</el-button>
            <el-button type="text" class="Cancel" @click="Cancel">取消</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item required  label="学分:">
        <span v-if="!isEditable">{{classroomDatas.credit}}</span>
        <el-input v-else class="round-input" placeholder="请输入学分" type="number" v-model="classroomDatas.credit"/>
      </el-form-item>
      <el-form-item required  label="学生选修条件:">
        <span v-if="!isEditable">{{classroomDatas.selectConditionStr}}</span>
        <el-input v-else @focus="gradeVisible=true" ref="gradeInput" class="round-input" placeholder="请输入学生选修条件" v-model="classroomDatas.selectConditionStr"/>
        <div v-show="gradeVisible" class="grade-panel" ref="gradePanel">
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="checkedGrades" @change="handleCheckedGradesChange">
            <el-checkbox v-for="grade in grades" :label="grade" :key="grade">{{grade}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item required  label="学期课时安排:">
        <span v-if="!isEditable">{{classroomDatas.totalHours}}</span>
        <el-input v-else class="round-input" v-model="classroomDatas.totalHours" placeholder="请输入课时安排"/>
      </el-form-item>
      <el-form-item required  label="上课周数:">
        <span v-if="!isEditable">{{classroomDatas.weeks}}</span>
        <el-input v-else class="round-input" placeholder="请输入上课周数" type="number" v-model="classroomDatas.weeks"/>
      </el-form-item>
      <el-form-item required  label="场地:">
        <span v-if="!isEditable">{{classroomDatas.site}}</span>
        <el-input v-else class="round-input" placeholder="请输入场地" v-model="classroomDatas.site"/>
      </el-form-item>
      <el-form-item required  label="考核要求:">
        <span v-if="!isEditable">{{classroomDatas.testMethod}}</span>
        <el-input v-else class="round-input" placeholder="请输入考核要求" v-model="classroomDatas.testMethod"/>
      </el-form-item>
      <el-form-item required  label="科目限选人数:">
        <span v-if="!isEditable">{{classroomDatas.courseLimit}}</span>
        <el-input v-else class="round-input" placeholder="请输入科目限选人数" type="number" v-model="classroomDatas.courseLimit"/>
      </el-form-item>
      <el-form-item required  label="每班限选人数:">
        <span v-if="!isEditable">{{classroomDatas.classLimit}}</span>
        <el-input v-else class="round-input" placeholder="请输入每班限选人数" type="number" v-model="classroomDatas.classLimit"/>
      </el-form-item>
      <el-form-item class="dialog-image" label="课程相关图片:">
        <span v-if="!isEditable">
          <img :src="classroomDatas.image"></span>
        <div v-else style="display:flex;">
          <div class="el-icon-plus img-add-button" @click="addImg"></div>
          <input type="file" style="display:none;" ref="courseImage" @change="setImage" accept="image/*"/>
          <img ref="previewImg" v-show="imgPreviewVisible" style="width:150px;height:80px;margin-left:10px;"/>
        </div>
      </el-form-item>
      <el-form-item class="dialog-desc" label="课程简介:">
        <span v-if="!isEditable">{{classroomDatas.courseIntroduce}}</span>
        <el-input v-else
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 6}"
          placeholder="请输入内容"
          v-model="classroomDatas.courseIntroduce"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {courseService} from '../../service/courseService.js'
import baseService from '../../service/baseService.js'
import {updateCallback} from '../../common/CommonCallback.js'
import clock from '../clock/clock'
import { CENTERT_TEXTS, localeWeekDay } from '../clock/const.js'
export default {
  components: {
    clock
  },
  props: ['categories', 'subjects', 'isCreate', 'isEditable',
    'domains', 'teachers', 'classroomDatas', 'isUpdate'],
  data () {
    return {
      gradeVisible: false,
      grades: [],
      checkedGrades: [],
      checkAll: false,
      showTime: false,
      times: [],
      imgPreviewVisible: false
    }
  },
  methods: {
    classroomOK () {
      const successTips = this.isUpdate ? '更新成功' : '添加成功'
      const failTips = this.isUpdate ? '更新失败' : '添加失败'
      courseService.updateClassroom(this.classroomDatas)
        .then(() => {
          updateCallback.success.call(this, successTips)
        })
        .catch(updateCallback.fail.call(this, failTips))
      this.$emit('editInvisible')
    },
    classroomCancel () {
      this.$emit('editInvisible')
    },
    handleCheckAllChange (val) {
      this.checkedGrades = val ? this.grades : []
    },
    handleCheckedGradesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.grades.length
    },
    setImage () {
      const file = this.$refs.courseImage.files[0]
      if (!file) {
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        var img = this.$refs.previewImg
        img.src = event.target.result
      }

      const formData = new FormData()
      formData.append('photos', file)
      this.classroomDatas.image = formData
      this.imgPreviewVisible = true
    },
    setTime ({day, time, clicked}) {
      if (clicked) {
        this.times.push({day, time})
      } else {
        this.times = this.times.filter(element => {
          return element.day !== day || element.time !== time
        })
      }

      let timeStr = ''
      this.times.forEach(element => {
        timeStr += localeWeekDay(element.day, 0) + CENTERT_TEXTS[element.time] + ' '
      })
      this.classroomDatas.timeStr = timeStr
    },
    OK () {
      this.showTime = false
    },
    Cancel () {
      this.showTime = false
    },
    addImg () {
      this.$refs.courseImage.click()
    }
  },
  watch: {
    checkedGrades (newVal, oldVal) {
      this.classroomDatas.selectConditionStr = newVal && newVal.join(',')
    }
  },
  mounted () {
    baseService.getGrades()
      .then(({data}) => {
        this.grades = data
        if (this.classroomDatas.selectConditionStr) {
          this.checkedGrades = this.classroomDatas.selectConditionStr.split(',')
        }
      })
    const gradePanel = this.$refs.gradePanel
    const gradeInput = this.$refs.gradeInput.$el
    const that = this
    document.addEventListener('click', function (e) {
      const result = e.path.filter(element => {
        return element === gradePanel || element === gradeInput
      })
      if (!result.length) {
        that.gradeVisible = false
      }
    })
  }
}
</script>

<style>
.dialog-box-content .el-form--inline .el-form-item {
  width: 46%;
}
.el-form--inline .el-form-item.dialog-image {
  display: block;
  width: 100%;
}
.dialog-box-content .el-form--inline .dialog-desc {
  width: 100%;
}
.dialog-box-content .dialog-image .el-form-item__content {
  width: 500px;
}
.dialog-box-content .el-form--inline .dialog-desc .el-form-item__content {
  width: 75%;
}
.open-course {
  text-align: left;
}
.grade-panel {
  position: absolute;
  background: #fff;
  margin-top: 4px;
  z-index: 2;
  border: 1px solid #F7F7F7;
  padding: 20px;
  width: 230px;
  border-radius: 8px;
}
.grade-panel .el-checkbox-group .el-checkbox {
  margin-left: 0;
  margin-right: 10px;
}
.dialog-box-content .round-input input {
  width:270px;
}
.select-time {
  position: absolute;
  z-index: 2;
  background: #fff;
  left: calc(50% - 100px);
  margin: auto;
  margin-top: 2px;
}
.button-container {
  text-align:right;
  margin-right:20px;
}
.img-add-button {
  font-size: 78px;
  color: #E1E1E1;
  border: 1px solid #E1E1E1;
  box-sizing: border-box;
}
</style>
