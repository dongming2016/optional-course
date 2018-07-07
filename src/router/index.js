import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import test from '@/pages/test'
import OptionalCourseBaseSetting from '@/pages/OptionalCourseBaseSetting.vue'
import OptionalBaseSetting from '@/pages/OptionalBaseSetting'
import OptionalCourseManage from '@/pages/OptionalCourseManage'
import OptionalCourseOpenManage from '@/pages/OptionalCourseOpenManage'
import OptionalCourseStudents from '@/pages/OptionalCourseStudents'
import StudentOptionalCourse from '@/pages/StudentOptionalCourse'
import ClassOptionalCourse from '@/pages/ClassOptionalCourse'
import TeacherOptionalCourse from '@/pages/TeacherOptionalCourse'
import StudentSelectCourse from '@/pages/StudentSelectCourse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/optional-course-base-setting',
      name: 'optional-course-base-setting',
      component: OptionalCourseBaseSetting
    },
    {
      path: '/optional-base-setting',
      name: 'optional-base-setting',
      component: OptionalBaseSetting
    },
    {
      path: '/optional-course-manage',
      name: 'optional-course-manage',
      component: OptionalCourseManage
    },
    {
      path: '/optional-course-open-manage',
      name: 'optional-course-open-manage',
      component: OptionalCourseOpenManage
    },
    {
      path: '/optional-course-students/:classroomId/:classroomName',
      name: 'optional-course-students',
      component: OptionalCourseStudents
    },
    {
      path: '/student-optional-course/:studentId/:studentName/:selectedYear/:selectedTerm',
      name: 'student-optional-course',
      component: StudentOptionalCourse
    },
    {
      path: '/class-optional-course',
      name: 'class-optional-course',
      component: ClassOptionalCourse
    },
    // {
    //   path: '/teacher-optional-course/:teacherId/:teacherName',
    //   name: 'teacher-optional-course',
    //   component: TeacherOptionalCourse
    // },
    {
      path: '/teacher-optional-course',
      name: 'teacher-optional-course',
      component: TeacherOptionalCourse
    },
    {
      path: '/student-select-course',
      name: 'student-select-course',
      component: StudentSelectCourse
    }
  ]
})
