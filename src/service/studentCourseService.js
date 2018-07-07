import axios from 'axios'

export default {
  getStudentCourse (studentId, condition) {
    return axios.post(`/backend/optionalCourse/student/${studentId}`, condition)
  },
  getClassCourse (classId, condition) {
    return axios.post(`/backend/optionalCourse/class/${classId}`, condition)
  }
}
