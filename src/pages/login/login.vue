<template>
  <div class="login" style="background-image: url('static/login.jpg');background-size: 100% 100%;background-repeat: no-repeat">
    <div class="middle-wrapper" style="top: 55%">   
      <el-card style="width: 600px;height:60%; float: right; margin-right: 15%;background-color: rgb(238,238,238);position: relative;border-radius:15px;" :body-style="{'padding': '20px 55px 75px 55px'}">
        <img src="static/login_title.png" style="position: absolute; left:50%;top:60px;transform: translateX(-50%);width:243px;height:34px"></img>
        <div style="color:#272727;font-size:24px;text-align:center;margin-top:120px">
          高精短时天气预警平台 <span style="color:#417FB8; font-size:16px;font-weight:700;border-left:2px solid #417FB8;padding-left:10px;font-style: italic"> 客户订阅管理系统</span>
        </div>
        <el-form id="login_from"
          ref="loginForm"
          :model="form"
          :rules="rules">
          <el-form-item prop="name">
            <el-input v-model="form.userName" placeholder="请输入账号">
              <i slot="prefix" class="iconfont icon-user" style="font-size: 25px;color:#9CB7D7;position: absolute;left:-2px"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :type="passwordType" v-model="form.password" placeholder="请输入密码" clearable @keyup.enter.native="login">
              <i slot="prefix" class="iconfont icon-password" style="font-size: 24px;color:#9CB7D7;"></i>
              <i slot="suffix" class="el-input__icon el-icon-view" style="cursor: pointer;"
                 @click="_togglePasswordType"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="yanzhengma" >
            <div class="check-code-wrapper">
              <div class="yanzhengma-wrapper" style="border-bottom: 1px solid rgb(157,186,220);line-height: 0">
                <el-row>
                  <el-col :span="16">
                    <el-input v-model="form.yanzhengma" style="border: none;" placeholder="请输入验证码">
                    </el-input></el-col>
                  <el-col :span="8">
                    <div class="validate-code-wrapper">
                      <validate-code ref="validate-code" @change="_setCheckCode"></validate-code>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form-item>
          <el-form-item style="margin-bottom: 0;margin-top: 50px">
            <div class="check-code-wrapper">
              <div class="button-wrapper">
                <el-button
                  type="primary"
                  class="login-btn"
                  style="width: 100%;"
                  @click="loginHandle('loginForm')"
                  @keyup.enter.native="loginHandle('loginForm')">
                  登陆
                </el-button>
              </div>
              <el-row style="text-align: right;padding-right: 20px;font-size:20px;"><el-link type="primary">忘记密码</el-link></el-row>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
  // 导入页面
  import validateCode from 'src/components/ValidateCode/index';
  // 导入接口
  import {login} from 'src/api/data/login/index'
  import md5 from 'js-md5';
  import url from 'static/u1237.png';

  export default {
    /**
     * @Description:  页面渲染初始加载的方法
     * @Author: Mr.Wang
     * @Date: 2019/5/29
     */
    created() {
      this.url = url
      var _self = this;
      var key;
      document.onkeydown = function (e) {
        if (window.event === undefined) {
          key = e.keyCode;
        } else {
          key = window.event.keyCode;
        }
        if (key === 13) {
          _self.loginHandle('loginForm');
        }
      }
    },
    /**
     * @Description:  常用于rules内的validator函数定义
     * @Author: Mr.Wang
     * @Date: 2019/5/29
     */

    data() {
      var checkYanzhengma = (rule, value, callback) => {
        value = value.toUpperCase();
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else if (value !== this.checkCode) {
          callback(new Error('验证码错误'));
          this.$refs['validate-code'].draw();
        } else {
          callback();
        }
      };
      /**
       * @Description: 初始化定义页面上的值(类似小程序js的data)
       * @Author: Mr.Wang
       * @Date: 2019/5/29
       */

      return {
        url: undefined,
        passwordType: 'password',
        checkCode: '',
        form: {
          userName: '',
          password: '',
          yanzhengma: ''
        },
        adminCode: 0, // 管理员复选框，0代表默认，1代表管理员
        rules: {
          userName: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          yanzhengma: [
            {validator: checkYanzhengma, trigger: 'blur'}
          ]
        },
        returnPassowrd: undefined
      };
    },
    methods: {
      _setCheckCode(value) {
        this.checkCode = value;
      },
      _togglePasswordType() {
        if (this.passwordType === 'password') {
          this.passwordType = 'text';
        } else {
          this.passwordType = 'password';
        }
      },
      loginHandle(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.login();
          }
        });
      },
      login() {
        // 存入用户信息
       
        this.returnPassowrd = this.form.password
        this.form.password = md5(this.form.password).toUpperCase();
        this.axios.post('/aicCustomer/login',{
          code: this.form.userName,
          pwd:this.form.password
        }).then(res =>{
         
          // 成功
          if (res.status === 0) {
           // 存用户id
           let id = res.result.cus_id
           this.$store.commit('SET_ID', id);
            // 存token
            let token = res.result.token;      
            this.$store.commit('SET_TOKEN', token);
            // 存入用户信息
            let user = res.result.code;
            this.$store.commit('SET_USER', user);
            this.$router.replace('home');
          }else if(res.status === 200){
            // 停用
             
              this.$message({message: '该用户已被停用或删除', type: 'error',duration: 1000});
              this.form.password = this.returnPassowrd
          }else if(res.status === 101) {
            //  输入错误
              this.$message({message: '账号或者密码错误', type: 'error',duration: 1000});
              this.form.password = this.returnPassowrd
          }  
        })
        /*
         *  在这边可以进行登陆请求
         *  将请求返回的Token对象存到store中
         *  @Token  token对象
        */  
        // login(this.form).then(res => {    
     
        //   if (res.status === 0) {
        //     if (res.result.status === 100401) {
        //       if (res.result.type === 100301 || res.result.type === 100302 || res.result.type === 100303) {
        //         // 登录成功进行管理员跳转
        //         // 使用shiro后替换固定token
        //         let token = 'a94756da-2962-40ae-bdea-787fd02c9d92';
        //         this.$store.commit('SET_TOKEN', token);
        //         // 存入用户信息
        //         let user = res.result;
        //         this.$store.commit('SET_USER', user);
        //         this.$router.replace('home');
        //         // 在请求成功后把document.onkeydown置为undefined
        //         document.onkeydown = undefined;
        //       }
        //     } else {
        //       this.$message({message: '该用户已被停用或删除', type: 'error'});
        //       this.form.password = this.returnPassowrd
        //     }
        //   } else {
        //     // 账号或者密码错误  
        //     this.$message({message: '账号或者密码错误', type: 'error'});
        //     this.form.password = this.returnPassowrd
        //   }
        // })
      }
    },
    components: {
      validateCode
    }
  }
  ;
</script>

<style lang="scss" scoped>
  .login {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*background-color: rgb(32, 160, 255);*/
    .middle-wrapper {
      position: fixed;
      width: 100%;
      margin: 0 auto;
      top: 50%;
      transform: translateY(-60%);

      .title-wrapper {
        margin-top: 50px;
        margin-bottom: 30px;
        text-align: center;
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
      }
      .login-form {
        position: relative;
        margin: 0 auto;
        width: 520px;
        padding: 30px 50px;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: #ffffff;

        .el-row {
          margin-bottom: 20px;

          &:last-child {
            margin-bottom: 0;
          }

          .login-btn {
            width: 100%;
          }
        }

        .check-code-wrapper {
          display: flex;
          justify-content: space-between;
          height: 40px;

          .yanzhengma-wrapper {
            flex: 0 1 auto;
          }

          .validate-code-wrapper {
            flex: 0 0 160px;
          }

          .button-wrapper {
            flex: 0 0 160px;
          }
        }
      }
    }
  }
</style>
<style scoped>
  #login_from {
    margin-top:50px;
    font-size: 20px;
  }
  >>>.el-form-item{
    margin-bottom: 32px!important;
  }
  #login_from>>>.el-input{border-radius:0;border-bottom: 1px solid rgb(157,186,220)}
  #login_from>>>.el-input__inner{border: none;background-color: rgba(0,0,0,0);padding-left:40px;font-size:20px}
  >>>.el-divider__text, .el-link {
    font-size:20px;
  }
  .check-code-wrapper>>>.el-input__inner {
    padding-left:15px!important;
  }
  >>>.el-input__prefix {
    left:10px!important;
  }
  .button-wrapper>>>.el-button {
    font-size: 20px!important;
  }
  >>>.el-button--primary {
    background-color:#2D78D3;
    
  }
  .pre_icon{
    background-size: 90%;
    background-repeat: no-repeat;
    background-position: center center;
    color: rgba(0,0,0,0);
  }
  >>>input::-webkit-input-placeholder{
    color: #9CB7D7;
  }
</style>
