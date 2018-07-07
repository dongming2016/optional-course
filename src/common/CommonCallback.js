export const deleteCallback = {
  success () {
    this.$message({
      type: 'success',
      center: true,
      message: '删除成功!'
    })
  },
  fail () {
    this.$message({
      type: 'error',
      center: true,
      message: '删除失败!'
    })
  }
}
export const updateCallback = {
  success (successTips) {
    this.$message({
      type: 'success',
      center: true,
      message: successTips
    })
  },
  fail (failTips) {
    this.$message({
      type: 'error',
      center: true,
      message: failTips
    })
  }
}
