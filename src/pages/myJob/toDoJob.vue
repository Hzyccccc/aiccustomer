<%--
@Project Name: vue-admin
@Author: luichooy
@Date: 2018-04-02 10:21
@Email: luichooy@163.com
@Idea: WebStorm
--%>

<template>
  <div class="index">
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div slot="header">
            <el-row :gutter="20">
              <el-col :span="6">
                <label>任务类型:</label>
                <el-select v-model="dicName" placeholder="请选择" @change="selectByType">
                  <el-option
                    v-for="item in dicType"
                    :key="item.dicId"
                    :label="item.dicName"
                    :value="item.dicId">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="table-wrapper">
            <el-table
              :data='tableData'
              max-height="550px"
              border
              stripe>
              <el-table-column label="编号" prop="auditId" align="center"></el-table-column>
              <el-table-column label="提交用户" prop="userName" align="center"></el-table-column>
              <el-table-column label="提交时间" prop="submitTime" width="170px" align="center"></el-table-column>
              <el-table-column label="功能模块" prop="funName" align="center"></el-table-column>
              <el-table-column label="内容" v-if="false" prop="submitContentId" align="center"></el-table-column>
              <el-table-column label="状态" prop="auditName" align="center"></el-table-column>
              <el-table-column label="审核人" prop="auditUserName" align="center"></el-table-column>
              <el-table-column label="审核时间" prop="auditTime" width="170px" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="400">
                <template slot-scope="scope">
                  <el-button type="success" size="mini" icon="el-icon-warning" @click="showDetails(scope.row)">详情
                  </el-button>
                  <el-button type="primary" size="mini" v-if="scope.row.auditName=== '等待审核'" icon="el-icon-check"
                             @click="updateStatus(scope.row,100201)">批准
                  </el-button>
                  <el-button type="danger" size="mini" v-if="scope.row.auditName==='等待审核'" icon="el-icon-close"
                             @click="updateStatus(scope.row,100202)">驳回
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              style="margin-top: 16px; text-align:right;"
              layout="total, sizes, prev, pager, next, jumper"
              :page-sizes="[5, 10, 15, 20]"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="用户详情" :modal="false" :model="form"
               custom-class="user-details"
               :close-on-click-modal="false">
      <!-- <span>这是一段信息</span> -->
      <el-form label-position="right" label-width="80px" ref="updateForm" :model="form">
        <el-row :gutter="20">
          <el-col :span="12">


            <el-form-item label="用户头像" prop="userImage" :disabled="true">
              <div style="width:160px; height: 125px;">
                暂无图像
                <!--<el-input v-model="form.userName"></el-input>-->
              </div>
            </el-form-item>
            <!--<el-image style="width: 100px; height: 100px" :src="headImg" fit="fill"></el-image>-->
            <el-form-item label="添加时间" prop="addTime">
              <el-input v-model="form.addTime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="createTime">
              <el-input v-model="form.createTime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="审核功能" prop="funName" v-if="false">
              <el-input v-model="form.funName" :disabled="true"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="form.userName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="userFullName">
              <el-input v-model="form.userFullName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户状态" prop="statusName">
              <el-input v-model="form.statusName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="wechat">
              <el-input v-model="form.wechat" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">

            <el-form-item label="用户类型" prop="type">
              <el-input v-model="form.typeName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex" :disabled="true">
                <el-radio :label="100501">男</el-radio>
                <el-radio :label="100502">女</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="创建者" prop="createUserName">
              <el-input v-model="form.createUserName" :disabled="true"></el-input>
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="small" @click="dialogVisible = false;">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="updateDialogVisible" title="用户详情" :modal="false" :model="updateForm"
               custom-class="user-details"
               :close-on-click-modal="false">
      <!-- <span>这是一段信息</span> -->
      <el-form label-position="right" label-width="80px" ref="updateForm" :model="updateForm">
        <el-row :gutter="20">
          <el-col :span="12">
            <label style="font-size: 16px">修改前数据：</label>
            <el-form-item label="用户头像" prop="userImage" :disabled="true" v-model="updateFormAgo.userImage">
              <div style="width:160px; height: 125px;">
                暂无图像
                <!--<el-input v-model="form.userName"></el-input>-->
              </div>
            </el-form-item>
            <!--<el-image style="width: 100px; height: 100px" :src="headImg" fit="fill"></el-image>-->
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="updateFormAgo.email" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="updateFormAgo.userName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="userFullName">
              <el-input v-model="updateFormAgo.userFullName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户状态" prop="statusName">
              <el-input v-model="updateFormAgo.statusName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="updateFormAgo.phone" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="wechat">
              <el-input v-model="updateFormAgo.wechat" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="type">
              <el-input v-model="updateFormAgo.typeName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input v-model="updateFormAgo.sexName" :disabled="true" style="color: red"></el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <label style="font-size: 16px">修改后数据：</label>
            <el-form-item label="用户头像" prop="userImage" :disabled="true" v-model="updateForm.userImage">
              <div style="width:160px; height: 125px; display: inline-block">
                暂无图像
                <!--<el-input v-model="form.userName"></el-input>-->
              </div>
              <div style="display: inline-block">
                <label style="color: red" v-if="show1">&nbsp;{{msg}}</label>
              </div>
            </el-form-item>

            <!--<el-image style="width: 100px; height: 100px" :src="headImg" fit="fill"></el-image>-->
            <el-form-item label="邮箱" prop="email">
              <el-input v-if="show2 !==0" v-model="updateForm.email" :disabled="true"
                        style="border: 1px solid red"></el-input>
              <el-input v-else v-model="updateForm.email" :disabled="true"></el-input>
            </el-form-item>

            <el-form-item label="用户名称" prop="userName">
              <el-input v-if="show3 !==0" v-model="updateForm.userName" :disabled="true"
                        style="border: 1px solid red"></el-input>
              <el-input v-else v-model="updateForm.userName" :disabled="true"></el-input>
            </el-form-item>


            <el-form-item label="真实姓名" prop="userFullName">
              <el-input v-if="show4 !==0" v-model="updateForm.userFullName" :disabled="true"
                        style="border: 1px solid red"></el-input>
              <el-input v-else v-model="updateForm.userFullName" :disabled="true"></el-input>
            </el-form-item>


            <el-form-item label="用户状态" prop="statusName">
              <el-input v-if="show5 !==0" v-model="updateForm.statusName" :disabled="true"
                        style="border: 1px solid red"></el-input>
              <el-input v-else v-model="updateForm.statusName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-if="show6 !==  0" v-model="updateForm.phone" :disabled="true"
                        style="border: 1px solid red"></el-input>
              <el-input v-else v-model="updateForm.phone" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="微信" prop="wechat">
              <el-input v-if="show7 !==0" v-model="updateForm.wechat" :disabled="true"
                        style="border: 1px solid red"></el-input>
              <el-input v-else v-model="updateForm.wechat" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="用户类型" prop="type">
              <el-input v-if="show8 !==0" v-model="updateForm.typeName" :disabled="true"
                        style="border: 1px solid red"></el-input>
              <el-input v-else v-model="updateForm.typeName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-input v-if="show9" v-model="updateForm.sexName" :disabled="true"
                        style="border: 1px solid red"></el-input>
              <el-input v-else v-model="updateForm.sexName" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="small" @click="updateDialogVisible = false;">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {formatDate} from 'src/utils/utils';
  import score from 'src/components/Score';

  import {queryAicAudit} from 'src/api/data/audit';

  var server = null;
  var axois = null;
  var editId = null;
  var rejectPass = 100201; // 审核通过
  var rejectBack = 100202;  // 审核拒绝
  export default {
    created() {
      this.getTableData();
      this.getFormSelect();
      server = this.SERVER;
      axois = this.axios;
    },
    data() {
      return {
        msg: '修改数据',

        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        show9: false,
        dicType: [],
        dicName: 100203,
        item: {
          dicId: undefined
        },
        tableData: [],
        loading: false,
        pagesize: 10,
        currentpage: 1,
        total: 0,
        dialogVisible: false,
        updateDialogVisible: false,
        form: {},
        updateForm: {},
        updateFormAgo: {},
        row: {},
        roles: [],
        keyword: ''
      }
    },
    methods: {
      getTableData() {
        this.axios.get(`${this.SERVER}aicAudit/queryAicAudit?auditStatusId=${this.dicName}&currentpage=${this.currentpage}&pagesize=${this.pagesize}`)
          .then(data => {
            if (data.status === 0) {
              this.tableData = data.result.list;
              this.total = data.result.total;
            } else {
              this.$message({message: data.msg, type: 'error',duration: 1000});
            }
          })
          .catch(error => {
            
          });
      },
      handleSizeChange(value) {
        this.pagesize = value;
        this.getTableData();
      },
      handleCurrentChange(value) {
        this.currentpage = value;
        this.getTableData();
      },
      // 加载下拉框选着
      getFormSelect() {
        this.axios.get(`${this.SERVER}aicDict/queryAuditType`)
          .then(data => {
            if (data.status === 0) {
              this.dicType = data.result;
            } else {
              this.$message({message: data.msg, type: 'error',duration: 1000});
            }
          })
          .catch(error => {
           
          });
      },
      // 点击下拉框选这改变数据
      selectByType() {
        console.log(this.dicName)
        this.axios.get(`${this.SERVER}aicAudit/queryAicAudit?auditStatusId=${this.dicName}&currentpage=${this.currentpage}&pagesize=${this.pagesize}`)
          .then(data => {
            if (data.status === 0) {
              this.tableData = data.result.list;
              this.total = data.result.total;
            } else {
              this.$message({message: data.msg, type: 'error',duration: 1000});
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      updateStatus(data, num) {
        if (data.auditName === '等待审核') {
          switch (num) {
            case rejectPass:
              // 批准操作
              switch (data.funName) {
                case '用户注册' :
                  this.rejectAddPass(data);
                  break;
                case '用户删除' :
                  this.rejectDeletePass(data)
                  break;
                case '用户禁用' :
                  this.rejectDisablePass(data)
                  break;
                case '用户启用' :
                  this.rejectEnablePass(data)
                  break;
                case '用户编辑' :
                  this.rejectUpdatePass(data)
                  break;
                case '组织注册' :
                  this.rejectDeptAddPass(data);
                  break;
              }

              break
            case rejectBack:
              // 驳回操作
              switch (data.funName) {
                case '用户注册' :
                  this.rejectAddBack(data);
                  break;
                case '用户删除' :
                  this.rejectDeleteBack(data);
                  break;
                case '用户禁用' :
                  this.rejectDisableBack(data)
                  break;
                case '用户启用' :
                  this.rejectEnableBack(data)
                  break;
                case '用户编辑' :
                  this.rejectUpdateBack(data)
                  break;
                case '组织注册' :
                  this.rejectDeptAddBack(data);
                  break;
              }
              break
          }
        } else {
          this.$message({message: '该状态无法操作！', type: 'error',duration: 1000});
        }
      },

      // 审核部门注册驳回
      rejectDeptAddBack(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/addDeptAicAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectBack
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核部门注册驳回成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: '审核部门注册驳回失败', type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核部门注册通过
      rejectDeptAddPass(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/addDeptAicAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectPass
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核部门注册通过成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: '审核部门注册通过失败', type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核用户注册驳回
      rejectAddBack(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/updateAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectBack
          })
            .then(res => {
              if (res.status === 0) {
                this.getTableData();
                this.$message({message: '审核用户注册驳回成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: '审核用户注册驳回失败', type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核用户注册通过
      rejectAddPass(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/updateAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectPass
          })
            .then(res => {
              if (res.status === 0) {
                this.getTableData();
                this.$message({message: '审核用户注册通过成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: '审核用户注册通过失败', type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核用户删除驳回
      rejectDeleteBack(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/deleteAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectBack
          })
            .then(res => {
              if (res.status === 0) {
                this.getTableData();
                this.$message({message: '审核用户删除驳回成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: res.msg, type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核用户删除通过
      rejectDeletePass(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/deleteAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectPass
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核用户删除通过成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: '审核用户删除通过失败', type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核用户禁用驳回
      rejectDisableBack(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/updateDisableAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectBack
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核用户禁用驳回成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: '审核用户禁用驳回失败', type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核用户禁用通过
      rejectDisablePass(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/updateDisableAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectPass
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核用户禁用成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: '审核用户禁用失败', type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核用户启用驳回
      rejectEnableBack(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/updateEnableAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectBack
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核用户启用驳回成功', type: 'waring',duration: 1000});
              } else {
                this.$message({message: '审核用户启用驳回失败', type: 'error',duration: 1000});
              }
            })
        })
      },
      // 审核用户启用通过
      rejectEnablePass(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/updateEnableAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectPass
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核用户启用通过成功', type: 'waring'});
              } else {
                this.$message({message: '审核用户启用通过失败', type: 'error'});
              }
            })
        })
      },
      // 审核用户编辑驳回
      rejectUpdateBack(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/updateAicAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectBack
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核用户编辑驳回成功', type: 'waring'});
              } else {
                this.$message({message: '审核用户编辑驳回失败', type: 'error'});
              }
            })
        })
      },
      // 审核用户编辑通过
      rejectUpdatePass(data) {
        this.$confirm('确认要操作这条记录', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'waring'
        }).then(() => {
          this.axios.post(`${this.SERVER}aicAudit/updateAicAudit`, {
            'submitContentId': data.submitContentId,
            'auditUserId': this.user.userId,
            'auditStatusId': rejectPass
          })
            .then(res => {
              if (res.status === 0) {
                this.$message({message: '审核用户编辑通过成功', type: 'waring'});
              } else {
                this.$message({message: '审核用户编辑通过失败', type: 'error'});
              }
            })
        })
      },


      // 点击查看详情
      showDetails(data) {
        // console.log(data.submitContentId)
        // console.log(data)
        switch (data.auditName) {
          case '审核通过':
            if (data.funName === '用户编辑') {
              this.$message({message: '该用户编辑数据暂时无法查看', type: 'waring'});
            } else {
              this.dialogVisible = true
              this.getAllUserInfo(data)
            }
            break
          case '审核拒绝':
            if (data.funName === '用户编辑') {
              this.$message({message: '该用户编辑数据暂时无法查看', type: 'waring'});
            } else {
              this.dialogVisible = true
              this.getAllUserInfo(data)
            }
            break
          case '等待审核':
            switch (data.funName) {
              case '用户注册':
                this.dialogVisible = true
                this.getAllUserInfo(data)
                break
              case '用户删除':
                this.dialogVisible = true
                this.getAllUserInfo(data)
                break
              case '用户编辑':
                this.updateDialogVisible = true
                this.getUserInfo(data)
                break
              case '用户启用':
                this.dialogVisible = true
                this.getAllUserInfo(data)
                break
              case '用户禁用':
                this.dialogVisible = true
                this.getAllUserInfo(data)
                break
            }
            break
        }


        // 打开弹出框   用户详情查看的id
        // if (data.funName === '用户编辑') {
        //   this.updateDialogVisible = true
        // } else {
        //   this.dialogVisible = true
        // }
        // 判断审核的情况
        // 判断查看详情的类型
        // switch (data.funName) {
        //   case '用户注册':   // 101701
        //     this.getAllUserInfo(data)
        //     break
        //   case '用户删除':   //
        //     this.getAllUserInfo(data)
        //     break
        //   case '用户编辑':
        //
        //     break
        //   case '用户启用':
        //     this.getAllUserInfo(data)
        //     break
        //   case '用户禁用':
        //     this.getAllUserInfo(data)
        //     break
        // }
        // 渲染数据
      },
      // 获取用户详情
      getAllUserInfo(data) {
        this.axios.get(`${this.SERVER}aicUserAudit/queryUserAuditInfo?aicUserAuditId=${data.submitContentId}`)
          .then(data => {
            if (data.status === 0) {
              this.form = data.result[0];
            } else {
              this.$message({message: data.msg, type: 'error'});
            }
          })
          .catch(error => {
            console.log(error);
          });
      },

      // 获取修改用户详情对比数据
      getUserInfo(data) {
        // 修改前数据
        this.axios.get(`${this.SERVER}aicUser/queryUserInfo?userAuditId=${data.submitContentId}`)
          .then(data => {
            if (data.status === 0) {
              this.updateFormAgo = data.result[0];
            } else {
              this.$message({message: data.msg, type: 'error'});
            }
          })
          .catch(error => {
            console.log(error);
          });
        //  修改后数据
        this.axios.get(`${this.SERVER}aicUserAudit/queryUserAuditInfo?aicUserAuditId=${data.submitContentId}`)
          .then(data => {
            if (data.status === 0) {
              this.updateForm = data.result[0];
              this.show1 = this.updateForm.userImage === this.updateFormAgo.userImage ? 0 : true
              this.show2 = this.updateForm.email === this.updateFormAgo.email ? 0 : true
              this.show3 = this.updateForm.userName === this.updateFormAgo.userName ? 0 : true
              this.show4 = this.updateForm.userFullName === this.updateFormAgo.userFullName ? 0 : true
              this.show5 = this.updateForm.statusName === this.updateFormAgo.statusName ? 0 : true
              this.show6 = this.updateForm.phone === this.updateFormAgo.phone ? 0 : true
              this.show7 = this.updateForm.wechat === this.updateFormAgo.wechat ? 0 : true
              console.log(this.show6)
              this.show8 = this.updateForm.typeName === this.updateFormAgo.typeName ? 0 : true
              this.show9 = this.updateForm.sexName === this.updateFormAgo.sexName ? 0 : true
            } else {
              this.$message({message: data.msg, type: 'error'});
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },


    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    components: {
      score
    }
  };
</script>
<style lang="scss">
  .el-table {

  .warning-row {
    background-color: bisque;
  }

  }
  .user-details {

  .el-dialog__header {
    background-color: #409EFF;
  }


  .el-dialog__footer {
    border-top: 1px solid lavenderblush;
  }

  .el-dialog__headerbtn .el-dialog__close {
    color: black !important;
  }

  .el-dialog__headerbtn .el-dialog__close:hover {
    color: red !important;
  }

  }
</style>
