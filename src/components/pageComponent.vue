<template>
  <div>
    <div class="title">
      {{title}}
      <div class="right-menu" v-if="rightMenuSettings.showRight">
        <el-select @change="selectYear" v-model="selectedSchoolYear">
          <el-option v-for="(item, index) in schoolYears"
          :key="index" :label="item.schoolYear" :value="item.id"/>
        </el-select>
        <el-select @change="selectTerm" style="margin-left:20px;" v-model="selectedTerm"
        >
          <el-option v-for="(item, index) in terms"
          :key="index" :label="item.termName" :value="item.id"/>
        </el-select>
        <el-button style="margin-left:20px;" type="text" v-if="rightMenuSettings.showBackbutton">
          返回
        </el-button>
      </div>
    </div>
    <div v-if="showSearchBox">
      <div class="search-box">
        <slot name="search" :search="search" :reset="reset"
        :schoolYears="schoolYears" :termInfo="termInfo"></slot>
      </div>
      <div style="text-align:center;">
        <el-button type="primary" round @click="search=!search">
          查询
        </el-button>
        <el-button round @click="reset=!reset">
          重置
        </el-button>
      </div>
    </div>
    <div style="text-align:center;clear:both;">
      <slot name="digital-tabs" :termInfo="termInfo"></slot>
    </div>
    <div>
      <slot name="digital-buttons" style="margin:40px 20px;" :termInfo="termInfo"></slot>
    </div>
    <div style="margin:40px 20px;">
      <slot name="digital-table" style="text-align:center;clear:both;" :termInfo="termInfo"></slot>
    </div>
  </div>
</template>

<script>
import baseService from '../service/baseService.js'
export default {
  props: {
    title: String,
    rightMenuSettings: {
      default () {
        return {}
      }
    },
    type: String,
    showSearchBox: {
      default () {
        return true
      }
    }
  },
  data () {
    return {
      terms: [],
      schoolYears: [],
      selectedSchoolYear: '',
      selectedTerm: '',
      isCurrent: false,
      termInfo: {},
      search: false,
      reset: false
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
              this.isCurrent = true
            } else {
              this.selectedTerm = data[0].id
              this.isCurrent = false
            }

            this.termInfo.schoolYear = this.selectedSchoolYear
            this.termInfo.termId = this.selectedTerm
            this.termInfo.isCurrent = this.isCurrent
          }
        })
    }
  },
  methods: {
    selectYear (id) {
      // this.terms = this.schoolYears[id].terms
      this.selectedTerm = this.terms[0].id
    },
    selectTerm (id) {
      const term = this.terms.find(element => {
        return element.id === id
      })
      this.isCurrent = term.isCurrent
      this.termInfo.schoolYear = this.selectedSchoolYear
      this.termInfo.termId = term.termId
      this.termInfo.isCurrent = this.isCurrent
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
            // this.terms = data[0].terms
            // this.selectedTerm = this.terms.length > 0 ? this.terms[0].id : {}
            // this.isCurrent = this.terms[0].isCurrent
            // this.termInfo.schoolYear = this.selectedSchoolYear
            // this.termInfo.termId = this.selectedTerm
            // this.termInfo.isCurrent = this.isCurrent
          }
        })
    }
  },
  created () {
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
