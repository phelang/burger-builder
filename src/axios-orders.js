import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-8c5e4-default-rtdb.firebaseio.com/',
})

export default instance
