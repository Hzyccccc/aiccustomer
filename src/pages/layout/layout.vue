<template>
  <div class="layout">
    <!-- 头部 -->
    <div class="topbar-wrapper" style="background-image: url('static/title.png');">
      <div class="logo float-left" style="display: inline-block; margin-left: 2%">
        <img width="145px;" height="80px" src='static/logo.png'>
      </div>
      <div class="title float-left" style="margin-left: 2% ;color: white ;font-size:28px;">高精短时天气预警平台   <i style="font-size:20px;padding-left:20px;"> —— 客户订阅管理系统</i></div>
      <ul class="menu-list float-right">
        <li v-if="user" class="menu-item" style="padding: 0;">
          <el-dropdown
            :show-timeout="10"
            :hide-timeout="10"
            @command="handleCommand"
            style="padding: 0 15px;">
            <div class="dropdown-content el-dropdown-link">
              <img  style="margin-top: 10%" width="50px"  height="50px" src="static/user.png">
              <span class="text" style="color: white; font-size: 22px ; margin-top: -30%" >{{user}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">{{user}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <!--<li class="menu-item">-->
        <!--<i class="icon el-icon-adm-help"></i>-->
        <!--</li>-->
        <li class="menu-item" @click="exit">
          <i class="icon iconfont el-icon-adm-exit" style="color: white ; margin-top:65%"></i>
        </li>
      </ul>
    </div>
    <!-- 侧边栏 -->
    <div class="siderbar-wrapper" :style="{width: this.isCollapsed?'64px':'200px'}">
      <div class="menu-collapse-wrapper float-right" style="position: relative;width: 100%;padding-right: 10px;padding-top: 40px;background: #C2C5CC;" @click="toggleMenu">
        <i class="el-icon-adm-menu" style="position: absolute;right: 10px;top: 10px;" :style="{transform: 'rotateZ(' + (this.isCollapsed ? '90' : '0') + 'deg)'}"></i>
      </div>
      <el-menu
        background-color="#D4D9DF"
        text-color="black"
        style="color:#454545"
        active-text-color="white"
        class="menu-wrapper"
        router
        unique-opened
        :collapse="isCollapsed"
        :default-active="$route.path">
        <template v-for="(item, index) in sider_menu_data">
          <el-menu-item class="menu-item" v-if="!item.children" :index="item.path" :key="index">
            <!-- <img  width="20px" height="20px" :src="item.icon" > -->
            <i :class="item.icon" style="color:#84868B; margin-right: 5px" ></i>
             <span slot="title">&nbsp;{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.path">
            <template slot="title">
              <i :class="item.icon" style="color:#454545; margin-right: 5px"></i>
              <!-- <img  width="20px" height="20px" :src="item.icon" > -->
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item class="menu-item" v-for="(sub_item, sub_index) in item.children" :index="sub_item.path"
                          :key="sub_index">
              <span slot="title" style="margin-left:12px;">{{sub_item.title}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    

    <!-- 中间内容区 -->
    <div class="content-wrapper" ref="content-wrapper" :style="{left: this.isCollapsed?'64px':'200px'}">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <!-- 底部
    <footer style="border-top: solid #A0A0A0 1px;" >
       <div class="footer-hzy">
          <span>	&copy;2017-2019&nbsp;北京四维智联科技有限公司</span>
          
          <span>
            <div class="flooticon-hzy">
              <img src="/static/title3.png" alt="" style="width:15px;height:15px">
            </div>
            京ICP备08100418号-10
          </span>
       </div>
    </footer> -->
  </div>
</template>
<script>
  import {sessionStorage} from 'src/assets/js/storage';

  export default {
    created() {
      this.checkAuth();
    },
    data() {
      return {
        sider_menu_data: [ 
          {
            path: '/home/index',
            title: '首页',
            icon: 'iconfont icon-01'
          },
          {
            path: '/service/index',
            title: '我的关注服务',
            icon: 'iconfont icon-wode'
            
          },
          {
            path: '/supplier',
            title: '订阅服务管理',
            icon: 'iconfont icon-iconfontzhizuobiaozhun023108',
            children: [
              {
                path: '/supplier/Already',
                title: '已订阅服务列表',
                icon: 'el-icon-adm-vertify'
              },
              {
                path: '/supplier/added',
                title: '+新增订阅服务',
                icon: 'el-icon-adm-vertify'
              }
            ]
          },
          {
            path: '/Subscription',
            title: '订阅服务监控',
            icon: 'iconfont icon-jiankong',
            children: [
              {
                path: '/Subscription/ServiceRecord',
                title: '服务推送记录',
                icon: 'el-icon-adm-vertify'
              },
              {
              path: '/Subscription/CallRecord',
              title: '接口调用记录',
              icon: 'el-icon-adm-vertify'
            }
            ]
          },
          {
            path: '/myJob/useRecords',
            title: '我的使用记录',
            icon: 'iconfont icon-jiludanzilishijilu'
          },
          {
            path: '/myJob/operatingLog',
            title: '我的操作记录',
            icon: 'iconfont icon-lishijilu'
          }
        ],
        nomal_menu_data: [
          
         
        ],
        isCollapsed: false,
        adminMenuShow: false
      }
    },
    computed: {
      user() {
        // console.log(this.$store.state);
        
        return this.$store.state.user;
      }
    },
    mounted() {
      if (this.$store.state.menuCode === -1) {
        this.sider_menu_data = this.nomal_menu_data;
      }
    },
    methods: {
      checkAuth() {
        let token = this.$store.state.token || sessionStorage.getItem('token');
        if (!token) {
          this.$router.replace('/login');
        }
      },
      handleCommand(command) {
        console.log(command);
      },
      toggleMenu() {
        this.isCollapsed = !this.isCollapsed;
      },
      exit() {
        this.$confirm('即将退出系统登陆，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 注销接口
            console.log(this.$store.state.id);
            
            this.axios.post('/aicCustomer/exitLogin',{
              userId: this.$store.state.id
            }).then(res =>{
              if (res.status === 0) {
                this.$store.commit('SET_TOKEN', null);
                this.$store.commit('SET_ID', null);
                this.$store.commit('SET_USER', null);
                this.$store.commit('SET_MENUCODE', null);
                this.$router.replace({path: '/login'});
                // this.sessionStorage.removeItem('token');
              }else{
                this.$message({message: "退出失败", type: 'error'});
              }
            })      
          })
          .catch(() => {
            return false;
          })
      }
    }
  }
</script>
<style lang="scss">
  @import '../../assets/styles/variable.scss';
//   .flooticon-hzy {
//   width: 5px;
//   height: 5px;
//   position: absolute;
//   top: 1px;
//   left: -18px;
// }
// footer {
//   position: fixed;
//   bottom: 0px;
//   left: 0;
//   width: 100%;
// }
// .footer-hzy {
//   padding-top: 1%;
//   display: flex;
//   justify-content: center;
//   height: 15%;
  
// }
// .footer-hzy span {
//   margin-right: 75px;
//   margin-left: 75px;
//   position: relative;
//   }
  .siderbar-wrapper {
    position: fixed;
    top: 80px;
    bottom: 0;
    left: 0;
    height: 8;
    color:"#454545";
    width: $siderbarWidth;
    
    z-index: 11;
    background-color: #D4D9DF;
    transition: all 0.3s ease-in-out;
  }
  .float-left {
    line-height: 80px;
    height: 80px;
  }
  .content-wrapper {
    width: auto;
    height:90%;
  }
  .menu-wrapper {
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    border-right: none;
    transition: all 0.3s ease-in-out;

  &:not(.el-menu--collapse) {
    overflow-y: auto;
    overflow-x: hidden;
  }

  i {
    color: #78797B;
  }

  .menu-item {
  &.is-active {
    background-color: #0581DB !important;
     color: #FFFFFF !important;
  }

  // &:hover {
  //    background-color: #AAAEB2 !important;
  //    color: #FFFFFF !important;
  // }
  }
  .el-submenu__title:hover {
    /*color: #65CEA7 !important;*/
  }
  .el-submenu, .el-menu-item {
    width: 100%;
  }

  }

  .topbar-wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    height: 80px;
    // height: $topbarHeight;
    line-height: $topbarHeight;
    padding: 0 24px 0 0;
    /*background-color: $topbarBackgroundColor;*/
    
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    transition: all 0.3s ease-in-out;
    z-index: 12;

  .menu-collapse-wrapper {
    height: 100%;
    width: 48px;
    text-align: center;
    cursor: pointer;

  i {
    transition: all 0.3s ease-in-out;
  }

  }

  .title {
    height: 100%;
    font-weight: bold;
  }

  .menu-list {

  .menu-item {
    position: relative;
    float: left;
    padding: 0 15px;
    min-width: 45px;
    height: 48px;
    text-align: center;
    font-size: 0px;

  &:hover {
    cursor: pointer;
    /*background-color: #F5F5F5;*/
  }

  .icon {
    vertical-align: middle;
    font-size: 24px;
  }

  .text {
    display: inline-block;
    vertical-align: middle;
    margin-left: 4px;
    font-size: 16px;
  }

  }
  }
  }

  .content-wrapper {
    position: fixed;
    left: $siderbarWidth;
    right: 0;
    top: 80px;
    bottom: 0;
    margin: 20px 0 0 20px;
    overflow: auto;
    transition: all 0.3s ease-in-out;

  .content {
    position: relative;
    width: 100%;
    height: 100%;
  }
  }
</style>
