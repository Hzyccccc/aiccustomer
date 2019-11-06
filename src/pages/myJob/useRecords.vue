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
          <div class="table-wrapper">
            <div style="text-align: center; font-size: 26px; margin-bottom: 20px">
              <label>我的登录记录</label>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="加载数据中"
              max-height="500px"
              :data='tableData'
              border
              :header-cell-style="{background:'#f7f7f7'}"
              stripe>
              <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
              <el-table-column label="用户名" prop="name" align="center"></el-table-column>
              <el-table-column label="登录时间" prop="login_time" align="center"></el-table-column>
              <el-table-column label="登录描述" prop="description" align="center"></el-table-column>
              <el-table-column label="注销时间" prop="logout_time" align="center"></el-table-column>
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


  </div>
</template>
<script>
  import {formatDate} from 'src/utils/utils';

  var server = null;
  var axois = null;
  export default {
    created() {
      this.getTableData()
    },
    data() {
      return {
        loading:'',
        tableData:[],
        total:1,
        currentpage:1,
        pagesize: 10
      }
    },
    methods: {
      getTableData() {
        this.loading = true;
        this.axios.post('/cssLogin/findByUser',{
          currentPage: this.currentpage,
          pageSize: this.pagesize,
          userId: this.$store.state.id
        })
          .then(data => {
            if (data.status === 0) {        
              this.tableData = data.result.list;
              this.total = data.result.total; 
            } else {
              this.$message({message: data.msg, type: 'error',duration: 1000});
            }
            this.loading = false;
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
      components: {}
    }
  }
</script>
<style lang="scss">

</style>
