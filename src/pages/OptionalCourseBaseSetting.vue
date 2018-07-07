<template>
  <div>
    <page-component :title="title" :type="type"
     :showSearchBox="showSearchBox">
      <template slot="digital-tabs">
        <el-radio-group v-model="type" style="margin-top:30px;">
          <el-radio-button label="课程类别设置"></el-radio-button>
          <el-radio-button label="选修课所属领域设置"></el-radio-button>
        </el-radio-group>
      </template>
      <template slot="digital-table" slot-scope="scope">
        <div style="margin-top:20px;">
          <optional-category-table :termId="scope.termInfo.termId" style="padding:0 20px;" v-if="type==='课程类别设置'"/>
          <optional-domain-table style="padding:0 20px;" v-if="type==='选修课所属领域设置'"/>
        </div>
      </template>
    </page-component>
  </div>
</template>

<script>
import pageComponent from '../components/pageComponent'
import optionalCategoryTable from '../components/optionalCategoryTable'
import optionalDomainTable from '../components/optionalDomainTable'

export default {
  components: {
    pageComponent,
    optionalCategoryTable,
    optionalDomainTable
  },
  data () {
    return {
      title: '选修课基础信息设置',
      showSearchBox: false,
      type: '课程类别设置',
      totalNumber: 0
    }
  }
}
</script>

<style>
.el-radio-button__inner {
  min-width: 200px;
}
.el-radio-button__inner:hover {
  color: #66E1CF;
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  background: #66E1CF;
  border-color: #66E1CF;
  box-shadow: -1px 0 0 0 #66E1CF;
}
.el-radio-button:first-child .el-radio-button__inner {
  border-radius: 20px 0 0 20px;
}
.el-radio-button:last-child .el-radio-button__inner {
  border-radius: 0 20px 20px 0;
}
.digital-buttons {
  padding: 0 20px;
}
.digital-pagination {
  float: right;
}
.page-select .el-input__inner {
  width: 90px;
}
.el-button.el-button--default{
  color: #41DAC6;
  border-color: #41DAC6;
}
.el-button.el-button--default:focus,
.el-button.el-button--default:hover {
  color: #fff;
  border-color: #41DAC6;
  background: #41DAC6;
}
.optional-base-course .el-dialog {
  width:600px;
}
</style>
