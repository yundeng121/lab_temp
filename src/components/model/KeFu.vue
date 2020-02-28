<template>
    <div class="wrapper">
        <div class="block">
            <div class="custInfo">
                <div class="title">请添加客服微信咨询详情</div>
                <div><img src="../../assets/qrcode.png" alt="客服二维码" style="height:180px;width:180px"></div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'kefu'
    }
</script>
<style>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .block{
        background-color: #f2f2f2;
        text-align: center;
    }
    .custInfo{
        padding:20px 30px;
    }
    .title{
        text-align:center;
        margin-bottom:15px;
    }
    .custinfo img {
        width: 180px;
        height: 180px;
    }
</style>