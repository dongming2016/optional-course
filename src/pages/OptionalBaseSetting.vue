<template>
  <div>
    <div class="title">
      选课基础设置
      <div class="right-menu" >
        <el-select @change="selectYear" v-model="selectedSchoolYear">
          <el-option v-for="(item, index) in schoolYears"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
        <el-select style="margin-left:20px;" @change="selectTerm" v-model="selectedTerm">
          <el-option v-for="(item, index) in terms"
          :key="index" :label="item.name" :value="item.id"/>
        </el-select>
      </div>
    </div>
    <div style="width:50%;margin:auto;margin-top:80px;
    border:1px solid #F0F0F0;padding: 60px;">
      <el-form :model="baseSetting" label-width="120px" style="width:40%;margin:auto;" :disabled="disabled">
        <el-form-item required label="选课开始时间" style="margin-bottom:30px;">
          <el-date-picker type="date" placeholder="选择日期" v-model="baseSetting.startDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item required label="选课结束时间" style="margin-bottom:30px;">
          <el-date-picker type="date" placeholder="选择日期" v-model="baseSetting.endDate" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item required label="课程课时（周）" style="margin-bottom:30px;">
          <el-input class="round-input" placeholder="请输入课程课时（周）" v-model="baseSetting.weeks"/>
        </el-form-item>
        <el-form-item required label="每人可退选次数" style="margin-bottom:30px;">
          <el-input class="round-input" placeholder="请输入每人可退选次数" v-model="baseSetting.cancelTimes"/>
        </el-form-item>
        <el-form-item required label="每人限选课程数" style="margin-bottom:0;">
          <el-input  class="round-input" placeholder="请输入每人限选课程数" v-model="baseSetting.limitTimes"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button :disabled="disabled" type="primary" class="OK-button" round  @click="OK">确定</el-button>
      <el-button :disabled="disabled" class="Cancel-button" round @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import baseService from '../service/baseService.js'
import {deleteCallback} from '../common/CommonCallback.js'
export default {
  data () {
    return {
      terms: [],
      schoolYears: [],
      selectedSchoolYear: -1,
      selectedTerm: -1,
      baseSetting: {},
      disabled: false
    }
  },
  methods: {
    selectYear (id) {
      this.terms = this.schoolYears[id].terms
      this.selectedTerm = this.terms[0].id
      this.disabled = !this.terms[0].isCurrent
    },
    selectTerm (id) {
      const term = this.terms.find(element => {
        return element.id === id
      })
      this.disabled = !term.isCurrent
    },
    getSchoolYear () {
      baseService.getSchoolYear()
        .then(({data}) => {
          this.schoolYears = data
          if (data.length > 0) {
            this.selectedSchoolYear = data[0].id
            this.terms = data[0].terms
            this.selectedTerm = this.terms.length > 0 ? this.terms[0].id : {}
            this.disabled = !this.terms[0].isCurrent
            this.getBaseSetting(this.selectedTerm)
          }
        })
    },
    getBaseSetting (termId) {
      baseService.getBaseSetting(termId)
        .then(({data}) => {
          this.baseSetting = data
        })
    },
    OK () {
      baseService.updateBaseSetting(this.baseSetting)
        .then(deleteCallback.success.bind(this))
        .catch(deleteCallback.fail.bind(this))
    },
    cancel () {
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
