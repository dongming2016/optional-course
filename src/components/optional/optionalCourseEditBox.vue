<template>
  <!-- 课程弹框 -->
  <div class="dialog-box-content">
    <div>
      <el-form :model="courseData" label-width="120px">
        <el-form-item required  label="课程编号">
          <el-input class="round-input" placeholder="请输入课程编号" v-model="courseData.courseCode"/>
        </el-form-item>
        <el-form-item required  label="课程名称">
          <el-input class="round-input" placeholder="请输入课程名称" v-model="courseData.courseName"/>
        </el-form-item>
        <el-form-item required  label="课程类别">
          <el-select class="round-input" v-model="courseData.typeId">
            <el-option v-for="(item, index) in categories"
            :key="index" :label="item.typeName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item required  label="学科名称">
          <el-select class="round-input" v-model="courseData.subjectId" placeholder="请输入学科名称">
            <el-option v-for="(item, index) in subjects"
            :key="index" :label="item.subjectName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item required  label="课程所属领域">
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
export default {
  props: ['categories', 'subjects', 'domains', 'courseData', 'isUpdate'],
  data () {
    return {
    }
  },
  methods: {
    courseOK () {
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
