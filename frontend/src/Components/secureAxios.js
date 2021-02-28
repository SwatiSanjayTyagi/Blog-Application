import axios from 'axios'

const secureAxios = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com'
    baseURL: `http://127.0.0.1:8000`
    // baseURL: 'http://localhost:8000'
})

secureAxios.interceptors.request.use(config => {
    config.headers['Authorization'] = 'Bearer token'
    return config
})

secureAxios.interceptors.response.use(response => {
    console.log('Done with the server call')
    return response 
},error => {
    console.log('Some error has happenend')
    return Promise.reject(error)
})

export default secureAxios  