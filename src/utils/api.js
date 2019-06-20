const baseUrl = 'https://api.mcust.cn'
// const baseUrl = 'http://localhost:7777'
const api = {
    hotVideo: baseUrl + '/course/search/1/5?keyword=web',
    courseList: baseUrl + '/course/getCourseList/',
    corseDetail: baseUrl + '/course/getLessonList/',
    articleList: baseUrl + '/article/list/',
    articleDetail: baseUrl + '/article/detail/',
    login: baseUrl + '/login',
    searchArticle: baseUrl + '/article/search/',
    searchCourse: baseUrl + '/course/search/',
    userSearchRecord: baseUrl + '/user_search_record',
    cardTodayTotal: baseUrl + '/card/todaytotal',
    cardStatus: baseUrl + '/card/status',
    card: baseUrl + '/card/add',
    myCardList: baseUrl + '/card/list',
    cardList: baseUrl + '/card/lists',
    taskAdd: baseUrl + '/task/add',
    taskList: baseUrl + '/task/list',
    taskDelete: baseUrl + '/task/delete',
    taskComplete: baseUrl + '/task/complete',
    taskTodo: baseUrl + '/task/todo',
    chatMsgList: baseUrl + '/chatmsg/list'
    
}

export default api;