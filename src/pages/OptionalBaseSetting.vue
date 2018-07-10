<template>
  <div>
    <div class="title">
      选课基础设置
      <div class="right-menu" >
        <el-select v-model="selectedSchoolYear">
          <el-option v-for="(item, index) in schoolYears"
          :key="index" :label="item.schoolYear" :value="item.id"/>
        </el-select>
        <el-select style="margin-left:20px;" @change="selectTerm" v-model="selectedTerm">
          <el-option v-for="(item, index) in terms"
          :key="index" :label="item.termName" :value="item.id"/>
        </el-select>
      </div>
    </div>
    <div style="width:50%;margin:auto;margin-top:80px;
    border:1px solid #F0F0F0;padding: 60px;">
      <el-form :model="baseSetting" label-width="120px" style="width:40%;margin:auto;" :disabled="!isCurrent">
        <el-form-item required label="选课开始时间" style="margin-bottom:30px;">
          <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" :picker-options="startPickerOptions"
          value-format="yyyy-MM-dd HH:mm:ss" v-model="baseSetting.startDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item required label="选课结束时间" style="margin-bottom:30px;">
          <el-date-picker type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" v-model="baseSetting.endDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item required label="课程课时（周）" style="margin-bottom:30px;">
          <el-input class="round-input" type="number" placeholder="请输入课程课时（周）" v-model="baseSetting.defaultWeekNum"/>
        </el-form-item>
        <el-form-item required label="每人可退选次数" style="margin-bottom:30px;">
          <el-input class="round-input" type="number" placeholder="请输入每人可退选次数" v-model="baseSetting.outNum"/>
        </el-form-item>
        <el-form-item required label="每人限选课程数" style="margin-bottom:0;">
          <el-input  class="round-input" type="number" placeholder="请输入每人限选课程数" v-model="baseSetting.limitNum"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button :disabled="!isCurrent" type="primary" class="OK-button" round  @click="OK">确定</el-button>
      <el-button :disabled="!isCurrent" class="Cancel-button" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import baseService from '../service/baseService.js'
import {updateCallback} from '../common/CommonCallback.js'
export default {
  data () {
    return {
      terms: [],
      schoolYears: [],
      selectedSchoolYear: '',
      selectedTerm: '',
      baseSetting: {},
      isCurrent: false,
      startPickerOptions: {
        disabledDate (time) {
          return time.getTime() <= Date.now()
        }
      }
    }
  },
  watch: {
    selectedSchoolYear (newVal, oldVal) {
      baseService.getTermBySchooYear(newVal)
        .then(({data}) => {
          data = data.data
          this.terms = data
          if (data.length > 0) {
            const currentTerm = data.filter(element => {
              return element.isCurrent
            })
            if (currentTerm.length > 1) {
              throw new Error('get current year error')
            } else if (currentTerm.length === 1) {
              this.selectedTerm = currentTerm[0].id
              this.isCurrent = currentTerm[0].isCurrent
            } else {
              this.selectedTerm = data[0].id
              this.isCurrent = false
            }
            this.getBaseSetting(this.selectedTerm)
          } else {
            throw new Error('no term')
          }
        })
    }
  },
  methods: {
    selectYear (id) {
      this.selectedTerm = this.terms[0].id
    },
    selectTerm (id) {
      const term = this.terms.find(element => {
        return element.id === id
      })
      this.isCurrent = term.isCurrent
      this.getBaseSetting(this.selectedTerm)
    },
    disabledDate (time) {
      return time.getTime() < Date.now()
    },
    getSchoolYear () {
      baseService.getSchoolYear()
        .then(({data}) => {
          data = data.data
          this.schoolYears = data
          if (data.length > 0) {
            const currentYear = data.filter(element => {
              return element.isCurrent
            })
            if (currentYear.length !== 1) {
              throw new Error('get current year error')
            }
            this.selectedSchoolYear = currentYear[0].id
          }
        })
    },
    getBaseSetting (termId) {
      const isCurrent = this.isCurrent
      // 将字符串的日期转化为Date对象
      const transformDate = (baseSetting) => {
        if (baseSetting.startDate) {
          baseSetting.startDate = new Date(baseSetting.startDate)
        }
        if (baseSetting.endDate) {
          baseSetting.endDate = new Date(baseSetting.endDate)
        }
      }
      baseService.getBaseSetting(termId)
        .then(({data}) => {
          this.baseSetting = data
          // 如果没有设定基本信息，则先生成一条默认的基本信息
          if (!this.baseSetting) {
            this.baseSetting = {schoolId: 3, termId}
            if (isCurrent) {
              this.OK(true)
            }
          } else {
            transformDate(this.baseSetting)
          }
        })
    },
    OK (isNew = false) {
      this.baseSetting.defaultWeekNum = parseInt(this.baseSetting.defaultWeekNum)
      this.baseSetting.limitNum = parseInt(this.baseSetting.limitNum)
      this.baseSetting.outNum = parseInt(this.baseSetting.outNum)
      baseService.updateBaseSetting(this.baseSetting)
        .then(({data}) => {
          if (!isNew) {
            if (data.code === 0) {
              updateCallback.success.call(this, '更新设置成功!')
            } else {
              updateCallback.fail.call(this, `更新设置失败!原因：${data.msg}`)
            }
          }
        })
        .catch(({data}) => {
          updateCallback.fail.call(this, '更新设置失败！')
        })
    },
    cancel () {
      // 重置将获取先前的设置
      this.getBaseSetting(this.selectedTerm)
    }
  },
  mounted () {
    this.getSchoolYear()
  }
}
</script>

<style lang="postcss">
.title {
  border-left: 8px solid #81EBBD;
  font-weight: 700;
  padding-left: 16px;
  margin-bottom: 20px;
}
.right-menu {
  display: inline-block;
  float: right;
  margin-right: 30px;
}
.el-input--suffix .el-input__inner {
  border-radius: 20px;
}
.round-input input {
  border-radius: 20px;
}
.footer {
  text-align: center;
  margin-top: 40px;
}
.OK-button {
  background: #1FC4B1;
  width: 100px;
  border: none;
  margin-right: 20px;
  box-shadow: 2px 4px 4px #E7E7E7;
}
.Cancel-button {
  background: #fff;
  width: 100px;
  border: 1px solid #CECECE;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #7EEADD;
    border-color: #7EEADD;
    color: #fff;
}
.OK-button.is-disabled {
  background: #7EEADD;
  border-color: #7EEADD;
  color: #fff;
}
</style>
