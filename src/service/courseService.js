import axios from 'axios'
export const courseService = {
  // get请求
  getCourse (condition) {
    return axios.post('/backend/optionalCourse/conditional-course', condition)
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
    return axios.delete(`/backend/optionalCourse/course/${courseId}`)
  },
  deleteClassroom (classroomId) {
    return axios.delete(`/backend/optionalCourse/classroom/${classroomId}`)
  },
  removeStudent (classroomId, studentId) {
    return axios.delete(`/backend/optionalCourse/students/${classroomId}/${studentId}`)
  },

  updateCourse (course) {
    return axios.put(`/backend/optionalCourse/course`, course)
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
