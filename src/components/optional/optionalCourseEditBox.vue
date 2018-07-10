<template>
  <!-- 课程弹框 -->
  <div class="dialog-box-content">
    <div>
      <el-form :model="courseData" :rules="rules" label-width="120px" ref="courseForm">
        <el-form-item  label="课程编号" prop="courseCode">
          <el-input class="round-input" placeholder="请输入课程编号" v-model="courseData.courseCode"
          />
        </el-form-item>
        <el-form-item  label="课程名称" prop="courseName">
          <el-input class="round-input" placeholder="请输入课程名称" v-model="courseData.courseName"
         />
        </el-form-item>
        <el-form-item  label="课程类别" prop="typeId">
          <el-select class="round-input" v-model="courseData.typeId" >
            <el-option v-for="(item, index) in categories"
            :key="index" :label="item.typeName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item  label="学科名称" prop="subjectId">
          <el-select class="round-input" v-model="courseData.subjectId" placeholder="请输入学科名称">
            <el-option v-for="(item, index) in subjects"
            :key="index" :label="item.subjectName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item  label="课程所属领域" prop="domainId">
          <el-select class="round-input" v-model="courseData.domainId"
          placeholder="请输入所属领域">
            <el-option v-for="(item, index) in domains"
            :key="index" :label="item.domainName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <!-- <el-form-item required  label="学分">
          <el-input class="round-input" placeholder="请输入学分" v-model="courseData.credit"/>
        </el-form-item>
        <el-form-item required  label="考核方式">
          <el-input class="round-input" placeholder="请输入考核方式" v-model="courseData.testMethod"/>
        </el-form-item> -->
      </el-form>
      <div class="dilalog-note">
        备注：
        <span class="red-star">*</span>为必须项
      </div>
    </div>
    <div class="dialog-footer">
      <el-button type="primary" round class="OK-button" @click="courseOK">确定</el-button>
      <el-button round class="Cancel-button" @click="courseCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import {courseService} from '../../service/courseService.js'
import {updateCallback} from '../../common/CommonCallback.js'
const courseValidatorGenerator = (name, aditionalCheck, key) => {
  const queryParam = {key: ''}
  return (rule, value, callback) => {
    if (!value) {
      callback(new Error(`${name}不能为空`))
    }
    if (aditionalCheck) {
      queryParam[key] = value
      courseService.isCourseExist(queryParam)
        .then(({data}) => {
          if (data) {
            callback(new Error(`当前${name}重复`))
          } else {
            callback()
          }
        })
    }
  }
}
const courseCodeValidator = courseValidatorGenerator('课程编号', true, 'courseCode')
const courseNameValidator = courseValidatorGenerator('课程名称', true, 'courseName')
const typeIdValidator = courseValidatorGenerator('课程类别', false)
const subjectIdValidator = courseValidatorGenerator('学科名称', false)
const domainIdValidator = courseValidatorGenerator('课程所属领域', false)
export default {
  props: ['categories', 'subjects', 'domains', 'courseData', 'isUpdate'],
  data () {
    return {
      rules: {
        courseCode: [
          {required: true, validator: courseCodeValidator, trigger: 'blur'}
        ],
        courseName: [
          {required: true, validator: courseNameValidator, trigger: 'blur'}
        ],
        typeId: [
          {required: true, validator: typeIdValidator, trigger: 'blur'}
        ],
        subjectId: [
          {required: true, validator: subjectIdValidator, trigger: 'blur'}
        ],
        domainId: [
          {required: true, validator: domainIdValidator, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submit () {
      if (!this.isUpdate) {
        courseService.isCourseExist(this.courseData).then(({data}) => {
          if (data.code === 1) {
            console.log(data.msg)
          } else {
            courseService.addCourse(this.courseData)
              .then(({data}) => {
                if (data.code === 0) {
                  updateCallback.success.call(this, '添加成功')
                } else {
                  updateCallback.fail.call(this, `添加失败,原因：${data.msg}`)
                }
                this.$emit('updateData')
              })
              .catch(err => {
                console.error(err)
                updateCallback.fail.call(this, '添加失败')
                this.$emit('updateData')
              })
          }
        })
      } else {
        courseService.updateCourse(this.courseData)
          .then(({data}) => {
            if (data.code === 0) {
              updateCallback.success.call(this, '更新成功')
            } else {
              updateCallback.fail.call(this, `更新失败,${data.msg}`)
            }
            this.$emit('updateData')
          })
          .catch(err => {
            console.error(err)
            updateCallback.fail.call(this, '更新失败')
            this.$emit('updateData')
          })
      }
      this.$emit('editInvisible')
      return true
    },
    courseOK () {
      this.submit()
      // this.$refs.courseForm.validate((valid) => {
      //   if (valid) {
      //     this.submit()
      //   } else {
      //     console.error('error submit!!')
      //     return false
      //   }
      // })
    },
    courseCancel () {
      this.$emit('editInvisible')
    }
  }
}
</script>

<style>
.dilalog-note {
  width: 440px;
  margin: auto;
  padding-top: 8px;
  border-top: 1px solid #DADADA;
  text-align: left;
  color: #DADADA;
  text-indent: 10px;
}
</style>
