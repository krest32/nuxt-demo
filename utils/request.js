import axios from "axios";
// 创建axios实例
const service = axios.create({
    // api的base_url
    // baseURL: "http://localhost:9002",
    baseURL: "http://witerk.top:8001",
    timeout: 20000 // 请求超时时间
});
export default service;