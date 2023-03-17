import { createStore } from 'vuex'

export default createStore({
    state () {
        return {
            path: "http://127.0.0.1:8000",
            loading: 1,
            token: (localStorage.getItem("token") == null) ? "" : localStorage.getItem("token"),
            isAuthenticated: (localStorage.getItem("isAuthenticated") == null) ? false : JSON.parse(localStorage.getItem("isAuthenticated")),
        }
    },
    getters: {
        getPath: (state: any) => state.path,
        getLoading: (state: any) => state.loading,
        getToken: (state: any) => state.token,
        getIsAuthenticated: (state: any) => state.isAuthenticated,
    },
    mutations: {
        setLoading (state: any, loading: any) {
            state.loading = loading;
        },
        setIsAuthenticated (state: any, isAuthenticated: any) {
            state.isAuthenticated = isAuthenticated;
        },
        setToken (state: any, token: any) {
            state.token = token;
        },
    },
    actions: {
        async takeToken(context: any){
            context.commit('setToken', (localStorage.getItem("token") == null) ? "" : localStorage.getItem("token"))
        },
    }
})