import axios from 'axios'

export default {
  getTeacherCourse (teacherId, condition) {
    return axios.post(`/backend/optionalCourse/teacher/${teacherId}`, condition)
  }
}
