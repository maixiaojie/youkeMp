import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        statusBarHeight: 0,
        windowWidth: 0,
        windowHeight: 0,
        todayHasCards: false
    },
    mutations: {
        setTodayHasCards: (state) => {
            state.todayHasCards = true
        },
        setTodayNoCards: (state) => {
            state.todayHasCards = false
        },
        setStatusBarHeight: (state, statusBarHeight) => {
            state.statusBarHeight = statusBarHeight
        },
        setWindowWidth: (state, windowWidth) => {
            state.windowWidth = windowWidth
        },
        setWindowHeight: (state, windowHeight) => {
            state.windowHeight = windowHeight
        }
    }
});