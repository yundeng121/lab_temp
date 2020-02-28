<template>
  <div class="user">
    <div class="user_header">
      <van-icon name="setting-o" class="user_set" @click="toSetting"/>
      <div class="user_avatar">
        <img :src="avatar" @click="toLogin" alt="头像" width="55" height="55">
      </div>
      <div>{{nick_name}}</div>
    </div>

    <van-cell title="我的账单" is-link value="查看账单" @click="showBills"/>
    <van-row class="order_status">
      <van-col span="8" @click="withDraw">
        <div class="account_info">账户余额</div>
        <div>{{account_balance}}元</div>
      </van-col>
      <van-col span="8">
        <div class="account_info">信用额度</div>
        <div class="creditOff" v-if="credit_status==0" @click="openCredit">{{credits}}</div>
        <div class="creditOn" v-else>{{credits}}元</div>
      </van-col>
      <van-col span="8">
        <div class="account_info">已提现</div>
        <div>{{withdrawn}}元</div>
      </van-col>
    </van-row>
    <van-dialog class="withdraw" v-model="isWithdraw" title="确认提现" show-cancel-button @confirm="submitWithdraw">
    </van-dialog>
    
    <div class="bill">
      <van-cell title="我的消息" is-link value="查看消息" @click="showMessages"/>
    </div>

    <van-cell title="我的订单" is-link value="全部订单" @click="showOrders"/>
    <van-row class="order_status">
      <van-col span="8" v-for="(item,index) in tabItems" :key="index" @click="showOtherOrders(item)">
        <div class="order_status_icon">
          <van-icon :name="item.icon"/>
        </div>
        <div>{{item.title}}</div>
      </van-col>
    </van-row>

    <van-cell-group class="menu">
      <van-cell title="账户信息" icon="idcard" @click="changeCount" is-link />   
      <van-cell title="设置手机号" icon="phone-o" @click="changePhone" is-link />
      <van-cell title="意见反馈" icon="service-o" is-link to="" />
    </van-cell-group>
    <van-dialog v-model="isSetCount" title="填写账户信息" show-cancel-button @confirm="submitCount">
      <div v-if="isEditCount===true">
        <van-cell-group>
          <van-field v-model="name" :placeholder="name" clearable label="姓名" />
          <van-field v-model="count" :placeholder="count" clearable label="账户"/>
        </van-cell-group>
      </div>
      <div class="edit" v-else>
        <van-cell-group>
          <van-cell title="姓名" :value="name" />
          <van-cell title="账户" :value="count" />
        </van-cell-group>
        <van-button type="default" block plain hairline @click="isEditCount=true">编辑</van-button>
      </div>
    </van-dialog>
    <van-dialog v-model="isSetPhone" title="设置手机号码" show-cancel-button @confirm="submitPhone">
      <van-cell-group>
        <div v-if="isEditPhone===true">
          <van-field v-model="phone" label="手机号" :placeholder="phone" clearable required left-icon="phone-o" />
          <van-field v-model="code" label="验证码" clearable required left-icon="closed-eye">
            <span class="getCode" slot="button" @click="getCode">{{btnText}}</span>
          </van-field>
        </div>
        <div class="edit" v-else>
          <van-cell-group>
            <van-cell title="手机号" title-width=30px :value="phone" />
          </van-cell-group>
          <van-button type="dafault" block plain hairline @click="isEditPhone=true">编辑</van-button>
        </div>
      </van-cell-group>
    </van-dialog>
    <van-button v-if="isLogin===1" type="danger" block @click="logout">退出登录</van-button>
  </div>
</template>

<script>
  import avatar_default from '@/assets/avatar_default.png'
  import Vue from 'vue';
  import { Row, Col, Icon, Cell,Button,CellGroup,Toast,Popup,Dialog } from 'vant'

  Vue.use(Icon)
  Vue.use(Cell)
  Vue.use(Button)
  Vue.use(CellGroup)
  Vue.use(Popup)

  import { getInfo,logout,open_credit,set_ali_account,set_phone_number,send_verify_code,send_withdraw } from '@/axios/api'
  import store from '@/store'
  export default {
    name: "user",
    data() {
      return {
        nick_name: '您当前未登录',
        avatar: avatar_default,
        account_balance: 0,
        credit_status:0,
        credits: '未开通',
        withdrawn: 0,
        isLogin:0,
        isSetCount:false,
        isEditCount:false,
        count:'',
        name:'',
        isWithdraw:false,
        isSetPhone:false,
        isEditPhone:false,
        phone:'请输入手机号',
        code:'',
        btnText:'发送验证码',
        tabItems:[{
          icon: 'completed',
          title: '已付款',
          name: 1
        }, {
          icon: 'sign',
          title: '已结算',
          name: 2
        }, {
          icon: 'failure',
          title: '已失效',
          name: 3
        }],
      };
    },
    activated () {
      if(!store.state.userInfo){
        this.getUserInfo()
      }
    },
    components: {
      [Row.name]: Row,
      [Col.name]: Col,
      [Dialog.Component.name]: Dialog.Component
    },
    methods: {
      getCode: function () {
        if (this.phone == '') {
          Toast("手机号不能为空");
          return false;
        } else if (!/^1[345678]\d{9}$/.test(this.phone)) {
          Toast("请输入正确的手机号");
          return false;
        } else {
          if (this.btnDisabled) {
            return;
          }
          this.getSecond(60);
          send_verify_code({
            phone_number: this.phone
          }).then(res => {
            if (res.code === 200) {
              Toast('验证码已发送')
            }
          });
        }
      },
      getSecond(wait) {
        let _this = this;
        let _wait = wait;
        if (wait == 0) {
          this.btnDisabled = false;
          this.btnText = "获取验证码"
          wait = _wait;
        } else {
          this.btnDisabled = true;
          this.btnText = "验证码(" + wait + "s)"
          wait--;
          setTimeout(function () {
            _this.getSecond(wait);
          }, 1000);
        }
      },
      submitPhone:function() {
        set_phone_number({
          phone_number:this.phone,
          smsCode:this.code
        }).then(res =>{
          Toast(res.data)
          store.commit('setUserInfo','')
          this.getUserInfo()
        })
      },
      withDraw() {
        this.isWithdraw=true;
      },
      getUserInfo() {
        if(!store.state.userInfo){
          getInfo().then(res => {
            const userInfo = JSON.stringify(res.data);
            store.commit('setUserInfo',userInfo)
            this.nick_name = res.data.nickname;
            this.avatar = res.data.headimgurl;
            this.account_balance = res.data.rebate;
            if(res.data.credit_flag === 1){
              this.credit_status = res.data.credit_flag
              this.credits = res.data.credit_line
            }
            this.name = res.data.ali_username
            this.count = res.data.ali_account
            this.phone = res.data.phone_number
            this.isLogin = 1
          })
        } else {
          const userInfo = JSON.parse(store.state.userInfo)
          this.nick_name = userInfo.nickname;
          this.avatar = userInfo.headimgurl;
          this.account_balance = userInfo.rebate;
          if(userInfo.credit_flag === 1){
            this.credit_status = userInfo.credit_flag
            this.credits = userInfo.credit_line
          }
          this.name = userInfo.ali_username
          this.count = userInfo.ali_account
          this.phone = userInfo.phone_number
          this.isLogin = 1
        }
      },
      toSetting: function () {
        
      },
      showBills:function () {
        Toast('正在开发中')
        /*if (!store.state.token) {
          Toast('请您先登录')
          this.$router.replace({path: '/login'})
        } else {
          this.$router.push({path:'/bill'})
        }*/
      },
      showMessages:function() {
        Toast('正在开发中')
      },
      showOrders: function() {
        if (!store.state.token) {
          Toast('请您先登录')
          this.$router.replace({path: '/login'})
        } else {
          store.commit('setOrderTab',0)
          this.$router.push({path:'/order'})
        }
      },
      showOtherOrders:function(item){
        if (!store.state.token) {
          Toast('请您先登录')
          this.$router.replace({path: '/login'})
        } else {
          store.commit('setOrderTab',item.name)
          this.$router.push({path:'/order'})
        }
      },
      toLogin: function () {
        if (!store.state.token) {
          this.$router.replace({path: '/login'})
        }
      },
      changeCount:function(){
        this.isSetCount=true
        if(this.count){
          this.isEditCount=false
        }      
      },
      changePhone:function(){
        this.isSetPhone=true
        if(this.phone){
          this.isEditPhone=false
        }
      },
      submitCount:function(){
        set_ali_account({
          ali_account:this.count,
          ali_username:this.name
        }).then(res =>{
          Toast(res.data)
          store.commit('setUserInfo','')
          this.getUserInfo()
        })
      },
      submitWithdraw:function(){
        send_withdraw().then(res => {
          console.log(res)
          if(res.data.code === 200) {
            Toast(res.data.data)
          }
        }).catch(error => {
          console.log(error)
        })
      },
      logout: function() {
        logout().then(res => {
          if(store.state.token)
          if(res.data.code === 200){
            store.commit('setToken','')
            store.commit('setUserInfo','')
            this.$router.replace({path:'/'})
          }
        })
      },
      openCredit:function() {
        if (!store.getters.getToken) {
          Dialog.confirm({
            title: '您当前未登录',
            message: '您未登录，无法开通信用额度！' +
                '<br/>点击<span style="color:red">确定</span>，去登录'
          }).then(() => {
            // on confirm
            this.$router.push({
              name: 'wechat_confirm'
            })
          })
        } else {
          //已登录
          Dialog.confirm({
            title: '开通信用额度',
            message: '请确认您当前是否继续开通信用额度',
          }).then(() =>{
            open_credit().then(res => {
              if(res.code === 200) {
                Toast(res.data)
                store.commit('setUserInfo','')
                this.getUserInfo()
              } else {
                Toast(res.message)
              }
            })
          }).catch(() =>{
            Toast('取消开通')
          })
        }
      }
    }
  }
</script>

<style scoped>
  .edit .van-button{
    width:90%;
    margin:auto;
  }
  .user{
    width:100%;
    margin-bottom: 50px;
    background-color:#f5f5f5;
  }
  .user_header {
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    height: 130px;
    box-sizing: border-box;
    text-align: center;
    background-color: #f22d36;
    color: #fff;
    padding-top: 30px;
    margin-bottom: 10px;
  }

  i.user_set {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 24px;
  }

  .user_avatar {
    margin-bottom: 10px;
  }

  .user_avatar img {
    border: 0;
    border-radius: 50%;
  }

  .bill {
    margin-bottom: 10px;
  }

  .order_status {
    background-color: #fff;
    text-align: center;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .order_status_icon {
    position: relative;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-block;
  }

  .order_status_icon i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-size: 24px;
    color: #000;
  }
  .menu{
    margin-bottom:10px;
  }
</style>
