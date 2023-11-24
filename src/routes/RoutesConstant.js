export const path = {
    private: {
        path: "private",
        desc: 'this is private page'
    },
    home: {
        path: '/',
        desc: 'this is home pages'
    },
    Organisation: {
        path: '/get-started',
        desc: 'this is for org type and name'
    },
    Layout: {
        path: '/admin/',
        desc: 'this admin route'
    },
    AdminDasboard: {
        path: '/admin/dashboard',
        desc: 'this is admin dashboard'
    },
    AddCourse: {
        path: '/admin/add-course',
        desc: 'this is for adding course page '
    },
    AddAssessment: {
        path: '/admin/add-assessment',
        desc: 'this is for adding assesment page '
    },
    CreateAssessment: {
        path: '/admin/create-assessment',
        desc: 'this is for creating  assesment page '
    },
    showAssessment:{
        path:'/show-assessment',
        desc:'this is for creating showassesment page'
        
    },
    CreateCourse: {
        path: '/admin/create-course',
        desc: 'this is for creating course page '
    },
    ShowCourse: {
        path: '/admin/show-course',
        desc: 'this is showing course page '
    },
    
    showStudent: {
        path: '/admin/student-details',
        desc: 'this is a for student detail page'
    },
    error: {
        path: '/*',
        desc: 'this is for if anyone one put wrong endpoint'
    }
}