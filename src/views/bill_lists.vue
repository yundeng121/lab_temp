<template>
    <div>
        <van-nav-bar
            title="账单"
            left-arrow
            @click-left="onClickLeft"
        />
        <div class="sort">
            <van-tag round type="primary" size="large" >本月</van-tag>
            <div class="count">
                <div>收入{{income}}</div>
                <div>支出{{expense}}</div>
            </div>
        </div>
        <van-list
            v-model="loading"
            finished-text="没有更多了"
            :finished="finished"
            @load="load()"
        >

        </van-list>
    </div>
</template>
<script>
    export default{
        name:'BillList',
        data(){
            return{
                income:0,
                expense:0,
                finished:false,
                loading:false,
            }
        },
        methods:{
            onClickLeft() {
                let numberOfEntries = window.history.length;
                if (numberOfEntries === 1) {
                    this.$router.replace({
                        name: 'home'
                    })
                } else {
                    this.$router.go(-1)
                }
            },
            load() {
                
            }
        }
    }
</script>
<style>
    .sort{
        display:flex;
        justify-content: space-between;
        padding:5px 15px;
        background-color: #f1eeee;
        font-size:10px; 
    }
</style>