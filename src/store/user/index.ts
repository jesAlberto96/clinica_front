import { createStore } from 'vuex'
import config from '@/store/config'
import { API } from '@/config/api/API'

export default createStore({
    actions: {
        async login(context: any, payload: any){
            return await API.POST(`${config.getters.getPath}/api/auth`, payload);
        },
    }
})