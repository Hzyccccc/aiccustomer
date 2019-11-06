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
                <span>订阅服务状态:</span>
                <el-select
                  v-model="value"
                  @change="selectText(value)"
                  placeholder="服务进行时"
                  size="small"
                  
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

              <el-table
                :data="tableData"
                style="width: 100%; margin-top:40px;text-aline：center"
                border
                :highlight-current-row="true"
                :header-cell-style="{background:'#f7f7f7'}"
                align="center"
              >
                <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                <el-table-column prop="ssb_id" label="订阅服务号" width="100" align="center"></el-table-column>
                <el-table-column prop="name" label="订阅服务名称" align="center" width="180"></el-table-column>
                <el-table-column label="服务内容" align="center" width="100">
                  <template slot-scope="scope">
                    
                    <!-- 极端 -->
                    <el-button
                      size="mini"
                      type="primary"
                      round
                      @click="handleEdit(scope.$index, scope.row)"
                    >请选择</el-button>
                   
                  </template>
                </el-table-column>
                <el-table-column prop="dic_name" label="订阅服务状态" align="center" width="110"></el-table-column>
                <el-table-column label="操作" align="center" width="180">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      type="primary"
                      round
                      @click="dialogVisible= true, handleText(scope.$index, scope.row)"
                    >续订</el-button>
                    <el-button
                      size="mini"
                      
                      type="primary"
                      round
                      @click="dialogabc= true, handleInterface(scope.$index, scope.row)"
                       v-if="scope.row.systemid === 100500"
                    >修改</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      round
                      @click="dialogVisibleLink= true, handleText(scope.$index, scope.row)"
                       v-else
                    >修改</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="apply_time" label="服务订阅申请日期" align="center"></el-table-column>
                <el-table-column prop="start_time" label="服务订阅生效日期" align="center"></el-table-column>
                <el-table-column prop="end_time" label="服务订阅有效日期" align="center"></el-table-column>
                <el-table-column prop="customer_name" label="订阅人" align="center"></el-table-column>
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
      <!-- 极端天气服务内容form表单 -->
      <el-dialog
        title="服务内容"
        :visible.sync="dialogFormVisible"
        width="20%"
        :modal-append-to-body="false">
        <el-form label-width="30%">
          <el-form-item label="订阅服务：" prop="checkList">
            <el-checkbox-group
              :min="1"
              v-model="checkList"
              style="background:#F2F2F2;"
            >
              <div style="padding-left:40px" v-for="(itm, idx) in checkFrom" :key="idx">
                <el-checkbox  :label="itm.mod_id">{{itm.mod_name}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false, submitForm()">确 定</el-button>
        </span>
      </el-dialog>
      
      <!-- 接口服务内容form表单 -->
      <el-dialog
        title="服务内容"
        :visible.sync="dialogInterface"
        width="30%"
        :modal-append-to-body="false">
        <el-form label-width="20%">
          <el-form-item label="订阅服务：" prop="checkList">
            <el-checkbox-group
              :min="1"
              v-model="checkList"
              style="background:#F2F2F2;"
            >
              <div style="padding-left:40px" v-for="(itm, idx) in checkFrom" :key="idx">
                        <el-checkbox  :label="itm.mod_id">{{itm.mod_name}}</el-checkbox>
              </div>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogInterface = false">取 消</el-button>
          <el-button type="primary" @click="dialogInterface = false, submitForm()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 续订内容form表单	 -->
      <el-dialog
        title="订阅服务续订"
        :visible.sync="dialogVisible"
        width="40%"
        :modal-append-to-body="false">
        <el-form :model="ruleForm1" ref="ruleForm1" label-width="150px" class="demo-ruleForm">
          <el-form-item label="服务订阅号：">
            <span>{{ruleForm1.ssb_id}}</span>
          </el-form-item>
          <el-form-item label="服务名称：">
            <span>{{ruleForm1.name}}</span>
          </el-form-item>
          <el-form-item label="服务首次订阅时间：">
            <span>{{ruleForm1.apply_time}}</span>
          </el-form-item>
          <!-- <el-form-item label="开始时间：" prop="delivery">
							<el-date-picker
								v-model="ruleForm1.start_time"
								type="date"
								placeholder="选择日期">
							</el-date-picker>
							<el-checkbox v-model="checked" style="padding-left:10px">自动顺延</el-checkbox>
          </el-form-item>-->
          <el-form-item label="订阅" prop="resource">
            <el-radio-group v-model="resource">
              <el-radio label="1">订阅一年</el-radio>
              <el-radio label="2">订阅两年</el-radio>
              <el-radio label="3">订阅三年</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false, subForm(ruleForm1)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改回调弹框 -->
      <el-dialog
        title="服务接口回调参数详情"
        :visible.sync="dialogVisibleLink"
        width="40%"
        :modal-append-to-body="false">
        <el-form :model="form" :rules="rules" ref="form" label-width="150px" class="demo-ruleForm">
          <el-form-item label="回调地址：" prop="callbackUrl">
            <input type="text" style="width:70%" v-model="form.callbackUrl" />
          </el-form-item>
          <el-form-item label="附加参数：" prop="callbackParam">
            <input type="text" style="width:70%" v-model="form.callbackParam" />
          </el-form-item>
          <div class="input-hzy" @click="textMen()">测试</div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleLink = false">取 消</el-button>
          <el-button type="primary" @click="subURLForm(form)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改接口回调弹框 -->
      <el-dialog
        title="服务接口回调参数详情"
        :visible.sync="dialogabc"
        width="40%"
        :modal-append-to-body="false">
        <el-form :model="ruleForm3" :rules="rules1" ref="ruleForm3" label-width="150px" class="demo-ruleForm">
          <el-form-item label="接口地址">
            <el-input type="text" style="width:100%" v-model="ruleForm3.interface" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input type="text" style="width:100%" v-model="this.$store.state.user" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <input type="text" v-model="ruleForm3.password" @input="tabPwd()" @blur="textPwd(ruleForm3.password)"/>
          </el-form-item>
          <el-form-item label="合成参数">
            <el-input type="text"  v-model="ruleForm3.callbackParam"  disabled></el-input>
          </el-form-item>
          <el-form-item label="完整参数">
            <el-input type="textarea" v-model="ruleForm3.callbackUrl" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogabc = false">取 消</el-button>
          <el-button type="primary" @click="subInterface(ruleForm3)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm3: {
        callbackUrl: "",
        password: '',
        callbackParam: "",
        interface: 'https//aic.auotoai.com/aic/carserver/rest/nc/real/getXXXWeather?',

      },
      dialogInterface: false,
      dialogabc:false,
      checkFrom: null,
      // 回调地址参数
      form: {
        callbackUrl: "",
        callbackParam: ""
      },
      // 修改回调参数
      dialogVisibleLink: false,
      ssb_id: "",
      // 操作框时间
      value1: "",
      ruleForm: {},
      // 操作框自动顺延
      checked: true,
      // 服务内容框
      dialogFormVisible: false,
      // 操作框
      dialogVisible: false,
      // 服务内容from表单
      checkList: [],
      resource: "1",
      // 操作内容from表单
      ruleForm1: {
        resource: "1"
      },
      // table 内容展示
      tableData: [],

      loading: false,
      // 分页
      pagesize: 10,
      currentpage: 1,
      total: 0,
      // 下拉框
      options: [
        // {
        //   value: "103101",
        //   label: "订阅申请中"
        // },
        {
          value: "103102",
          label: "服务进行时"
        },
        {
          value: "103103",
          label: "已到期服务"
        }
      ],
      // 下拉框内容
      value: "",
      rules: {
        callbackUrl: [
          { required: true, message: "请输入回调地址", trigger: "blur" ,duration: 1000}
        ]
      },
      rules1: {
        password: [
          { required: true, message: "密码不能为空", trigger: "blur",duration: 1000 }
        ]
      },
      flager: false
      // mainList: null
    };
  },
  created() {
    this.selectText("103102");
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
          message: "密码可用",
          type: "success",
          duration: 1000
        })
        }else {
          this.flager = false
          this.$message({
          message: "密码不可用",
          type: "warning",
          duration: 1000

        });
        }
      }).catch(req =>{
        
      })
      
    },
    // 测试接口是否成功
    textMen() {
      if (this.form.callbackUrl === "") {
        this.$message({
          message: "请输入回调地址",
          type: "warning",
          duration: 1000
        });
      } else {
        this.axios
          .post(this.form.callbackUrl, {})
          .then(res => {
            console.log(1);
            
            this.$message({ message: "服务接口回调地址可用", type: "success" });
            
          })
          .catch(req => {
            console.log(23311);
            console.log(req);
            
            
            this.$message({ message: "服务接口回调地址不可用，请重新设置！", type: "error" });
          });
      }
    },
    // 修改回调提交
    subURLForm(form) {
      if (form.callbackUrl === "") {
        this.$message({
          message: "回调地址不能为空",
          type: "warning",
          duration: 1000
        });
        return;
      }
      if (form.callbackUrl === this.ruleForm1.callback_url) {
        this.$message({
          message: "回调地址未改变",
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.axios
        .post("/cssSubscribeServer/updateCallBackDataByKey", {
          ssbId: form.ssb_id,
          callBackUrl: form.callbackUrl,
          callBackParam: form.callbackParam
        })
        .then(res => {
          if (res.status === 0) {
            this.$message({ message: "修改成功", type: "success",duration: 1000 });
            this.dialogVisibleLink = false;
            this.selectText(this.value);
          } else {
            this.$message({ message: "修改失败", type: "error",duration: 1000 });
          }
        })
        .catch(req => {
          this.$message({ message: "修改失败", type: "error",duration: 1000 });
        });
    },
    // 续订表单提交
    subForm(ruleForm1) {
      ruleForm1.resource = this.resource;
      this.axios
        .post("/cssSubscribe/renew", {
          ssbId: ruleForm1.ssb_id,
          years: ruleForm1.resource,
          endTime: ruleForm1.end_time
        })
        .then(res => {
          if (res.status === 0) {
            this.selectText(this.value);
            this.value = "";
            this.$message({ message: "续订成功", type: "success",duration: 1000 });
            this.resource = "1";
          } else {
            this.$message({ message: "续订失败", type: "error",duration: 1000 });
          }
        })
        .catch(req => {
          this.$message({ message: "续订失败", type: "error",duration: 1000 });
        });
    },
    // 下拉框动态
    selectText(value) {
      this.ruleForm1.resource = "1";

      this.value = value;
      this.axios
        .post("/findByStatus", {
          status: value,
          stmId: this.$store.state.id,
          currentPage: this.currentpage,
          pageSize: this.pagesize
        })
        .then(res => {
          if (res.status === 0) {
            this.tableData = res.result.list;
            this.total = res.result.total;
            console.log(this.tableData);
            
          }
        })
        .catch(req => {});
    },
    // 接口修改提交方法
    subInterface(form) {
      console.log(form);
      if(this.flager === false) {
        this.$message({
          showClose: true,
          message: '密码错误,订阅提交失败',
          type: 'error',
          duration: 1000

        })
        return
      }
      this.axios
        .post("/cssSubscribeServer/updateCallBackDataByKey", {
          ssbId: form.id,
          callBackUrl: null,
          callBackParam: form.password
        })
        .then(res => {
          if (res.status === 0) {
            this.$message({ message: "修改成功", type: "success",duration: 1000 });
            this.dialogabc = false;
            this.selectText(this.value);
          } else {
            this.$message({ message: "修改失败", type: "error",duration: 1000 });
          }
        })
        .catch(req => {
          this.$message({ message: "修改失败", type: "error",duration: 1000 });
        });
    },
    // 服务内容提交方法
    submitForm() {
      console.log(this.checkList);
      
      this.axios
        .post("/cssSubscribeServer/updateSubscribeServer", {
          stmId: this.$store.state.id,
          ssbId: this.ssb_id,
          modIdList: this.checkList
        })
        .then(res => {
          if (res.status === 0) {
            this.$message({ message: "订阅成功", type: "success",duration: 1000 });
          } else {
            this.$message({ message: "订阅失败", type: "error",duration: 1000 });
          }
        })
        .catch(req => {
          this.$message({ message: "订阅失败", type: "error",duration: 1000 });
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
            this.$message({ message: data.msg, type: "error",duration: 1000 });
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
    // 订阅
    handleEdit(index, row) {
      console.log(row.systemid);
      // 极端天气
      if(row.systemid === 100400 || row.systemid ===100800){
        
        this.axios.post('/aicModule/findBySysId',{
          sysId: row.systemid
        }).then(res =>{
          console.log(res);
          if(res.status === 0) {
            this.checkFrom = res.result
            this.dialogFormVisible= true
          }
        })
      // 接口地址   
      }else if(row.systemid === 100500){     
        this.axios.post('/aicModule/findBySysId',{
          sysId: row.systemid
        }).then(res =>{
          console.log(res);
          if(res.status === 0) {
            this.checkFrom = res.result
            this.dialogInterface = true
          }
        })
      }
      
      this.ssb_id = row.ssb_id;
      this.axios
        .post("/cssSubscribeServer/findByStmIdAadModId", {
          stmId: this.$store.state.id,
          ssbId: row.ssb_id
        })
        .then(res => {
          if (res.status === 0) {
            console.log(res.result);
            this.checkList = res.result;
            console.log(this.checkList);
            
          } else {
            this.$message({ message: "订阅失败", type: "error",duration: 1000 });
          }
        })
        .catch(req => {
          this.$message({ message: "订阅失败", type: "error",duration: 1000 });
        });
        
    },
    // 订阅
    handleText(index, row) {
      this.ruleForm1 = row;

      this.form.callbackUrl = row.callback_url;
      this.form.callbackParam = row.calback_param;
      this.form.ssb_id = row.ssb_id;
    },
    handleInterface(index, row) {
      // console.log(index);
      console.log(row);
      this.ruleForm3.id = row.ssb_id;
      this.ruleForm3.password = row.calback_param;
      this.ruleForm3.callbackParam = 'uid='+ this.$store.state.user +'&pwd='+this.ruleForm3.password;
      this.ruleForm3.callbackUrl = 'https//aic.auotoai.com/aic/carserver/rest/nc/real/getXXXWeather?uid='+ this.$store.state.user +'&pwd='+this.ruleForm3.password;
      
    },
    tabPwd() {
      this.ruleForm3.callbackParam = 'uid='+ this.$store.state.user +'&pwd='+this.ruleForm3.password;
      this.ruleForm3.callbackUrl = 'https//aic.auotoai.com/aic/carserver/rest/nc/real/getXXXWeather?uid='+ this.$store.state.user +'&pwd='+this.ruleForm3.password;
    
    }
  }
};
</script>
<style lang="scss" scoped>
.input-hzy {
  position: absolute;
  bottom: 140px;
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
  color: #2c2c2c;
  border: #d2d2d2 solid 1px;
  div {
    padding-left: 20px;
    width: 160px;
    height: 56px;
    border-bottom: #0270c1 solid 3px;
  }
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
.table-wrapper {
  position: relative;
}
</style>