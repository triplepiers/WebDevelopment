// 封装 axios 请求
import axios from "axios"
import router from "@/router";

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    if(config.url === '/file/upload' || config.url === "/file/cover") {
        // 上传 file 时需要特殊处理类型和后端跨域
        config.headers['Content-Type'] = 'multipart/form-data; boundary=<calculated when request is sent>'
        config.withCredentials = true; 
    } else {
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    
    // config.headers['token'] = user.token;  // 设置请求头

    // 拦截 通过 SessionStorage 中是否存在 user 对象 判断是否已经登录
    let userJson = sessionStorage.getItem('user')
    if(!userJson) {
        router.push('/login')
    }

    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request