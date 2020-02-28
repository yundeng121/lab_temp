<template>
    <div class="login">
        <div class="store_header">
            <div class="store_avatar">
                <img src="@/assets/avatar_default.png" alt="logo">
            </div>
            <div class="store_name">TalentYou优惠平台</div>
        </div>
        <div>我们将发送验证码到您的手机</div>
        <van-field
            v-model="phone"
            label="手机号"
            clearable
            required
            title-width=20px
            left-icon="phone-o"
        />
        <van-field
            v-model="code"
            label="验证码"
            clearable
            required
            title-width=20px
            left-icon="closed-eye"
        >
            <span class="getCode" slot="button" @click="getCode">{{btnText}}</span>
        </van-field>
        <van-button type="danger" block @click="submitCode">登录</van-button>
        <div class="connect">
            <span @click="Kefu">联系客服</span>
        </div>
        
        <div class="anyLogin" @click="getWX">
            <div>
                <img src='@/assets/weixin.png' alt='微信'>
            </div>
            <div>微信登录</div>
        </div>

        <van-popup v-model="showKefu">
            <Kefu/>
        </van-popup>
    </div>
</template>

<script>
    import Vue from "vue"
    import {Field, Toast, Popup, Icon} from "vant"
    import {send_verify_code, verify_code_login} from '@/axios/api'
    import Kefu from '@/components/model/KeFu'

    Vue.use(Toast)
    Vue.use(Field)
    Vue.use(Popup)
    Vue.use(Icon)
    export default {
        name: "login",
        data() {
            return {
                phone: '',
                code: '',
                btnDisabled: false,
                btnText: '获取验证码',
                showKefu: false,
            }
        },
        components: {
            Kefu
        },
        methods: {
            Kefu: function () {
                this.showKefu = true
            },
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
            submitCode: function () {
                if (this.code == '') {
                    Toast("验证码不能为空");
                    return false;
                } else {
                    verify_code_login({
                        phone_number: this.phone,
                        smsCode: this.code
                    }).then(
                        this.$router.replace({path: '/'})
                    )
                }
            },
            getWX: function () {
                this.$router.push({path:'/wechat_confirm'})    
            },
            /*
            test:function() {
                login({
                    openid:'oy_6jwbcLUh_wsZW8cbFOAmVu9-s',
                    password:'oy_6jwbcLUh_wsZW8cbFOAmVu9-s'
                }).then(
                    this.$router.replace({path:'/'})
                )
            }*/
        }
    }
</script>

<style scoped>
  .store_header {
    text-align: center;
    padding: 30px 0;
  }

  .store_avatar img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }

  .store_name {
    padding-top: 5px;
    font-size: 16px;
  }

  .login {
    padding-top: 30px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 14px;
  }

  .connect {
    margin-top: 15px;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    color: grey;
    font-size: 13px;
  }
  
  .anyLogin {
      margin-top: 20px;
      text-align:center;
      color:grey;
  }
  
  .getCode {
    text-align: center;
    color: red;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    background-color: #f2f2f2;
    text-align: center;
  }

  .custInfo {
    padding: 20px 30px;
  }

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .custinfo img {
    width: 180px;
    height: 180px;
  }
</style>
