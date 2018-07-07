<template>
  <div>
    <el-button round @click="addDomain" style="width:130px; margin-bottom:20px;">添加所属领域</el-button>
    <el-table :data="domains"
    :header-cell-style="headerStyle"
    class="digital-table"
    :row-style="rowStyle">
      <el-table-column prop="domainName" label="名称"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="el-icon-edit table-button table-edit-button" @click="editDomainData(scope.row)"></span>
          <span class="el-icon-delete table-button table-delete-button" @click="dialogVisible=true;id=scope.row.id"></span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="editDialogVisible" :title="dialogTitle">
      <optional-domain-box :domain="domain" @getData="getDomain" @hideDialog="editDialogVisible=false" :isAdd="isAdd"/>
    </el-dialog>
    <el-dialog class="delete-dialog" title="删除所属领域" :visible.sync="dialogVisible">
      <div class="delete-dialog" style="text-align:center;">
        <div>确定删除该领域？</div>
        <div class="dialog-footer">
          <el-button type="primary" @click="deleteDomain">确定</el-button>
          <el-button @click="dialogVisible=false" class="dialog-cancel">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import baseService from '../service/baseService.js'
import {deleteCallback} from '../common/CommonCallback.js'
import optionalDomainBox from '../components/optional/optionalDomainBox'
export default {
  components: {
    optionalDomainBox
  },
  data () {
    return {
      domains: [],
      headerStyle: {
        'text-align': 'center',
        'border-top': '1px solid #ddd'
      },
      dialogVisible: false,
      editDialogVisible: false,
      id: -1,
      dialogTitle: '',
      domain: {},
      isAdd: true
    }
  },
  methods: {
    addDomain () {
      this.dialogTitle = '添加课程领域'
      this.domain = {}
      this.editDialogVisible = true
      this.isAdd = true
    },
    editDomainData (domain) {
      this.editDialogVisible = true
      this.domain = domain
      this.isAdd = false
      this.dialogTitle = '修改课程所属领域'
    },
    deleteDomain () {
      const id = this.id
      baseService.deleteDomain(id).then(() => {
        deleteCallback.success.call(this)
        this.domains = this.domains.filter(element => {
          return element.id !== id
        })
      })
        .catch(deleteCallback.fail.bind(this))
      this.dialogVisible = false
    },
    rowStyle ({row, rowIndex}) {
      if (rowIndex % 2 === 1) {
        return {
          'background': '#EEFAFA'
        }
      }
    },
    getDomain () {
      baseService.getDomains().then(({data}) => {
        this.domains = data
      })
    }
  },
  mounted () {
    this.getDomain()
  }
}
</script>
