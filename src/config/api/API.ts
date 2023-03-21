import axios from 'axios';
import config from '@/store/config/';

function handleErrorsPOST(data: any){
    if ('errors' in data.meta){
        return {
            meta: {
                status: false,
                errors: data.meta.errors
            }
        }
    }

    return {
        meta: {
            status: false,
            errors: [
                "Ocurrio un error innesperado, por favor vuelva a intentarlo"
            ]
        }
    }
}

function handleErrorsGET(error: any){
    return {
        meta: {
            success: false,
            errors: [
                "Ocurrio un error innesperado, por favor vuelva a intentarlo"
            ]
        }
    }
}

const API = {
    async GET(path: any = ""){
        try{
            await config.dispatch('takeToken');

            const response = await axios.get(path, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${config.getters.getToken}`
                },
            });

            return response.data
        } catch (error: any){
            return handleErrorsGET(error);
        }
    },

    async POST(path: any, data: any){
        try{
            await config.dispatch('takeToken');

            const response = await axios.post(path, data, 
            {
                headers: {
                    'Authorization': `Bearer ${config.getters.getToken}`
                }
            });

            return response.data;
        } catch (error: any){
            return handleErrorsPOST(error.response.data);
        }
    },

    async DELETE(path: any){
        try{
            await config.dispatch('takeToken');

            const response = await axios.delete(path, 
            {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${config.getters.getToken}`
                },
            });

            return response.data;
        } catch (error: any){
            return handleErrorsPOST(error.response.data);
        }
    },
}

export { API };