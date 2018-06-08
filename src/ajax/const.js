import axios from 'axios'
import qs from 'qs'
// test
// let urlBefore = 'https://api.fa-zai.com/fazai-manager'
// 测试
let urlBefore = 'http://192.168.23.200:8086/smk_city_activity/'

let CancelToken = axios.CancelToken;
export let source = CancelToken.source();
//获取用户token
const token = '123456'
axios.defaults.timeout = 5000
// http响应拦截器
axios.interceptors.response.use(
    response => {
        if (token) {
            response.headers.Authorization = token;
        }
        let { data: json } = response
        let resp = json
        if (resp.code === 0) return resp;
        return Promise.reject({ msg: resp.msg })
    },
    error => {
        return Promise.reject({ msg: '网络异常,请稍后再试' })
    },
)

export function post(url, data, type) {
    let t = type ? type : 'application/x-www-form-urlencoded;charset=UTF-8'
    return axios({
        url: urlBefore + url,
        method: 'post',
        data: 'request=' + JSON.stringify(data),
        headers: {
            'token': token,
            'Content-Type': t,
            'appId': "com.smk.test.test"
        },
        cancelToken: source.token
    })
}
export function get(url, data, type) {
    return axios({
        url: urlBefore + url + data,
        method: 'get',
        headers: {
            'token': token,
            'Content-Type': type,
            'Authorization': 'Bearer' + ' ' + localStorage.getItem('token_crm'),
        }
    })
}
