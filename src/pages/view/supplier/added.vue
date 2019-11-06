<template>
  <div>
    <div>
      <el-row class="header-hzy">
        <div>订阅服务管理</div>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-card>
            <div class="table-wrapper">
              <div class="type-hzy">
                <span>预警服务类型:</span>
                <el-select
                  v-model="value"
                  @change="selectText(value)"
                  size="medium"
                  style="width: 230px;"
                  placeholder="高精短时天气预警推送服务"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
              <div
                style="text-align: center; font-size: 22px; margin-bottom: 20px; height:40px;line-height:40px"
              >
                <label>订阅服务列表</label>
              </div>
              <!-- 内容区 -->
              <div class="content-hzy" style="text-align: center" v-if="mainList == null">暂无数据</div>
              <div class="content-hzy" v-for="(item,i) in mainList" :key="i">
                <div>
                  <div class="content-left-hzy">
                    <!-- <el-img></el-img> -->
                    <img src="static/04.jpg" alt="" style="width:100%;height:100%">
                  </div>
                  <div class="content-right-hzy">
                    <div class="content-right-one-hzy">服务名称：{{item.name}}</div>
                    <div :title="item.description" style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">服务描述：{{item.description}}</div>
                    <div>提供类型：{{item.push_type}}</div>
                    <div
                      style="overflow:hidden; white-space: nowrap;text-overflow: ellipsis;"
                    >服务内容: {{item.string_agg}}</div>
                    <div class="content-footer-hzy">加入关注时间：{{item.focusTime}}</div>
                    <!-- <el-button @click="handleEdit(scope.$index, scope.row)"></el-button> -->
                    <el-button
                      type="primary"
                      @click="Subscribe(item)"
                      class="Subscribe-hzy"
                      size="mini"
                      v-if="item.isSubscribe == false"
                    >订阅</el-button>
                    <el-button
                      type="success"
                      @click="dialogVisible= false"
                      class="Subscribe-hzy"
                      size="mini"
                      v-if="item.isSubscribe == true"
                    >已订阅</el-button>
                    <el-button
                      type="success"
                      class="Subscribe-right"
                      size="mini"
                      @click="cancel(item.sys_id, item.isFocus)"
                      v-if="item.isFocus == false"
                    >关注</el-button>
                    <el-button
                      type="info"
                      class="Subscribe-right"
                      size="mini"
                      @click="open2(item.sys_id, item.isFocus)"
                      v-if="item.isFocus == true"
                    >取消关注</el-button>
                  </div>
                </div>
              </div>

              <!-- 极端天气订阅框 -->
              <el-dialog
                title="新增订阅服务"
                :visible.sync="dialogVisible"
                width="50%"
                :modal-append-to-body="false">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="20%"
                  class="demo-ruleForm"
                >
                
                  <el-form-item label="服务名称：" style="margin-top:-20px">
                    <span>{{contenList.name}}</span>
                  </el-form-item>
                  <el-form-item label="服务描述：" style="margin-top:-20px">
                    <p :title="contenList.description" style="height:30px;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{contenList.description}}</p>
                  </el-form-item>
                  <el-form-item label="提供类型：" style="margin-top:-20px">
                    <span>{{contenList.push_type}}</span>
                  </el-form-item>
                  <el-form-item label="服务内容：" style="margin-top:-20px">
                    <span>{{contenList.string_agg}}</span>
                  </el-form-item>
                  <el-form-item label="订阅服务：" prop="checkList">
                    <el-checkbox-group
                      v-model="ruleForm.checkList"
                      :min="1"
                      style="background:#F2F2F2; width:auto;"
                    >
                      <div   style="display: flex; flex-wrap: wrap;justify-content:space-around">
                        <el-checkbox v-for="(itm, idx) in checkFrom" :key="idx" :label="itm.mod_id">{{itm.mod_name}}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="订阅期限：" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                      <el-radio label="1">订阅一年</el-radio>
                      <el-radio label="2">订阅两年</el-radio>
                      <el-radio label="3">订阅三年</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="回调地址：" prop="callbackUrl">
                    <input type="text" style="width:70%" v-model="ruleForm.callbackUrl" />
                  </el-form-item>
                  <el-form-item label="附加参数：" prop="callbackParam">
                    <input type="text" style="width:70%" v-model="ruleForm.callbackParam" />
                  </el-form-item>
                  <div class="input-hzy" @click="textMen(ruleForm.callbackUrl,ruleForm.callbackParam)">测试</div>

                  <el-button style="margin-left: 70%" @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForm(contenList)">确 定</el-button>
                </el-form>
              </el-dialog>            
              <!-- 接口订阅框 -->
              <el-dialog
                title="新增订阅服务"
                :visible.sync="dialogInterface"
                width="50%"
                :modal-append-to-body="false">
                <el-form
                  :model="ruleForm1"
                  :rules="rules1"
                  ref="ruleForm1"
                  label-width="20%"
                  class="demo-ruleForm"
                  
                >
                  <el-form-item label="服务名称：" style="margin-top:-10px">
                    <span>{{contenList.name}}</span>
                  </el-form-item>
                  <el-form-item label="服务描述：" style="margin-top:-20px">
                    <p :title="contenList.description" style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;height:30px;">{{contenList.description}}</p>
                  </el-form-item>
                  <el-form-item label="提供类型：" style="margin-top:-20px">
                    <span>{{contenList.push_type}}</span>
                  </el-form-item>
                  <el-form-item label="服务内容：" style="margin-top:-20px">
                    <p :title="contenList.string_agg" style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;height:30px;">{{contenList.string_agg}}</p>
                  </el-form-item>
                  <el-form-item label="订阅服务：" prop="checkList">
                    <el-checkbox-group
                      v-model="ruleForm1.checkList"
                      :min="1"
                      style="background:#F2F2F2; width:auto;"
                    >
                      <div style="padding-left:40px" v-for="(itm, idx) in checkFrom" :key="idx">
                        <el-checkbox  :label="itm.mod_id">{{itm.mod_name}}</el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="订阅期限：" prop="resource">
                    <el-radio-group v-model="ruleForm1.resource">
                      <el-radio label="1">订阅一年</el-radio>
                      <el-radio label="2">订阅两年</el-radio>
                      <el-radio label="3">订阅三年</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  
                  <el-form-item label="接口地址">
                    <el-input type="text" style="width:100%" v-model="ruleForm1.interface" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名">
                    <el-input type="text" style="width:100%" v-model="this.$store.state.user" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <input type="text" v-model="ruleForm1.password" @input="tabPwd()" @blur="textPwd(ruleForm1.password)"/>
                  </el-form-item>
                  <el-form-item label="合成参数">
                    <el-input type="text"  v-model="ruleForm1.callbackParam"  disabled></el-input>
                  </el-form-item>
                  <el-form-item label="完整参数">
                    <el-input type="textarea" v-model="ruleForm1.callbackUrl" disabled></el-input>
                  </el-form-item>
                  <el-button style="margin-left: 70%" @click="dialogInterface = false">取 消</el-button>
                  <el-button type="primary" @click="submitForm1(contenList)">确 定</el-button>
                </el-form>
                <!-- <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = true">确 定</el-button>
                </span>-->
              </el-dialog>
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
      open2(id, status) {
        this.$confirm("确定要取消关注吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "取消关注成功!"
            });
            this.cancel(id, status);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消此操作"
            });
          });
      },
      // 订阅框表单
      contenList: [],
      tableData: [],
      loading: false,
      dialogInterface: false,
      // 每页请求数
      pagesize: 10,
      // 页码
      currentpage: 1,
      total: 0,
      // 选择框数组
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
      // check服务框内容
      checkFrom: null,
      // 服务内容from表单
      ruleForm: {
        checkList: [""],
        value1: "",
        value2: "",
        callbackUrl: "",
        callbackParam: "",
        resource: "1"
      },
      // 接口地址订阅
      ruleForm1: {
        checkList: [""],
        value1: "",
        value2: "",
        callbackUrl: "",
        password: 'pwd',
        callbackParam: "",
        resource: "1",
        interface: 'https//aic.auotoai.com/aic/carserver/rest/nc/real/getXXXWeather?',

      },
      rules: {
        checkList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个服务",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择期限", trigger: "change" }
        ],
        callbackUrl: [
          { required: true, message: "请输入回调地址", trigger: "blur" }
        ]
        // callbackParam: [
        //   { required: true, message: '请选择时间'}
        // ]
      },
      rules1: {
        checkList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个服务",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择期限", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
        // callbackParam: [
        //   { required: true, message: '请选择时间'}
        // ]
      },
      // 订阅服务下拉框
      dialogVisible: false,
      //订阅服务CheckBox数组
      checkList: [],
      // 页面内容展示数组
      mainList: [],
      // 密码错误阀门
      flager: false

    };
  },
  created() {
    this.requestList();
  },
  methods: {
    // 接口密码效验
    textPwd(pwd) {
      console.log(this.$store.state.id);
      console.log(pwd);
      this.axios.post('cssSubscribeServer/findKeyIsExistByUserIdAndKey',{
        key:pwd,
        userId: this.$store.state.id
      }).then(res=>{
        console.log(res);
        if(res.status === 0 && res.result === false) {
          this.flager = true
          this.$message({
          message: "密码正确",
          type: "success",
          duration: 1000
        })
        }else {
          this.flager = false
          this.$message({
          message: "密码错误",
          type: "warning",
          duration: 1000

        });
        }
      }).catch(req =>{
        
      })
      
    },
    //接口密码修改
    tabPwd(){
      this.ruleForm1.callbackParam = 'uid='+ this.$store.state.user +'&pwd='+this.ruleForm1.password;
      this.ruleForm1.callbackUrl = 'https//aic.auotoai.com/aic/carserver/rest/nc/real/getXXXWeather?uid='+ this.$store.state.user +'&pwd='+this.ruleForm1.password;
    
      
    },
    // 测试
    textMen(url,past) {
      if (url === "") {
        this.$message({
          message: "请输入回调地址！！！",
          type: "warning"
        });
      } else {
        this.axios
          .post(url, {})
          .then(res => {
             this.$message({ message: "服务接口回调地址可用", type: "success" });
          })
          .catch(req => {
            this.$message({ message: "服务接口回调地址不可用，请重新设置！", type: "error" });
          });
      }
    },
    // 接口订阅提交表单
    submitForm1(contenList) {
      if(this.flager === false) {
        this.$message({
          showClose: true,
          message: '密码错误,订阅提交失败',
          type: 'error',
          duration: 1000

        })
        return
      }
      this.$refs["ruleForm1"].validate(valid => {
        if (valid) {
          this.axios
            .post("/cssSubscribeServer/subscribeServer", {
              userId: this.$store.state.id,
              modId: contenList.sys_id,
              modIdList: this.ruleForm1.checkList,
              years: this.ruleForm1.resource,
              callbackUrl: null,
              callbackParam: this.ruleForm1.password
            })
            .then(res => {
              if (res.status === 200) {
                this.$message({ message: "订阅成功", type: "success" });
                this.requestList();
                this.ruleForm1.checkList = [""]
                this.ruleForm1.resource = "1"
                this.ruleForm1.password = ""
                this.ruleForm1.callbackUrl = null
                this.dialogInterface = false
              } else {
                this.$message({ message: "订阅失败", type: "error" });
              }
            })
            .catch(req => {
              this.$message({ message: "订阅失败", type: "error" });
            });
        } else {
          return false;
        }
      });
    },
    // 订阅提交表单
    submitForm(contenList) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.axios
            .post("/cssSubscribeServer/subscribeServer", {
              userId: this.$store.state.id,
              modId: contenList.sys_id,
              modIdList: this.ruleForm.checkList,
              years: this.ruleForm.resource,
              callbackUrl: this.ruleForm.callbackUrl,
              callbackParam: this.ruleForm.callbackParam
            })
            .then(res => {
              if (res.status === 200) {
                this.$message({ message: "订阅成功", type: "success" });
                this.requestList();
                this.ruleForm.checkList =[""],
                this.ruleForm.value1 = "",
                this.ruleForm.value2 = '',
                this.ruleForm.callbackUrl = '',
                this.ruleForm.callbackParam = '',
                this.ruleForm.resource = "1"
                this.dialogVisible = false;
              } else {
                this.$message({ message: "订阅失败", type: "error" });
              }
            })
            .catch(req => {
              this.$message({ message: "订阅失败", type: "error" });
            });
        } else {
          return false;
        }
      });
    },
    // 点击订阅获取信息
    Subscribe(id) {
      // 极端天气
      if(id.sys_id === 100400 || id.sys_id ===100800){
        
        this.axios.post('/aicModule/findBySysId',{
          sysId: id.sys_id
        }).then(res =>{
          console.log(res);
          if(res.status === 0) {
            this.checkFrom = res.result
            this.ruleForm.checkList[0] = res.result[0].mod_id
            this.dialogVisible = true
            this.contenList = id 
          }
        })
      // 接口地址   
      }else if(id.sys_id === 100500){
        this.ruleForm1.callbackParam = 'uid='+ this.$store.state.user +'&pwd='+this.ruleForm1.password;
      this.ruleForm1.callbackUrl = 'https//aic.auotoai.com/aic/carserver/rest/nc/real/getXXXWeather?uid='+ this.$store.state.user +'&pwd='+this.ruleForm1.password; 
        
        this.axios.post('/aicModule/findBySysId',{
          sysId: id.sys_id
        }).then(res =>{
          console.log(res);
          if(res.status === 0) {
            this.checkFrom = res.result
            this.ruleForm1.checkList[0] = res.result[0].mod_id
            this.contenList = id    
           this.dialogInterface = true
          }
        })
      
      }
    },
    // 关注
    cancel(id, status) {
      // 关注
      if (status === false) {
        this.axios
          .post("/cssFocus/focusServer", {
            stmId: this.$store.state.id,
            modId: id
          })
          .then(res => {
            if (res.status === 200) {
              this.$message({ message: "关注成功", type: "success" });
              this.requestList();
            } else {
              this.$message({ message: "关注失败", type: "error" });
            }
          })
          .catch(req => {
            this.$message({ message: "关注失败", type: "error" });
          });
      } else if (status === true) {
        this.axios
          .post("/cssFocus/cancelFocusServer", {
            stmId: this.$store.state.id,
            modId: id
          })
          .then(res => {
            if (res.status === 200) {
              this.$message({ message: "取消关注成功", type: "success" });
              this.requestList();
            } else {
              this.$message({ message: "取消关注失败", type: "error" });
            }
          })
          .catch(req => {
            this.$message({ message: "取消关注失败", type: "error" });
          });
      }
    },
    // 获取用户列表
    requestList() {
      this.axios
        .post("/aicSystem/showServer", {
          currentPage: 1,
          pageSize: 10,
          type: this.value,
          stmId: this.$store.state.id
        })
        .then(res => {
          if (res.status === 0) {
            this.mainList = res.result.list;
            this.total = res.result.total;
            if(res.result.list.length === 0) {
              this.mainList = null
            }
          }
        })
        .catch(req => {
          this.mainList = null
        });
    },
    // 分页功能方法
    getTableData() {
      this.loading = true;
      this.axios
        .post("/aicSystem/showServer", {
          currentPage: this.currentpage,
          pageSize: this.pagesize,
          stmId: this.$store.state.id
        })
        .then(data => {
          if (data.status === 0) {
            this.mainList = data.result.list;
            this.total = data.result.total;
          } else {
            this.$message({ message: data.msg, type: "error" });
          }
          this.loading = false;
        })
        .catch(error => {});
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
        this.requestList();
    }
  }
};
</script>
<style lang="scss" scoped>
.input-hzy {
  position: absolute;
  bottom: 120px;
  right: 80px;
  width: 60px;
  height: 60px;
  border: #ccc solid 1px;
  background-color: #ccc;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
}
.header-hzy {
  background-color: #f2f2f7;
  height: 60px;
  font-size: 24px;
  font-weight: 500;
  line-height: 60px;
  border: #d2d2d2 solid 1px;
  div {
    padding-left: 20px;
    width: 160px;
    height: 56px;
    border-bottom: #0270c1 solid 3px;
  }
}
.table-wrapper {
  position: relative;
}
.type-hzy {
  position: absolute;
  left: 5px;
  top: 10px;
  color: #707070;
  span {
    font-size: 16px;
    padding-right: 20px;
  }
}
.content-hzy {
  margin-top: 40px;
  // box-shadow:0 0 1px #ccc inset;
  width: 100%;
  height: 200px;
  .content-left-hzy {
    box-sizing: border-box;
    width: 20%;
    height: 200px;
    border: #e5e5e5 solid 15px;
    float: left;
    margin-right: 2%;
    background-color: pink;
  }

  .content-right-hzy {
    box-sizing: border-box;
    height: 200px;
    width: 78%;
    float: left;
    box-shadow: 0 0 1px #bfbfbf inset;
    font-size: 16px;
    color: #707070;
    padding: 20px;
    position: relative;
    .Subscribe-right {
      position: absolute;
      right: 20px;
      top: 20px;
    }
    .Subscribe-hzy {
      position: absolute;
      right: 120px;
      top: 20px;
      margin-right: 20px;
    }
    // display: flex;
    // flex-direction:column;
    // justify-content: space-between;
    .content-right-one-hzy {
      font-size: 18px;
      font-weight: 700;
      color: #707070;
      margin-bottom: 20px;
    }
    div {
      margin-top: 14px;
    }
  }
}
</style>