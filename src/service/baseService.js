import axios from 'axios'

const eduadmin = '/eduadmin/api'
export default {
  // GET请求
  getSchoolYear (schoolId) {
    // return axios.get('/backend/schoolYear')
    schoolId = 3
    return axios.get(`/baseinfo/api/schoolYear/selectRecordOrderByStartTime/${schoolId}`)
  },
  getTermBySchooYear (schoolYear) {
    return axios.get(`/baseinfo/api/term/getBySchoolYear/${schoolYear}`)
  },
  getDomains () {
    const schoolId = 3
    return axios.get(`${eduadmin}/ocDomain/selectAll?schoolId=${schoolId}`)
  },
  getSubject () {
    return axios.get('/backend/baseSetting/subjects')
  },
  getCategory () {
    const schoolId = 3
    // return axios.get(`/backend/baseSetting/category/${termId}`)
    return axios.get(`${eduadmin}/ocType/selectAll?schoolId=${schoolId}`)
  },
  getTeachers () {
    return axios.get(`/backend/baseSetting/teachers`)
  },
  getGrades () {
    return axios.get(`/backend/baseSetting/grades`)
  },
  getGrades2 () {
    return axios.get(`/backend/baseSetting/grades2`)
  },
  getClass (gradeId) {
    return axios.get(`/backend/baseSetting/class/${gradeId}`)
  },
  // 获取选课的基础设置
  getBaseSetting (termId) {
    // return axios.get(`/backend/baseSetting/optionalSetting/${termId}`)
    return axios.get(`/backend/baseSetting/optionalSetting`)
  },
  getClassStudents (classId) {
    // return axios.get(`/backend/baseSetting/optionalSetting/${termId}`)
    return axios.get(`/backend/baseSetting/all-students/${classId}`)
  },

  // PUT请求
  updateCategory (category) {
    return axios.post(`${eduadmin}/ocType/add`, category)
  },
  addDomain (domain) {
    const schoolId = 3
    const domainName = domain.domainName
    return axios.post(`${eduadmin}/ocDomain/add?schoolId=${schoolId}&domainName=${domainName}`)
  },
  updateDomain (domain) {
    return axios.put(`${eduadmin}/ocDomain/uptName?id=${domain.id}&domainName=${domain.domainName}`)
  },
  updateBaseSetting (optionalSetting) {
    return axios.put(`/backend/baseSetting/optionalSetting`, optionalSetting)
  },

  // 删除请求
  // 删除领域
  deleteCategory (categoryId) {
    // return axios.delete(`/backend/baseSetting/category/${domainId}`)
    return axios.delete(`${eduadmin}/ocType/del/${categoryId}`)
  },
  deleteDomain (domainId) {
    return axios.delete(`${eduadmin}/ocDomain/del/${domainId}`)
  }
}
