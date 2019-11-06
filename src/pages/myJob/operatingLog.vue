

<template>
  <div class="index">
    <el-row>
      <el-col :span='24'>
        <el-card>
          <div class="table-wrapper">
            <div style="text-align: center; font-size: 26px; margin-bottom: 20px">
              <label>我的操作记录</label>
            </div>
            <el-table
              v-loading="loading"
              element-loading-text="加载数据中"
              :data='tableData'
              max-height="500px"
              border
              align="center"
              :header-cell-style="{background:'#f7f7f7'}"
              stripe>
              <el-table-column label="序号" width="60px" type="index" align="center"></el-table-column>
              <el-table-column label="用户名"  prop="name" align="center"></el-table-column>
              <el-table-column label="操作时间"  prop="create_time" align="center"></el-table-column>
              <el-table-column label="操作类型"  prop="dic_name" align="center"></el-table-column>
              <el-table-column label="操作状态"  prop="msg" align="center"></el-table-column>
              <el-table-column label="操作表名" prop="table_name" align="center"></el-table-column>
              <el-table-column label="记录ID" prop="key_id" align="center" ></el-table-column>
              <el-table-column label="备注" prop="description" align="center" ></el-table-column>
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
  import score from 'src/components/Score';
  import md5 from 'js-md5';

  var server = null;
  var axois = null;
  var editId = null;
  export default {
    created() {
      this.getTableData();
      server = this.SERVER;
      axois = this.axios;
    },
    data() {
      return {
        tableData: [],
        loading: false,
        pagesize: 10,
        currentpage: 1,
        total: 0
      }
    },
    methods: {
      getTableData() {
        this.axios.post('/cssOperation/showAll',{
        userId: this.$store.state.id,
        currentPage: this.currentpage,
        pageSize:this.pagesize
      }).then(res =>{
        
        if(res.status === 0){
          this.tableData = res.result.list
          this.total = res.result.total
         console.log(res.result.list);
          this.loading = false;
        }else{
          this.$message({message: '订阅失败', type: 'error',duration: 1000})
        }
      }).catch(req=>{
          this.$message({message: '订阅失败', type: 'error',duration: 1000})
      })
      
      },
      handleSizeChange(value) {
        this.pagesize = value;
        this.getTableData();
      },
      handleCurrentChange(value) {
        this.currentpage = value;
        this.getTableData();
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
    background-color: lavenderblush;
  }

  .el-dialog__footer {
    border-top: 1px solid lavenderblush;
  }

  }
</style>
