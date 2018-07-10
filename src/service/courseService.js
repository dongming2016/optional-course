import axios from 'axios'
const schoolId = 3
const eduadmin = '/eduadmin/api'
export const courseService = {
  // get请求
  getCourse (condition) {
    condition.schoolId = 3
    return axios.get(`${eduadmin}/ocCourseBase/selectPage/${condition.currentPage}/${condition.pageSize}`, {params: condition})
  },
  isCourseExist (course) {
    course.schoolId = 3
    return axios.get(`${eduadmin}/ocCourseBase/selectExist`, {params: course})
  },
  // 获取课堂信息
  getClassroom (condition) {
    return axios.post('/backend/optionalCourse/classroom', condition)
  },
  // 获取课堂学生
  getCourseStudents (condition) {
    return axios.post(`/backend/optionalCourse/students/${condition.classroomId}`, condition)
  },

  deleteCourse (courseId) {
    return axios.delete(`${eduadmin}/ocCourseBase/del/${courseId}`)
  },
  deleteClassroom (classroomId) {
    return axios.delete(`/backend/optionalCourse/classroom/${classroomId}`)
  },
  removeStudent (classroomId, studentId) {
    return axios.delete(`/backend/optionalCourse/students/${classroomId}/${studentId}`)
  },

  addCourse (course) {
    course.schoolId = 3
    return axios.post(`${eduadmin}/ocCourseBase/add?schoolId=${schoolId}&courseName=${course.courseName}&courseCode=${course.courseCode}&typeId=${course.typeId}&subjectId=${course.subjectId}&domainId=${course.domainId}`)
  },

  updateCourse (course) {
    return axios.put(`${eduadmin}/ocCourseBase/upt`, {}, {params: course})
  },
  updateClassroom (classroom) {
    const formData = classroom.image || new FormData()
    for (let key in classroom) {
      if (Object.prototype.hasOwnProperty.call(classroom, key)) {
        formData.append(key, classroom[key])
      }
    }
    const config = {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    return axios.put(`/backend/optionalCourse/classroom`, formData, config)
  }
}
