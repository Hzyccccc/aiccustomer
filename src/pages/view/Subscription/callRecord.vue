<template>
  <div>
    <div>
      <el-row class="header-hzy">
        <div>订阅服务推送记录</div>
      </el-row>
      <el-row>
        <el-col :span="24" style="background:#FFFFFF">
          <el-card>
            <div class="table-wrapper">
              <div class="type-hzy">
                <span>预警服务类型:</span>
                <el-select
                  v-model="value"
                  placeholder="高精短时天气预警推送服务"
                  @change="selectText(value)"
                  style="width: 250px;"
                  size="small"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    size="mini"
                  ></el-option>
                </el-select>
                <!-- <el-checkbox-group v-model="checkList" @change="checkText(checkList)" style="display: inline-block;margin-left: 38px; font-size:18px">
                        <el-checkbox label="订阅中" value="103102"></el-checkbox>
                        <el-checkbox label="已失效"></el-checkbox>                      
                </el-checkbox-group>-->
                <el-radio
                  v-model="radio"
                  label="103102"
                  style="margin-left: 38px;"
                  @change="checkText(radio)"
                >订阅中</el-radio>
                <el-radio v-model="radio" label="103103" @change="checkText(radio)">已失效</el-radio>
              </div>
              <div class="type-hzy" style="margin-top:30px">
                <span style="margin-right:20px;">开始日期</span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  @change="timeText(value1)"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH-mm-ss"
                  size="small"
                  style="width:150px"
                ></el-date-picker>
                <i class="el-icon-date" style="font-size:22px;color:#1195DE;margin-left:10px;"></i>
                <span style="margin:0 20px 0 30px;">结束日期</span>
                <el-date-picker
                  v-model="value2"
                  type="date"
                  @change="timeText(value2)"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd HH-mm-ss"
                  size="small"
                  style="width:150px"
                ></el-date-picker>
                <i class="el-icon-date" style="font-size:22px;color:#1195DE;margin-left:10px;"></i>
              </div>
              <el-table
                v-loading="loading"
                style="margin-top:40px;"
                element-loading-text="加载数据中"
                max-height="500px"
                :data="tableData"
                border
                align="center"
                :highlight-current-row="true"
                :header-cell-style="{background:'#f7f7f7'}"
                stripe
              >
                <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
                <el-table-column label="订阅服务号" width="100" prop="ssb_server_id" align="center"></el-table-column>
                <el-table-column label="订阅服务名称" prop="name" align="center"></el-table-column>
                <el-table-column label="调用日期" prop="access_date" align="center"></el-table-column>
                <el-table-column label="调用时间" prop="access_time" align="center"></el-table-column>
                <el-table-column label="调用接口名称" prop="interface_name" align="center"></el-table-column>
                <el-table-column label="返回代码" prop="return_code" align="center"></el-table-column>
                <el-table-column label="返回数据大小(字节)" prop="size" align="center"></el-table-column>
                <el-table-column label="备注" prop="wechat" align="center"></el-table-column>
              </el-table>
              <el-pagination
                style="margin-top: 16px; text-align:right;"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[5, 10, 15, 20]"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: null,
      value2: null,
      radio: "103102",
      // lastTime: '',
      // fastTime: '',
      tableData: [],
      loading: false,
      checkList: [],
      pagesize: 10,
      currentpage: 1,
      total: 0,
      options: [
        {
          value: 101805,
          label: "高精短时天气预警推送服务"
        },
        {
          value: 101804,
          label: "高精短时天气查询接口服务"
        }
      ],
     // 选择框的值
      value: 101805,
    };
  },
  created() {
    
    this.initTime()
  },
  methods: {
    timeText(value) {
      this.requestList()
    },
    formatDate(date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      };
      for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          let str = o[k] + '';
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str));
        }
      }
      return fmt;
    },
    padLeftZero(str) {
      return ('00' + str).substr(str.length);
    },
    // 获取时间信息
    initTime() {
        let date = new Date();
        let time = date.getTime() - date.getMinutes() % 5 * 1000 * 60;
        let rdd = new Date(time);
        this.value1 = this.formatDate(new Date(new Date().getTime() - 60 * 60 * 168000), 'yyyy-MM-dd');
        this.value2 = this.formatDate(new Date(), 'yyyy-MM-dd');
        this.requestList();
      },
    // 比较选择的时间大小
    // compareTime(){
    //   if (this.fastTime > this.lastTime) {
    //     this.requestList()
    //   }else {
    //     this.$message({message: "加载失败", type: 'error'});
    //   }
    // },
    // 获取订阅状态
    checkText(list) {
      
      
      this.requestList();
    },
    // 获取用户关注列表
    requestList() {

      this.axios
        .post("/cssApiAccess/findDataByCondition", {
          currentPage: 1,
          pageSize: 10,
          stmId: this.$store.state.id,
          startTime: this.value1,
          endTime: this.value2,
          status: Number(this.radio),
          type: this.value
        })
        .then(res => {
          if (res.status === 0) {
            this.tableData = res.result.list;
            this.total = res.result.total;
            
            
            this.loading = false;
          } else {
            this.$message({ message: "加载失败", type: "error" });
          }
        })
        .catch(req => {
          this.$message({ message: "加载失败", type: "error" });
        });
    },

    // 分页功能方法
    getTableData() {
      this.loading = true;
      this.requestList();
    },
    handleSizeChange(value) {
      this.pagesize = value;
      this.getTableData();
    },
    handleCurrentChange(value) {
      this.currentpage = value;
      this.getTableData();
    },
    // 下拉框动态
    selectText(value) {
      this.axios
        .post("/cssApiAccess/findDataByCondition", {
          currentPage: 1,
          pageSize: 10,
          stmId: this.$store.state.id,
          startTime: this.value1,
          endTime: this.value2,
          status: this.radio,
          type: value
        })
        .then(res => {
          if (res.status === 0) {
            this.tableData = res.result.list;
            this.total = res.result.total;

            this.loading = false;
          } else {
            this.$message({ message: "加载失败", type: "error" });
          }
        })
        .catch(req => {
          this.$message({ message: "加载失败", type: "error" });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.header-hzy {
  background-color: #f2f2f7;
  
  height: 60px;
  font-size: 24px;
  font-weight: 500;
  line-height: 60px;
  color: #2c2c2c;
  border: #d2d2d2 solid 1px;
  div {
    padding-left: 20px;
    width: 200px;
    height: 56px;
    border-bottom: #0270c1 solid 3px;
  }
}
.type-hzy {
  margin-top: 10px;
  font-size: 16px;
  color: #878787;
  span {
    font-size: 16px;
    margin-right: 13px;
  }
}
</style>    