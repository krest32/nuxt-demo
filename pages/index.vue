<template>
  <div class="body">
    <h1 style="text-align: center">电商视频素材导航页</h1>
    <section align="center">
      <span>
        <el-button type="warning" plain @click="reset"> 重置 </el-button>
      </span>
    </section>
    <section>
      <section>
        <h1 style="text-align: center">问题定位</h1>
        <table align="center">
          <td align="center">
            <span v-for="(one, index) in oneSortList" :key="one.id">
              <el-button
                type="button"
                style="margin-left: 5px; margin-top: 5px"
                :title="one.title"
                :class="{ active: oneIndex == index }"
                @click="clickOneList(one.id, index)"
              >
                {{ one.title }}
              </el-button>
            </span>
          </td>
        </table>
      </section>
      <section v-if="oneIndex > -1 && quesLocation === '行业细分'">
        <h1 style="text-align: center">问题细分</h1>
        <table align="center">
          <td align="center">
            <span v-for="(two, index) in twoSortList" :key="two.id">
              <el-button
                type="button"
                style="margin-left: 5px; margin-top: 5px"
                :title="two.title"
                :class="{ active: twoIndex == index }"
                @click="clickTwoList(two.id, index)"
                >{{ two.title }}</el-button
              >
            </span>
          </td>
        </table>
      </section>

      <section v-if="twoIndex > -1 && quesLocation === '行业细分'">
        <h1 style="text-align: center">营销目标</h1>
        <table align="center">
          <td align="center">
            <span v-for="(three, index) in threeSortList" :key="three.id">
              <el-button
                type="button"
                style="margin-left: 5px; margin-top: 5px"
                :class="{ active: threeIndex === index }"
                @click="clickThreeList(three.id, index)"
                >{{ three.title }}</el-button
              >
            </span>
          </td>
        </table>
      </section>

      <section v-if="threeIndex > -1 && quesLocation === '行业细分'">
        <h1 style="text-align: center">知识沉淀</h1>
        <table align="center">
          <td align="center">
            <span v-for="(four, index) in fourSortList" :key="four.id">
              <el-button
                type="button"
                style="margin-left: 5px; margin-top: 5px"
                :class="{ active: fourIndex == index }"
                @click="clickFourList(four.id, index)"
                >{{ four.title }}</el-button
              >
            </span>
          </td>
        </table>
      </section>

      <section v-if="oneIndex > -1 && quesLocation === '账户必知'">
        <h1 style="text-align: center">问题细分</h1>
        <table align="center">
          <td align="center">
            <span v-for="(two, index) in twoSortList" :key="two.id">
              <el-button
                type="button"
                style="margin-left: 5px; margin-top: 5px"
                :title="two.title"
                :class="{ active: twoIndex == index }"
                @click="clickTwoList(two.id, index)"
                >{{ two.title }}</el-button
              >
            </span>
          </td>
        </table>
      </section>
      <!-- <section v-if="twoIndex > -1 && quesLocation === '账户必知'">
        <h1 style="text-align: center">落地页</h1>
        <table align="center">
          <td>
            <span v-for="(five, index) in fiveSortList" :key="five.id">
              <el-button
                type="button"
                style="margin-left: 5px"
                :class="{ active: fiveIndex == index }"
                @click="clickFiveList(five.id, index)"
                >{{ five.title }}</el-button
              >
            </span>
          </td>
        </table>
      </section> -->

      <section>
        <h1 style="text-align: center">请查收暴量密码</h1>
        <table align="center">
          <td align="center" style="background: #ffffff">
            <span v-if="resultList.length == 0">
              <a>......</a>
            </span>
            <span v-for="result in resultList" :key="result.id">
              <el-button
                type="success"
                size="medium"
                :title="result.name"
                style="
                  margin-left: 10px;
                  margin-top: 10px;
                  margin-right: 10px;
                  margin-bottom: 10px;
                "
                @click="oneNewWebPage(result.link)"
                >{{ result.name }}</el-button
              >
            </span>
          </td>
        </table>
      </section>
      <section>
        <h1 style="text-align: center">进阶内容</h1>
        <table align="center">
          <td align="center">
            <span v-for="upData in upSortList" :key="upData.id">
              <el-button
                type="button"
                style="margin-left: 5px; margin-top: 5px"
                href="#"
                @click="oneNewWebPage(upData.link)"
              >
                {{ upData.title }}
              </el-button>
            </span>
          </td>
        </table>
      </section>
    </section>
  </div>
</template>

<script>
import dataList from "~/static/data.json";
export default {
  data() {
    return {
      // 选中索引下标
      oneIndex: -1,
      twoIndex: -1,
      threeIndex: -1,
      fiveIndex: -1,
      fourIndex: -1,

      // 定位问题标签
      quesLocation: "",
      // 选中标签
      selectOne: { id: -1, title: "" },
      selectTwo: { id: -1, title: "" },
      selectThree: { id: -1, title: "" },
      selectFour: { id: -1, title: "" },
      selectFive: { id: -1, title: "" },
      // 返回请求结果列表
      resultList: [],
      resultShow: false,
      defaultSelect: { id: -1, title: "" },
      oneSortList: [
        { id: 0, title: "行业细分" },
        { id: 1, title: "账户必知" },
      ],
      twoSortList: [],
      threeSortList: [
        { id: 0, title: "日常引流" },
        { id: 1, title: "日常涨粉" },
        { id: 2, title: "日常订单支付" },
        { id: 3, title: "活动专题" },
      ],
      fourSortList: [
        { id: 0, title: "选品策略" },
        { id: 1, title: "案例拆解" },
        { id: 2, title: "拍摄剪辑" },
        { id: 3, title: "行业方法论" },
      ],
      fiveSortList: [
        { id: 0, title: "课程链接" },
        { id: 1, title: "文档链接" },
        { id: 2, title: "视频链接" },
      ],
      upSortList: [
        {
          id: 0,
          title: "分行业素材模板库",
          link: "https://docs.qingque.cn/s/home/eZQDvmclaxn6DhLConjb3inNE?identityId=CjLjQjyCAZ#section=112089998",
        },
        {
          id: 1,
          title: "优质社区内容样片",
          link: "https://docs.qingque.cn/s/home/eZQB0vivVch3kxfDqiQlYIo-H?identityId=Ecd6hDSGBn",
        },
        {
          id: 2,
          title: "热门音乐&套路",
          link: "https://docs.qingque.cn/d/home/eZQDOz78LzXXaBfDkg6aaqFLm?identityId=Ecd6hDSGBn",
        },
        {
          id: 3,
          title: "代理商分层素材方向&资料运用",
          link: "https://docs.qingque.cn/s/home/eZQBNy_miDIKOtWCAVRtcaQsu?identityId=CjLjQjyCAZ#section=703740974",
        },
        {
          id: 4,
          title: "磁力金牛广告投放问题诊断手册",
          link: "https://docs.qingque.cn/d/home/eZQAqZ0Bnl7MpebNWNTRjYqh5?identityId=CjLjQjyCAZ#section=h.xwyw0g5ihmaz",
        },
      ],
    };
  },
  methods: {
    clickOneList(id, index) {
      // 取消选中问题定位，重置整个索引页面
      if (this.oneIndex == index) {
        this.oneIndex = -1;
        this.selectOne = this.defaultSelect;
        this.reset();
      } else {
        this.oneIndex = index;

        // 清空之前的选项
        this.twoIndex = -1;
        this.threeIndex = -1;
        this.fourIndex = -1;
        this.selectTwo = this.defaultSelect;
        this.selectThree = this.defaultSelect;
        this.selectFour = this.defaultSelect;

        // 区分问题定位
        if (id == 0) {
          this.quesLocation = "行业细分";
          this.twoSortList = [
            { id: 0, title: "美妆" },
            { id: 1, title: "个人清洁" },
            { id: 2, title: "图书" },
            { id: 3, title: "食品" },
            { id: 4, title: "名茶" },
          ];
        } else if (id == 1) {
          this.quesLocation = "账户必知";
          this.twoSortList = [
            { id: 0, title: "审核" },
            { id: 1, title: "低质" },
            { id: 2, title: "重复度" },
            { id: 3, title: "冷启动" },
            { id: 4, title: "工具诊断" },
            { id: 5, title: "开店SOP" },
          ];
        }

        this.selectOne = this.oneSortList[id];
        // 获取请求结果
        this.getPage(
          this.selectOne,
          this.selectTwo,
          this.selectThree,
          this.selectFour,
          this.selectFive
        );
      }
    },

    // 第二级列表
    clickTwoList(id, index) {
      if (this.twoIndex == index) {
        this.twoIndex = -1;
        this.selectTwo = this.defaultSelect;
      } else {
        this.twoIndex = index;
        this.selectTwo = this.twoSortList[id];
      }
      // 重置参数
      this.threeIndex = -1;
      this.fourIndex = -1;
      this.fiveIndex = -1;
      this.selectThree = this.defaultSelect;
      this.selectFour = this.defaultSelect;
      this.selectFive = this.defaultSelect;

      // 获取请求结果
      this.getPage(
        this.selectOne,
        this.selectTwo,
        this.selectThree,
        this.selectFour,
        this.selectFive
      );
    },

    // 第三级目录操作
    clickThreeList(id, index) {
      if (this.threeIndex == index) {
        this.threeIndex = -1;
        this.selectThree = this.defaultSelect;
      } else {
        this.threeIndex = index;
        this.selectThree = this.threeSortList[id];
      }
      // 重置参数
      this.fourIndex = -1;
      this.fiveIndex = -1;
      this.selectFour = this.defaultSelect;
      this.selectFive = this.defaultSelect;

      // 获取请求结果
      this.getPage(
        this.selectOne,
        this.selectTwo,
        this.selectThree,
        this.selectFour,
        this.selectFive
      );
    },

    clickFourList(id, index) {
      if (this.fourIndex == index) {
        this.fourIndex = -1;
        this.selectFour = this.defaultSelect;
      } else {
        this.fourIndex = index;
        this.selectFour = this.fourSortList[id];
      }
      // 获取请求结果
      this.getPage(
        this.selectOne,
        this.selectTwo,
        this.selectThree,
        this.selectFour,
        this.selectFive
      );
    },

    clickFiveList(id, index) {
      if (this.fiveIndex == index) {
        this.fiveIndex = -1;
        this.selectFive = this.defaultSelect;
      } else {
        this.fiveIndex = index;
        this.selectFive = this.fiveSortList[id];
      }
      // 获取请求结果
      this.getPage(
        this.selectOne,
        this.selectTwo,
        this.selectThree,
        this.selectFour,
        this.selectFive
      );
    },

    oneNewWebPage(pageLink) {
      window.open(pageLink, "_blank");
    },

    getPage(selectOne, selectTwo, selectThree, selectFour, selectFive) {
      this.resultShow = true;
      this.resultList = dataList;

      // 账户必知两轮过滤
      if (selectOne.id != -1 && this.quesLocation == "账户必知") {
        // 第一轮过滤
        this.resultList = this.resultList.filter((val) => {
          for (var i = 0; i < val.stuff.length; i++) {
            if (val.stuff[i] === selectOne.title) {
              return true;
            }
          }
        });

        // 第二轮过滤
        if (selectTwo.id != -1) {
          console.log(selectTwo);
          console.log(this.resultList.length);
          this.resultList = this.resultList.filter((val) => {
            for (var i = 0; i < val.stuff.length; i++) {
              if (val.stuff[i] === selectTwo.title) {
                return true;
              }
            }
          });
        }

        // 第三轮过滤
        if (selectFive.id != -1) {
          console.log(this.selectFive);
          this.resultList = this.resultList.filter((val) => {
            for (var i = 0; i < val.stuff.length; i++) {
              if (val.stuff[i] === selectFive.title) {
                return true;
              }
            }
          });
        }
      }

      // 行业细分四轮过滤
      if (selectOne.id != -1 && this.quesLocation == "行业细分") {
        // 第一轮过滤
        this.resultList = this.resultList.filter((val) => {
          for (var i = 0; i < val.stuff.length; i++) {
            if (val.stuff[i] === selectOne.title) {
              return true;
            }
          }
        });

        // 第二轮过滤
        if (selectTwo.id != -1) {
          console.log(selectTwo);
          console.log(this.resultList.length);
          this.resultList = this.resultList.filter((val) => {
            for (var i = 0; i < val.stuff.length; i++) {
              if (val.stuff[i] === selectTwo.title) {
                return true;
              }
            }
          });
        }

        // 第三轮过滤
        if (selectThree.id != -1) {
          console.log(this.selectThree);
          this.resultList = this.resultList.filter((val) => {
            for (var i = 0; i < val.stuff.length; i++) {
              if (val.stuff[i] === selectThree.title) {
                return true;
              }
            }
          });
        }

        // 第四轮过滤
        if (selectFour.id != -1) {
          console.log(this.selectFour);
          this.resultList = this.resultList.filter((val) => {
            for (var i = 0; i < val.stuff.length; i++) {
              if (val.stuff[i] === selectFour.title) {
                return true;
              }
            }
          });
        }
      }
    },

    // 重置
    reset() {
      this.resultShow = false;
      // 重置已经选中的对象信息
      this.selectOne = this.defaultSelect;
      this.selectTwo = this.defaultSelect;
      this.selectThree = this.defaultSelect;
      this.selectFour = this.defaultSelect;
      this.selectFive = this.defaultSelect;
      // 重置搜索结果
      this.resultList = [];
      this.twoSortList = "";
      // 重置激活的选中选项
      this.oneIndex = -1;
      this.twoIndex = -1;
      this.threeIndex = -1;
      this.fourIndex = -1;
      this.fiveIndex = -1;
    },
  },
};
</script>
<style scoped>
.active {
  background: #5fb8d3;
}
.activeTwo {
  background: #5fb8d3;
}

.activeThree {
  background: #5fb8d3;
}

.activeFour {
  background: #5fb8d3;
}

.activeFive {
  background: #5fb8d3;
}
.body {
  position: relative;
  font-family: Arial;
  padding: 10px;
  background: #f1f1f1;
}
</style>
