<template>
    <div>
        <van-panel 
            :title="platform_CN"
            :status="status_CN"
        >
            <div class="order_detail">
                <ul class="order_info">
                    <ol>订单号：{{orders.trade_id}}</ol>
                    <ol>下单时间：{{orders.created_at}}</ol>
                </ul>
                <span class="order_amount">￥{{orders.rebate}}</span>
            </div>
        </van-panel>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Panel } from 'vant';

    Vue.use(Panel);
    export default{
        name:'OrderCard',
        props:['orders','status'],
        computed: {
            platform_CN() {
                switch (this.orders.platform) {
                    case 'jd':
                        return '京东'
                    case 'tb':
                        return '淘宝'
                    case 'pdd':
                        return '拼多多'
                    default:
                        return '平台名称'
                }
            },
            status_CN() {
                switch (this.status) {
                    case 'all':
                        return ''
                    case 'valid':
                        return '已付款'
                    case 'rebated':
                        return '已结算'
                    case 'invalid':
                        return '已失效'
                    default:
                        return '状态'
                }
            }
        },
    }
</script>

<style>
    .van-panel{
        text-align:left;
    }
    .order_detail{
        display:flex;
        justify-content:space-between;
        text-align:left;
        padding:10px 20px;
        line-height:30px;
    }
    ul{
        font-size:12px;
    }
    .order_amount{
        line-height:55px;
    }
</style>