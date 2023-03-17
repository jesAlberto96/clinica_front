import { createStore } from 'vuex'
import config from '@/store/config'
import { API } from '@/config/api/API'

export default createStore({
    actions: {
        async findByPage(context: any, { page }){
            return await API.GET(`${config.getters.getPath}/api/patients?page=${page}`);
        },

        async find(context: any, { id }){
            return await API.GET(`${config.getters.getPath}/api/patients/${id}`);
        },

        async create(context: any, payload: any){
            return await API.POST(`${config.getters.getPath}/api/patients`, payload);
        },

        async delete(context: any, { id }: any){
            return await API.DELETE(`${config.getters.getPath}/api/patients/${id}`);
        },
    }
})