<template>
    <div>
        <div class="title">
            <img src="@/assets/wait.png" alt='wait' />
            <div>您确定要使用当前微信<br>登录TalentYou优惠平台吗</div>
        </div>
        
        <div class = "operate">
            <van-button type="primary" block @click="confirm">确定</van-button>
            <van-button type="default" block @click="cancel">取消</van-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'wechat_confirm',
    methods:{
        confirm() {
            location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4b847b5fbbaaeda6&redirect_uri=https%3A%2F%2Fcoupon.talentyou.cn%2Fapi%2Fv1%2Fwechat_login&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect')
        },
        cancel() {
            let numberOfEntries = window.history.length;
            if (numberOfEntries === 1) {
                this.$router.replace({
                    name: 'home'
                })
            } else {
                this.$router.go(-1)
            }
        }
    }
}
</script>
<style scoped>
    .title {
        margin-top: 60px;
        text-align: center;
    }
    .operate {
        width:90%;
        padding: 5%;
    }
    .operate .van-button{
        margin-bottom: 15px;
    }
</style>