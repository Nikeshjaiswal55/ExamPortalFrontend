export const path = {
    // ------------------------------public endpoints--------------------------------------------
    GetStarted: {
        path: '/get-started',
        desc: 'this is for org type and name'
    },
    Redirect: {
        path: '/redirection',
        desc: 'this is for org type and name'
    },
    // ------------------------------private endpoints--------------------------------------------
    private: {
        path: "private",
        desc: 'this is private page'
    },
    home: {
        path: '/',
        desc: 'this is home pages'
    },
    Organisation: {
        path: '/add-organization',
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
    UpdateAssessment: {
        path: '/admin/update-assessment',
        desc: 'this is for adding assesment page '
    },
    CreateAssessment: {
        path: '/admin/create-assessment',
        desc: 'this is for creating  assesment page '
    },
    showAssessment: {
        path: '/admin/show-assessment',
        desc: 'this is for creating showassesment page'

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
        path: '/admin/student-details/:paperId',
        desc: 'this is a for student detail page'
    },
    ShowAssessment: {
        path: '/admin/show-assessment',
        desc: 'this is for creating showassessment page '

    },
    SidePooup: {
        path: '/admin/Side-Pooup',
        desc: 'this is for creating sidepooup page '

    },
    // ------------------------------student endpoints--------------------------------------------
    StudentDashboard: {
        path: "/student/dashboard",
        desc: " this is to show dashboard of student "
    },
    TermAndCondition: {
        path: '/student/Term-And-Condition',
        desc: 'this is for creating TermAndCondition page '

    },
    exam: {
        path: '/student/exam',
        desc: 'this is seprate exam pages for student'
    },
    examVerify: {
        path: '/student/exam-verify',
        desc: 'this is for student system varification page'
    },
    examReport: {
        path: '/student/exam-report',
        desc: 'this is for student summery page'
    },
    StudentPaper: {
        path: '/student/student-paper/:paperId',
        desc: 'this is for creating student paper page '

    },
    StudentExamStarted: {
        path: '/student/exam-started',
        desc: 'this is for creating student paper page '
    },
    StudentPaperSubmitted: {
        path: '/student/exam-submited',
        desc: 'this is for creating student paper page '
    },
    StudentViewResult: {
        path: '/student/view-result',
        desc: 'this is for creating student paper page '
    },
    ShowAllAssessmentToStudent: {
        path: '/student/allAssissment',
        desc: 'this is for creating student paper page '
    },
    error: {
        path: '/*',
        desc: 'this is for if anyone one put wrong endpoint'
    }
}