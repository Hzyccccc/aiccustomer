

<template>
  <div>
    <el-row style="" class="header-hzy">
      <div>首页</div>
    </el-row>
    <div class="line">
      <div class="line-list">
        <el-row style="margin-bottom: 16px;">
          <el-col :span="24" style="">
            <!-- <el-card style="">
              <div class="main-header">我关注的服务:</div>
              <div id="myChart1"></div>
            </el-card>
            <el-card style="">
              <div class="main-header">我订阅的服务:</div>
              <div id="main"></div>
            </el-card> -->
            <el-card style="margin-bottom: 30px">
              <div class="main-header">我访问的日志:</div>
              <div id="myChartC"></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
// // 引入柱状图组件
// require('echarts/lib/chart/bar')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
import echarts from "echarts";
export default {
  mounted() {
    //  this.drawLine();

    this.$nextTick(function() {
      // this.drawPieA("myChart1");
      // this.drawPieB("main");
      this.drawPieC("myChartC");
    });
  },
  created() {
    this.findData();
  },
  data() {
    return {
      optionsA: {
        color: ["#3398DB"],
        // tooltip : {
        //     trigger: 'axis',
        //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //     }
        // },
        // 边距
        grid: {
          left: "0%",
          right: "10%",
          bottom: "20%",
          containLabel: false
        },
        xAxis: [
          {
            type: "category",
            data: ["强风服务", "强风服务", "强风服务", "强风服务"],
            axisLine: {
              show: false,
              lineStyle: {
                color: "#D2D2D2"
                
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#707070",
                fontSize: 18
              }
            },
            axisTick: {
              alignWithLabel: false,
              show: false
            }
          }
        ],
        yAxis: [
          {
            show: false,
            type: "value"
          }
        ],
        series: [
          {
            barGap:'0%',
            name: "直接访问",
            type: "bar",
            barWidth: "15%",
            data: [130, 232, 200, 334],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#7AC6F3" },
                  { offset: 0.5, color: "#7DA2F0" },
                  { offset: 1, color: "#8081ED" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#7AC6F3" },
                  { offset: 0.5, color: "#7DA2F0" },
                  { offset: 1, color: "#8081ED" }
                ])
              }
                // color: new echarts.graphic.LinearGradient(
                //     0, 0, 0, 1,
                //     [
                //         {offset: 0, color: '#D3D3D3'},
                //         {offset: 0.5, color: '#DFDDDD'},
                //         {offset: 1, color: '#F0ECEC'}
                //     ],

                // )
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              //   color: function(params) {
              //     var colorList = [
              //       new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //         { offset: 0, color: "#7AC6F3" },
              //         { offset: 0.5, color: "#7DA2F0" },
              //         { offset: 1, color: "#8081ED" }
              //       ])
              //     ];
              //     return colorList[params.dataIndex];
              //   }
              // },
              // // 鼠标放上去的颜色
              // emphasis: {
              //     color: new echarts.graphic.LinearGradient(
              //         0, 0, 0, 1,
              //         [
              //           { offset: 0, color: "#7AC6F3" },
              //           { offset: 0.5, color: "#7DA2F0" },
              //           { offset: 1, color: "#8081ED" }
              //         ]
              //     )
              // }
            }
          },
          {
            name: "直接访问",
            type: "bar",
            barWidth: "15%",
            data: [10, 52, 200, 334],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#E3D9FC" },
                  { offset: 0.5, color: "#E3D9FC" },
                  { offset: 1, color: "#E3D9FC" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#E3D9FC" },
                  { offset: 0.5, color: "#E3D9FC" },
                  { offset: 1, color: "#E3D9FC" }
                ])
              }
            }
          }
        ]
      },
      optionsB: {
        color: ["#3398DB"],
        // tooltip : {
        //     trigger: 'axis',
        //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        //     }
        // },
        // 边距
        grid: {
          left: "0%",
          right: "10%",
          bottom: "20%",
          containLabel: false
        },
        xAxis: [
          {
            type: "category",
            data: ["强风服务", "强风服务", "强风服务", "强风服务"],
            axisLine: {
              show: false,
              lineStyle: {
                
                color: "#D2D2D2"
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#707070",
                fontSize: 18
              }
            },
            axisTick: {
              alignWithLabel: false,
              show: false
            }
          }
        ],
        yAxis: [
          {
            show: false,
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "15%",
            barGap:'0%',
            data: [130, 232, 200, 334],
            itemStyle: {
              normal: {
                
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#7AC6F3" },
                  { offset: 0.5, color: "#7DA2F0" },
                  { offset: 1, color: "#8081ED" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#7AC6F3" },
                  { offset: 0.5, color: "#7DA2F0" },
                  { offset: 1, color: "#8081ED" }
                ])
              }
                // color: new echarts.graphic.LinearGradient(
                //     0, 0, 0, 1,
                //     [
                //         {offset: 0, color: '#D3D3D3'},
                //         {offset: 0.5, color: '#DFDDDD'},
                //         {offset: 1, color: '#F0ECEC'}
                //     ],

                // )
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              //   color: function(params) {
              //     var colorList = [
              //       new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //         { offset: 0, color: "#7AC6F3" },
              //         { offset: 0.5, color: "#7DA2F0" },
              //         { offset: 1, color: "#8081ED" }
              //       ])
              //     ];
              //     return colorList[params.dataIndex];
              //   }
              // },
              // // 鼠标放上去的颜色
              // emphasis: {
              //     color: new echarts.graphic.LinearGradient(
              //         0, 0, 0, 1,
              //         [
              //           { offset: 0, color: "#7AC6F3" },
              //           { offset: 0.5, color: "#7DA2F0" },
              //           { offset: 1, color: "#8081ED" }
              //         ]
              //     )
              // }
            }
          },
          {
            name: "直接访问",
            type: "bar",
            barWidth: "15%",
            data: [10, 52, 200, 334],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#E3D9FC" },
                  { offset: 0.5, color: "#E3D9FC" },
                  { offset: 1, color: "#E3D9FC" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#E3D9FC" },
                  { offset: 0.5, color: "#E3D9FC" },
                  { offset: 1, color: "#E3D9FC" }
                ])
              }
            }
          }
        ]
      },
      optionsC: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            name: "日期",
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#D2D2D2"
              }
            },
            axisLabel: {
              interval: 0,
              rotate: 50
            }
          }
        ],
        yAxis: [
          {
            name: "访问量",
            type: "value",
            scale: true,
            max: null
            
          }
        ],
        series: [
          {
            
            name: "访问日志",
            type: "bar",
            barWidth: "40%",
            data: []
          }
        ]
      }
    };
  },
  watch: {
    //观察option的变化
    optionC: {
      handler(newVal, oldVal) {
        if (this.chart) {
          if (newVal) {
            this.charts = echarts.init(document.getElementById(id));
            this.charts.setOption(newVal);
          } else {
            this.charts = echarts.init(document.getElementById(id));
            this.charts.setOption(newVal);
          }
        } else {
          this.init();
        }
      },
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    // max: null,
    // drawLine() {
    // // 基于准备好的dom，初始化echarts实例
    // let myChart = echarts.init(document.getElementById('myChart'))
    // // 绘制图表
    // myChart.setOption(this.optionsA);
    // }
    // drawPieA(id) {
    //   this.charts = echarts.init(document.getElementById(id));
    //   this.charts.setOption(this.optionsA);
    // },
    // drawPieB(id) {
    //   this.charts = echarts.init(document.getElementById(id));
    //   this.charts.setOption(this.optionsB);
    // },
    drawPieC(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption(this.optionsC);
    },
    // 查询登录用户Echart图所需要的数据
    findData() {
      this.axios
        .post("/cssLogin/findEchartData", {
          userId: this.$store.state.id
        })
        .then(res => {
          if (res.status === 0) {
            this.optionsC.xAxis[0].data = res.result.loginDate;
            this.optionsC.series[0].data = res.result.loginCount;
            this.max=this.optionsC.series[0].data.reduce((a,b)=>a>b?a:b);
            this.max = Math.ceil(this.max + this.max*0.25)
            // this.drawPieC('myChartC')
            console.log('===');
            console.log(this.max);
            console.log('===');
            this.optionsC.yAxis[0].max = this.max
            
            this.drawPieC("myChartC");
          }
        })
        .catch(req => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.header-hzy {
  background-color: #f2f2f7;
  height: 50px;
  font-size: 24px;
  font-weight: 500;
  line-height: 50px;
  border-radius: 5px 5px 0px 0px;
  border: #d2d2d2 solid 1px;
  div {
    padding-left: 20px;
    width: 80px;
    height: 46px;
    border-bottom: #0270c1 solid 3px;
  }
}
.main-header {
  float: left;
  height: 300px;
  width: 30%;
  text-align: center;
  line-height: 300px;
  color: #707070;
  font-weight: 700;
  font-size: 24px;
}
>>>.el-card {
  border: 0!important;
  border-top:1px solid #e6ebf5!important;
}
#myChart1 {
  float: left;
  width: 70%;
  height: 300px;
  // padding-right: 50px;
}
#main {
  float: left;
  width: 70%;
  height: 300px;
}
#myChartC {
  float: left;
  width: 70%;
  height: 300px;
}
</style>
