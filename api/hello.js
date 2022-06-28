import request from "@/utils/request";
export default {
    ///////////////////////////////sort 开始/////////////////////////////////////////////////
    // 获得所有的分类列表
    hello() {
        return request({
            url: `/demo/hello`,
            method: "get"
        });
    }
}